import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import path from 'path';
import fs from 'fs';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './modules';
import PreloadContext from './lib/PreloadContext';

// build 폴더 안 asset-manifest.json에서 파일들의 경로를 조회
const manifest = JSON.parse(
  fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8')
);

const chunks = Object.keys(manifest.files)
.filter(key => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 key 찾기
.map(key => `<script src="${manifest.files[key]}"></script>`) // script 태그로 변환
.join('') // 합치기

function createPage(root, stateScript) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <title>React App</title>
      <link href="${manifest.files['main.css']}" rel="stylesheet" />
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        ${root}
      </div>
      ${stateScript}
      <script src="${manifest.files['runtime-main.js']}"></script>
      ${chunks}
      <script src="${manifest.files['main.js']}"></script>
    </body>
    </html>
      `;
}

const app = express();

const serverRender = async (req, res, next) => {
  const context = {};
  // 요청이 들어올때마다 새로운 스토어를 만들게 된다
  const store = createStore(rootReducer, applyMiddleware(thunk));

  const preloadContext = {
    done: false,
    promises: []
  };

  const jsx = (
    <PreloadContext.Provider value={preloadContext} >
      <Provider store={store} >
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </PreloadContext.Provider>
  );
  
  // 첫번째 렌더링 - API를 통해 받아온 데이터를 렌더한다
  ReactDOMServer.renderToStaticMarkup(jsx);
  try {
    // 배열 안에 든 모든 promise를 기다린다
    await Promise.all(preloadContext.promises);
  }
  catch (error) {
    return res.status(500)
  }
  preloadContext.done = true;

  // 두번째 렌더링 - 만들어진 스토어의 상태를 브라우저에서 재사용한다(스토어 상태를 문자열로 변환하여 스크립트로 주입 - root에)
  const root = ReactDOMServer.renderToString(jsx);
  // store의 상태를 조회 -> JSON을 문자열로 변환 -> 악성 스크립트 실행을 막기 위해 '<'를 유니코드로 치환
  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  // <script>로 스토어 초기 상태를 주입하기 위해서 변환
  const stateScript = `<script>__PRELOADED_STATE__= ${stateString}</script>`;
  res.send(createPage(root, stateScript));
};


// build 폴더 안의 js, css 정적 파일에 접근할 수 있도록 설정
const serve = express.static(path.resolve('./build'), {
  // root폴더에서 index.html을 보여주지 않도록 설정
  index: false
});

// serverRender 전에 serve가 위치. 순서가 중요
app.use(serve);
app.use(serverRender);

app.listen(5000, () => {
  console.log('Running on http://localhost:5000');
});

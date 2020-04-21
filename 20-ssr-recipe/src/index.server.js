import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import path from 'path';
import fs from 'fs';

// build 폴더 안 asset-manifest.json에서 파일들의 경로를 조회
const manifest = JSON.parse(
  fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8')
);

const chunks = Object.keys(manifest.files)
.filter(key => /chunk\.js$/.exec(key)) // chunk.js로 끝나는 key 찾기
.map(key => `<script src="${manifest.files[key]}"></script>`) // script 태그로 변환
.join('') // 합치기

function createPage(root) {
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
      <script src="${manifest.files['runtime-main.js']}"></script>
      ${chunks}
      <script src="${manifest.files['main.js']}"></script>
    </body>
    </html>
      `;
}

const app = express();

const serverRender = (req, res, next) => {
  const context = {};
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const root = ReactDOMServer.renderToString(jsx);
  res.send(createPage(root));
}

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

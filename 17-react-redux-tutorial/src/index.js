import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './modules';

// 만든 리듀서로 redux 스토어 생성 + redux devtools 사용
const store = createStore(rootReducer, composeWithDevTools());

// redux devtools 크롬 확장 프로그램만 이용할 경우
// const store = createStore(
//   rootReducer, /* preloadedState, */
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );

ReactDOM.render(
  <React.StrictMode>
    {/* react-redux의 Provider컴포넌트로 App 컴포넌트를 감싸고, props로 store를 내린다 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

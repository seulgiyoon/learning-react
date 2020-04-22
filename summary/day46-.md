#### 200410 Day 46 - 472~477p
API에 데이터를 요청하여 받아 사용할 때는, '데이터를 요청중(로딩 중)','요청에 성공 혹은 실패하여 로딩이 종료됨','요청에 성공하여 받은 데이터','실패하여 받은 에러'를 잘 관리해야한다. 리덕스를 사용하고 있으면서 비동기작업을 처리해야 한다면 그 상태 관리에 미들웨어를 사용할 수 있다. (472p)
미들웨어는 리듀서가 액션을 처리하기 전에 사전에 지정된 작업들을 실행한다.
- [[ Middleware | Redux ]](https://redux.js.org/advanced/middleware#seven-examples)

<br>

#### 200411 Day 47 - 478~486p
리덕스 미들웨어 redux-logger, redux-thunk 적용
```js
import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const logger = createLogger();

// 스토어를 생성할 때 미들웨어를 적용한다
const store = createStore(rootReducer, applyMiddleware(logger, ReduxThunk));
```
- [[ Redux Thunk ]](https://github.com/reduxjs/redux-thunk)

<br>

#### 200412 Day 48 - 487~490p
redux-thunk를 이해하려면 우선 redux에 대해 좀 더 잘 이해해야했다. action은 reducer에게 무엇을 하라고 명령한다. 이 때 명령 시 사용할 값을 함께 넘겨주기도 한다. 책에서 작성할 예시는 API를 통해 어떤 데이터를 받아오는 상황이다. 이 때 받아오는 데이터는 action이 reducer에게 동작을 명령할 시에 함께 넘겨서 사용하도록 할 값이다. <br>
원하는 작업들을 특정한 형태를 갖춰 함수로 감싼것이 thunk로, thunk와 미들웨어를 통해서 즉각적으로 action명령이 전달되던 형태를 원하는 때에 전달되도록 구현할 수 있다. thunk를 만들어서 기존 action 자리에 넘기면 action과 reducer사이에 미들웨어로 위치한 redux-thunk가 그를 실행시킨다. <br> 
redux의 미들웨어에는 `dispatch`(액션을 실행시킴)와 `getState`(현재 state를 조회) API가 자동으로 인자로 전달된다. 이를 이용해 원하는 때에 action이 실행되도록 하거나 현재 state에 따른 여러가지 동작들의 수행이 가능해진다. <br>
책에서 작성하는 thunk함수는 우선 로딩중임을 알리는 action이 발동하고, try-catch 구문을 사용하여 에러 없이 데이터를 잘 받아온 경우와 에러가 발생한 경우로 분기하여 각각 다른 action이 발동하도록 짜여있다.<br>
예를 들어 '유저 정보 보기' 버튼을 눌러서 유저 목록을 받아오는 함수 `getUsers`를 실행시키면, reducer로 함수가 전달되기 전에 미들웨어인 redux-thunk로 넘어간다. redux-thunk는 `getUsers`를 실행시킨다. 그러면 `dispatch` API를 통해서 action type `GET_USERS`가 reducer에게 전달되어 로딩 상태를 나타내는 loading 값이 true가 된다. 이후 외부 API로 데이터를 요청하여 데이터가 문제 없이 받아와진다면 `GET_USERS_SUCCESS` 명령이 실행되어 데이터가 state에 전달된다. <br>
```jsx
(...)
// api는 모듈로 작성
// 유저 정보를 가져온다
export const getUsers = () => async dispatch => {
  dispatch({ type: GET_USERS });
  try {
    const response = await api.getUsers();
    dispatch({ type: GET_USERS_SUCCESS, payload: response.data });
  }
  catch (error) {
    dispatch({ type: GET_USERS_FAILURE, payload: error, error: true });
    throw error;
  }
}

// 초기 state
const initialState = {
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null,
  users: null
}

// redux-actions 라이브러리의 handleActions사용
const sample = handleActions({
  // ...다른 액션들...
  [GET_USERS]: state => ({
    ...state,
    loading: {
      ...state.loading,
      GET_USERS: true // 데이터 요청 시작
    },
  }),
  [GET_USERS_SUCCESS]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      GET_USERS: false // 데이터 요청 완료
    },
    users: action.payload // 데이터(payload) 넣기
  }),
  [GET_USERS_FAILURE]: state => ({
    ...state,
    loading: {
      ...state.loading,
      GET_USERS: false // 데이터 요청 완료
    }
  }),
}, initialState );
```
- [[ dispatch(action) | Redux ]](https://redux.js.org/api/store#dispatchaction)
- [[ Redux 분석하기 | TOAST Meetup ]](https://meetup.toast.com/posts/111)
- [[ TDD Redux-Saga | irrationnelle ]](https://www.vobour.com/00-redux-saga-)

<br>

#### 200413 Day 49 - 491~496p
데이터를 불러 와 화면에 렌더링할때는 유효성 검사가 중요하다. 데이터가 존재하는지 여부를 검사 후 렌더하는 것. 유저 목록이 존재하지 않는 데 map을 이용하여 유저 목록을 렌더하도록 접근할 경우, null값에 대해서 map 함수를 호출하게 되어 오류가 발생한다. (492p)<br>
- 어떤 '목록'에 대해서는 HTML 리스트 태그를 사용하자. `<ul>, <ol>, <li>`
- 컨테이너 컴포넌트 작성 시 connect 메서드 사용 부분을 먼저 작성하자(일단 교재에 적힌 설명만 슬쩍 보고 내가 먼저 코드를 적어 볼 땐 이 방법이 맞는 흐름임).

<br>

#### 200414 Day 50 - 497~503p
기능별로 모듈을 나누어 사용하기. 로딩 상태를 관리하는 모듈 loading과 받아온 데이터를 관리하는 모듈 sample로 나눈다. 메인으로 API 리퀘스트를 처리하는 곳은 sample에서 사용하는 thunk함수를 이용한 액션이므로 그곳에서 loading의 액션들이 적절한 시점에 발동하도록 코드를 작성한다.
```js
// thunk를 이용한 액션 생성함수
// loading의 액션을 가져옴
import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return params => async dispatch => {
    dispatch({ type });
    // 인자로 넘기는 액션의 로딩 상태를 true로 설정
    dispatch(startLoading(type));
    try {
      const response = await request(params);
      dispatch({ type: SUCCESS, payload: response.data });
      // 데이터를 모두 받아오면 인자로 넘기는 액션의 로딩 상태를 false로 설정
      dispatch(finishLoading(type));
    }
    catch(error) {
      dispatch({ type: FAILURE, payload: error, error: true });
      dispatch(finishLoading(type));
      throw error;
    }
  };
};
```
```js
// 기능별로 나눈 여러 모듈에서 값을 가져오기.
// 하나의 컴포넌트에서 여러 모듈로부터 state 조회해서 사용한다.
// 여기서는 state.sample, state.loading에서 상태값을 가져와 사용
export default connect(
  ({ sample, loading }) => ({
    loadingPost: loading['sample/GET_POST'],
    loadingUsers: loading['sample/GET_USERS'],
    post: sample.post,
    users: sample.users
  }),
  {
    getPost,
    getUsers
  }
)(SampleContainer);
```
redux-saga에서 사용하는 ES6의 제네레이터 함수를 우선 이해하기.
- [[ function* | MDN ]](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/function*)
- [[ 제너레이터와 async/awit | Poiema Web ]](https://poiemaweb.com/es6-generator)

<br>

#### 200415 Day 51 - 504~510p
redux-saga을 카운터에 적용해서 기본적인 움직임을 살핌.
```js
function* generator() {
  x = yield;
  y = yield;
  yield x + y;
  return;
}

// 제네레이터 함수를 이용해서 제네레이터를 생성
const sum = generator();

sum.next()
// {value: undefined, done: false}
sum.next(100)
// {value: undefined, done: false}
sum.next(200)
// {value: 300, done: false}
sum.next()
// {value: undefined, done: true}
```
- [[ Redux-Saga ]](https://redux-saga.js.org/)

<br>

#### 200416 Day 52 - 511~520p
```js
// saga를 만들어 반환하는 함수
import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return function* (action) {
    // put으로 액션을 실행시킨다
    yield put(startLoading(type));
    try {
      // call로 Promise를 반환하는 함수를 호출하고 기다린다.
      // 첫번째 인자로 함수, 두번째 인자로 함수에 전달할 인수를 받는다.
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data
      });
    }
    catch(error) {
      yield put({
        type: FAILURE,
        payload: error,
        error: true
      });
    }
    yield put(finishLoading(type));
  };
}
```
- [[ Effect creators | Redux-Saga ]](https://redux-saga.js.org/docs/api/)

<br>

#### 200417 Day 53 - 524~530p
코드 스플리팅은 어떤 목적을 위해 코드가 담긴 파일을 분리하는 작업이다. 웹팩에서 설정 가능한 SplitChunks 기능은 라이브러리 관련 기능 - 자주 바뀌지 않는 코드들 - 과 그 외의 코드들을 분리하여 브라우저가 새로 파일을 받는 빈도를 줄일 수 있도록 한다. (513p) <br>
SPA 프로젝트를 개발할 때, A 페이지에만 방문할 경우 B와 C페이지의 코드는 읽을 필요가 없다. 하지만 별도 설정이 없으면 A, B, C의 코드가 모두 한 파일에 저장되므로 항상 모든 코드를 다 불러오게 된다. 필요한 코드를 필요한 시점에 불러오도록 설정하는 방법이 코드 비동기 로딩이다. (524p) <br>
import를 함수로 사용하면 Promise를 반환한다. 이를 dynamic import라고 하며, 아직 자바스크립트 표준 문법은 아니다. 이 함수를 통해서 모듈을 불러올 때 모듈에서 default로 내보낸 항목은 result.default를 이용해서 참조한다. 아래 코드를 빌드하면 notify.js에 해당하는 코드가 따로 개별 파일로 빌드된 것을 확인할 수 있다. (528p) <br>
서버사이드 랜더링을 한다면 Loadable Components 라이브러리를, 아니라면 React.lazy와 Suspense를 사용한다.
```jsx
import React from 'react';

function App() {
  // import를 함수로 사용하여, onClick함수가 실행될 때만 notify.js 파일을 불러오도록 한다.
  const onClick = () => {
    import('./notify').then(result => result.default());
  }

  return (
    <div>
      <button onClick={onClick}>NOTIFY</button>
    </div>
  );
}
```
```jsx
class App extends Component {
  state = {
    SplitMe: null
  };

  // 클릭하면 모듈이 로딩되기를 기다려서 state에 모듈을 할당 
  handleClick = async() => {
    const loadedModule = await import('./SplitMe');
    this.setState({
      SplitMe: loadedModule.default
    });
  }

  render() {
    const { SplitMe } = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
        {/* 모듈이 존재한다면 랜더 */}
        {SplitMe && <SplitMe />}
      </div>
    )
  }
}
```
```jsx
// React.laze와 Suspense 사용
import React, { useState, Suspense } from 'react';

function App() {
  const [visible, setVisible] = useState(false);
  const SplitMe = React.lazy(() => import('./SplitMe'));

  return (
    <div>
      <button onClick={() => setVisible(true)}>Click</button>
      <Suspense fallback={<div>로딩중...</div>}>
        {visible && <SplitMe />}
      </Suspense>
    </div>
  )
}
```
```jsx
// Loadable components 라이브러리 사용
import React, { useState } from 'react'
import loadable from '@loadable/component';

const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>로딩 중...</div>
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  }
  const onMouseOver = () => {
    // 버튼에 마우스를 올린 시점부터 컴포넌트를 미리 불러온다
    SplitMe.preload();
  }
  
  return (
    <div>
      <button 
        onClick={onClick}
        onMouseOver={onMouseOver}
      >
        Click
      </button>
      {visible && <SplitMe />}
    </div>
  )
}
```
- [[ Code-Splitting | React ]](https://reactjs.org/docs/code-splitting.html)
- [[ Loadable Components ]](https://loadable-components.com/)

<br>

#### 200420 Day 54 - 538~554p
자바스크립트가 실행되어야 초기 화면(UI)가 완성되어 보이는 서비스에서, 화면 랜더링을 브라우저 대신 서버에서 실행하여 사용자에게 보여주는 것이 서버 사이드 랜더링. 검색 엔진 최적화와 초기 렌더링 성능을 개선할 수 있지만 서버가 담당하는 작업이 늘어나면서 과부하가 발생할 수 있고, 코드 스플리팅과 함께 사용하기 까다롭다. <br>
서버에서 리액트 컴포넌트를 렌더링 할 때는 ReactDOMServer의 renderToString이라는 함수를 사용한다. 함수에 JSX를 넣어 호출하면 렌더링 결과를 문자열로 반환한다.
```jsx
import ReactDOMServer from 'react-dom/server';

const html = ReactDOMServer.renderToString(<div>Hello Server Side Rendering!</div>);
```
- [[ ReactDOMServer | React ]](https://ko.reactjs.org/docs/react-dom-server.html)
- [[ Mode | Webpack ]](https://webpack.js.org/configuration/mode/)
- [[ Webpack node modules externals ]](https://github.com/liady/webpack-node-externals)
- [[ Externals | Webpack ]](https://webpack.js.org/configuration/externals/)

<br>

#### 200421 Day 55 - 555~562p
- [[ <StaticRouter> | React Router ]](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/StaticRouter.md)
- [[ Express에서 정적 파일 제공 | Express]](https://expressjs.com/ko/starter/static-files.html)

<br>

#### 200422 Day 56 - 563~570p
서버 사이드 렌더링을 한다면 이미 있는 정보를 재요청하지 않게 처리하는 작업이 중요하다. 이 작업이 없다면 브라우저가 이미 있는 데이터를 감지하지 않고 불필요한 API 호출을 하게 되므로 트래픽이 낭비되고, 사용자 경험이 저하된다. (568p)
```jsx
function UserContainer({ users, getUsers }) {
  useEffect(() => {
    // 이미 users가 유효하다면 getUsers로 정보를 다시 요청하지 않는다.
    if (users) return;
    // 유효하지 않다면 데이터를 요청한다.
    getUsers();
  }, [users, getUsers]);

  return (
    <div>
      <Users users={users} />
    </div>
  )
}
```
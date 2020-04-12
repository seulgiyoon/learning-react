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
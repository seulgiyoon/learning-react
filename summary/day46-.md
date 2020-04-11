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
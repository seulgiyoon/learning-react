// 스토어에는 리듀서를 하나만 사용해야 함. combineReducers 메서드를 이용해서 만든 리듀서들을 하나로 합쳐준다
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;

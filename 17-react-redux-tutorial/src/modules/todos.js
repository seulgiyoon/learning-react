import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입 정의
const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값 변경
const INSERT = 'todos/INSERT'; // 새로운 todo 등록
const TOGGLE = 'todos/TOGGLE'; // todo의 완료/미완료 상태 변경
const REMOVE = 'todos/REMOVE'; // todo 삭제

// 액션 생성 함수 -> 들어온 데이터를 가능하면 알맞은 형태로 처리
export const changeInput = createAction(CHANGE_INPUT, (input) => input);
let id = 3;
export const insert = createAction(INSERT, (text) => ({
  id: id + 1,
  text,
  done: false,
}));
export const toggle = createAction(TOGGLE, (id) => id);
export const remove = createAction(REMOVE, (id) => id);

// 초기값
const initialState = {
  input: '',
  todos: [
    { id: 1, text: '첫 번째 할 일', done: true },
    { id: 2, text: '두 번째 할 일', done: false },
  ],
};

// 리듀서
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) => 
      produce(state, draft => {
        draft.input = input;
      }),
    [INSERT]: (state, { payload: todo }) => ({
      ...state,
      todos: state.todos.concat(todo),
    }),
    [TOGGLE]: (state, { payload: id }) => 
      produce(state, draft => {
        const targetTodo = draft.todos.find(todo => todo.id === id);
        targetTodo.done = !targetTodo.done
      }),
    [REMOVE]: (state, { payload: id }) => ({
      ...state,
      todos: state.todos.filter((todo) => todo.id !== id),
    }),
  },
  initialState,
);

export default todos;

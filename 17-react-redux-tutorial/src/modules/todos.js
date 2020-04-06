// 액션 타입 정의
const CHANGE_INPUT = 'todos/CHANGE_INPUT'; // 인풋 값 변경
const INSERT = 'todos/INSERT'; // 새로운 todo 등록
const TOGGLE = 'todos/TOGGLE'; // todo의 완료/미완료 상태 변경
const REMOVE = 'todos/REMOVE'; // todo 삭제

// 액션 생성 함수 -> 들어온 데이터를 가능하면 알맞은 형태로 처리
export const changeInput = (input) => ({ type: CHANGE_INPUT, input });
let id = 3;
export const insert = (text) => ({
  type: INSERT,
  todo: {
    id: id + 1,
    text: text,
    done: false,
  },
});
export const toggle = (id) => ({
  type: TOGGLE,
  id,
});
export const remove = (id) => ({ type: REMOVE, id });

// 초기값
const initialState = {
  input: '',
  todos: [
    { id: 1, text: '첫 번째 할 일', done: true },
    { id: 2, text: '두 번째 할 일', done: false },
  ],
};

// 리듀서
const todos = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case TOGGLE:
      const newTodos = state.todos.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo,
      );
      return {
        ...state,
        todos: newTodos,
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
};

export default todos;

import React, { useReducer, useRef, useCallback } from 'react';
import TodoTemplate from 'components/TodoTemplate';
import TodoInsert from 'components/TodoInsert';
import TodoList from 'components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 0; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

function App() {
  // useReducer의 두번째 인자로 초기값을 넣어주는데, 그를 undefined로 주고 함수를 세번째 인자로 넣으면 첫 렌더시에만 함수가 호출된다
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 할일 목록에 붙을 id. 화면에 랜더되거나 이 값으로 인해 컴포넌트가 리랜더되어야 할 필요가 없으므로
  // useRef를 이용한다 (211p)
  const nextId = useRef(4);

  const onInsert = useCallback(text => {
    const todo = {
      id: nextId.current,
      text: text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo });
    nextId.current = nextId.current + 1;
  }, []);

  const onRemove = useCallback(id => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback(id => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;

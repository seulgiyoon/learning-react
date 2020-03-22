import React, { useState, useRef, useCallback } from 'react';
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

function App() {
  const [todos, setTodos] = useState(createBulkTodos);

  // 할일 목록에 붙을 id. 화면에 랜더되거나 이 값으로 인해 컴포넌트가 리랜더되어야 할 필요가 없으므로
  // useRef를 이용한다 (211p)
  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const newTodo = {
        id: nextId.current,
        text: text,
        checked: false,
      };
      // useState의 함수형 업데이트. 바로 새 값을 넣지 않고, 어떻게 업데이트할지를 정해준다.
      // 이렇게 하면 52번줄에 todos를 넣지 않아도 되고, 따라서 todos가 바뀔 때마다 함수가 바뀌는 일이 사라진다.
      setTodos(todos => todos.concat(newTodo));
      nextId.current = nextId.current + 1;
    },
    [],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos => todos.filter(todo => todo.id !== id));
    },
    [],
  );

  const onToggle = useCallback(
    id => {
      setTodos(todos =>
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;

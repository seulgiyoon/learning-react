import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from 'components/TodoTemplate';
import TodoInsert from 'components/TodoInsert';
import TodoList from 'components/TodoList';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트 30분 스터디하기',
      checked: true,
    },
    {
      id: 2,
      text: '등록한 웹팩 수업 듣기',
      checked: false,
    },
    {
      id: 3,
      text: '노션 TIL 게시판 새로 만들고 글 정리하기',
      checked: false,
    },
  ]);

  // 할일 목록에 붙을 id. 화면에 랜더되거나 이 값으로 인해 컴포넌트가 리랜더되어야 할 필요가 없으므로
  // useRef를 이용한다 (211p)
  const nextId = useRef(4);

  const onInsert = useCallback(
    text => {
      const newTodo = {
        // useRef의 현재 값은 .current로 얻는다
        id: nextId.current,
        text: text,
        checked: false,
      };
      setTodos(todos.concat(newTodo));
      nextId.current = nextId.current + 1;
    },
    // 여기에 todos를 넣지 않으면, 맨 처음 랜더되었을때의 todos 값만을 함수가 기억함
    [todos],
  );

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  );

  const onToggle = useCallback(
    id => {
      setTodos(
        // 삼항연산자로 한 건 처음. id일치하면 toggle, 아니면 그냥 그대로 리턴.
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;

import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

function TodoList() {
  return (
    <div>
      <TodoListItem />
      <TodoListItem />
    </div>
  );
}

export default TodoList;

import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

function TodoList({ todos }) {
  return (
    <div>
      {todos.map(todo => 
        <TodoListItem key={todo.id} todo={todo} />
      )}
    </div>
  );
}

export default TodoList;

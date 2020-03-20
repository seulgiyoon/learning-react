import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

function TodoList({ todos, onRemove, onToggle }) {
  return (
    <div>
      {todos.map(todo => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default TodoList;

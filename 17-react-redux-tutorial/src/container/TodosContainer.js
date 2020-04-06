import React from 'react';
import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { changeInput, insert, toggle, remove } from '../modules/todos';

function TodosContainer({ input, todos, changeInput, insert, toggle, remove }) {
  return (
    <div>
      <Todos
        input={input}
        todos={todos}
        onChangeInput={changeInput}
        onInsert={insert}
        onToggle={toggle}
        onRemove={remove}
      />
    </div>
  );
}

export default connect(
  (state) => ({
    input: state.todos.input,
    todos: state.todos.todos,
  }),
  {
    changeInput,
    insert,
    toggle,
    remove,
  },
)(TodosContainer);

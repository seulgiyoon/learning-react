import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

function TodoListItem({ todo }) {
  const { text, checked } = todo;
  return (
    <div className="TodoListItem">
      {/* 'checkbox'는 항상 들어가고, checked는 값이 true일 경우에만 들어간다 */}
      <div className={ cn('checkbox', { checked })}>
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="remove">
        <MdRemoveCircleOutline />
      </div>
    </div>
  );
};

export default TodoListItem;

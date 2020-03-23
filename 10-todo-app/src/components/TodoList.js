import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

function TodoList({ todos, onRemove, onToggle }) {
  // List 컴포넌트에서 각 TodoListItem을 랜더할 때 사용할 함수
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];
      return (
        <TodoListItem
          key={key}
          todo={todo}
          onRemove={onRemove}
          onToggle={onToggle}
          style={style}
        />
      );
    },
    [todos, onRemove, onToggle],
  );

  return (
    <List
      className="TodoList"
      width={512} // 리스트 전체 가로 크기
      height={513} // 리스트 전체 높이
      rowCount={todos.length} // 전체 항목 개수
      rowHeight={57} // 아이템 개별 항목의 높이
      rowRenderer={rowRenderer} // 아이템 개별 항목을 랜더할 때 사용하는 함수
      list={todos} // 랜더할 배열
      style={{ outline: 'none'}} // List에 기본 적용되는 outline 스타일 제거
    />
  );
}

export default React.memo(TodoList);

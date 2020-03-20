import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

function TodoInsert({ onInsert }) {
  const [value, setValue] = useState('');
  // 이 경우 컴포넌트가 리렌더될때마다 함수를 새로 만든다
  // const onChange = e => setValue(e.target.value);

  // 성능 최적화. useCallback으로 리랜더되어도 함수를 다시 만들지 않고 사용(208p)
  // 이 함수는 어떤 기존 값을 참조하지 않고 새로 들어온 값을 무조건 받아서 바꾸기 때문에
  // []안에 특정한 값을 지정할 필요가 없다
  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    e => {
      onInsert(value);
      setValue('');
      // form 엘리먼트 안 submit type button을 누르면 새로고침이 발생하는데
      // 그를 막기 위해 사용하는 event.preventDefault()
      e.preventDefault();
      // 여기에 value를 넣지 않으면, 맨 처음 랜더되었을때의 value 값만을 함수가 기억함
      // 즉 뭘 입력해서 추가해도 공백만 기억하니 공백만 삽입된다.
      // onInsert도 책에서는 들어가있는데, 없어도 동작 자체는 문제가 없다.
      // onInsert가 참조하는 todos를 여기서 직접적으로 참조하지 않아서 문제가 없는것같은데..
    },
    [onInsert, value],
  );

  return (
    // button onClick 이벤트 혹은 form의 onSubmit 이벤트를 이용
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할 일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit" onClick={onSubmit}>
        <MdAdd />
      </button>
    </form>
  );
}

export default TodoInsert;

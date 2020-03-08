import React from 'react';
import useInputs from './useInputs'

const UseCustomHookInfo = () => {

  const [state, onChange] = useInputs({
    name: '',
    nickname: ''
  });

  const { name, nickname } = state;

  return (
    <div>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="text"
        name="nickname"
        value={nickname}
        onChange={onChange}
      />      
      <h2>이름: {name}</h2>
      <h2>별명: {nickname}</h2>
    </div>
  );
};

export default UseCustomHookInfo;
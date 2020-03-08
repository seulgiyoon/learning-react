import React, { useReducer } from 'react';

// state는 기존 값, action은 dispatch에서 넘겨주는 값.
function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value 
  }
}

const ReducerInfo = () => {

  const [state, dispatch] = useReducer(reducer, { 
    name: '',
    nickname: ''
   });

  const { name, nickname } = state;
  const onChange = (e) => dispatch(e.target);

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
      <h1>{name}, {nickname}</h1>
    </div>
  );
};

export default ReducerInfo;
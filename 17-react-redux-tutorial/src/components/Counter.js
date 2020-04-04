import React from 'react';

function Counter({ number, onIncrease, onDecrease }) {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={onIncrease}>숫자 더하기</button>
        <button onClick={onDecrease}>숫자 빼기</button>
      </div>
    </div>
  );
}

export default Counter;

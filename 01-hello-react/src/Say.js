import React, { useState } from 'react';

const Say = () => {
  const [message, setMessage] = useState([1,2,3]);
  const onClickEnter = () => setMessage([4,5,6]);
  const onClickLeave = () => setMessage([7,8,9]);

  const [color, setColor] = useState('black');
  
  return (
    <div>
      <button onClick={onClickEnter}>입장</button>
      <button onClick={onClickLeave}>퇴장</button>
      <h1 style={{color}}>{message}</h1>

      <button onClick={() => setColor('red')}>red</button>
      <button onClick={() => setColor('orange')}>orange</button>
      <button onClick={() => setColor('seagreen')}>seagreen</button>

    </div>
  );
};

export default Say;
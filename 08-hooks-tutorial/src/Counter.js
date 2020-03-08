import React, { useState } from 'react';

const Counter = () => {

  const [number, setNumber] = useState(0);
  const onClick = () => setNumber(number + 1);

  return (
    <div>
      <h1>{number}</h1>
      <button
        onClick={onClick}
      > +1 </button>
    </div>
  );
};

export default Counter;
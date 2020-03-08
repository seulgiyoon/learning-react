import React, { useState, useMemo } from 'react';

const getAverage = numbers => {
  console.log('평균값 계산 중...')
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
}

const UseMemoAverage = () => {
  const [number, setNumber] = useState('');
  const [numberList, setNumberList] = useState([])

  const list = numberList.map((item, idx) => <li key={idx}>{item}</li>)

  const avg = useMemo(() => getAverage(numberList), [numberList]);

  return (
    <div>
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        onKeyPress={(e) => {
          if(e.key === 'Enter') {
            setNumberList(numberList.concat(Number(number)));
            setNumber('');
          }
        }}
      />
      <ul>{list}</ul>
      <p><b>숫자평균 : {avg}</b></p>
    </div>
  );
};

export default UseMemoAverage;
import React, { useState } from 'react';

// 뭘 하는 동작인지 알 수 있도록 함수를 밖으로 빼는 것이 좋아보인다!
const getAverage = numbers => {
  // 작은 변화(인풋값 입력 등)마다 무조건 평균값을 계산함. -> 메모리(맞나) 낭비
  console.log('평균값 계산 중...')
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
}

const Average = () => {
  const [number, setNumber] = useState('');
  const [numberList, setNumberList] = useState([])

  const list = numberList.map((item, idx) => <li key={idx}>{item}</li>)

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
      <p><b>숫자평균 : {getAverage(numberList)}</b></p>
    </div>
  );
};

export default Average;
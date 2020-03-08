import React, { useState, useMemo, useCallback, useRef } from 'react';

const getAverage = numbers => {
  console.log('평균값 계산 중...')
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
}

// 209p useCallback 은 적용 안했음
const UseCallbackAverage = () => {
  const [number, setNumber] = useState('');
  const [numberList, setNumberList] = useState([])

  const list = numberList.map((item, idx) => <li key={idx}>{item}</li>)

  const avg = useMemo(() => getAverage(numberList), [numberList]);
  const inputEl = useRef(null);

  // 랜더때마다 함수가 새로 생성된다는데.. 인라인에다가 해버린거는 해당사항이 있는건가 없는건가? 
  // 온클릭 함수가 생성되는지 어쩌는지 어떻게 알지..
  const onChange = (e) => {
    setNumber(e.target.value)
  }

  const onClick = () => {
      setNumberList(numberList.concat(Number(number)));
      setNumber('');
      inputEl.current.focus();
  }

  return (
    <div>
      <input
        type="text"
        value={number}
        onChange={onChange}
        ref={inputEl}
      />
      <button
        onClick={onClick}
      >push</button>
      <ul>{list}</ul>
      <p><b>숫자평균 : {avg}</b></p>
    </div>
  );
};

export default UseCallbackAverage;
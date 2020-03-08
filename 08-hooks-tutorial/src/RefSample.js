import React, { useRef, useState } from 'react';

const RefSample = () => {

  // 뭔가 ref의 값이 바뀌어도 컴포넌트가 렌더링되지 않는다.. 를 실험하려고 하나 방법을 모르겠네. 212p의 예시는 잘 이해를 못함.
  // 아래처럼 적으면 결국 useState로 id를 설정한것과 다를 게 없어서
  const [list, setList] = useState([]);
  const id = useRef(1);
  const setId = () => {
    id.current = Math.floor(Math.random() * 10)
    return id.current;
  }

  const onKeyPress = (e) => {
    if(e.key === 'Enter') {
      const newItem = {id: setId(), value: e.target.value}
      setList(list.concat(newItem));
    }
  }
  return (
    <div>
      refsample
      <input onKeyPress={onKeyPress}></input>
      <ul>{list.map(item => <li>{JSON.stringify(item)}</li>)}</ul>
    </div>
  );
};

export default RefSample;
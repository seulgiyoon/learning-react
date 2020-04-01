// 새로운 Context 만들기
import React, { createContext, useState } from 'react';

// provider의 value 형태와 일치시킨다(내부 값 파악에 용이)
// 여기엔 사실 뭘 넣어도 상관이 없다. 안 넣어도 상관이 없다. Provider의 value를 사용하기 때문에 무시된다.
// 단지 코드를 봤을 때 Provider의 value 구조가 어떻게 생겼는지 알기 쉽기 때문에
// 구조를 똑같이 만들어 놓는 것임. + 실수로 Provider의 값을 사용하지 않았을 때 에러가 발생하지 않는다.
const ColorContext = createContext({
  state: {color: 'black', subcolor: 'red'},
  actions: {
    setColor: () => {},
    setSubcolor: () => {}
  }
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red');

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor }
  };

  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
}

// const ColorConsumer = ColorContext.Consumer
const { Consumer: ColorConsumer } = ColorContext;

export { ColorProvider, ColorConsumer };

export default ColorContext;

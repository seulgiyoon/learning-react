// 새로운 Context 만들기
import { createContext } from 'react';
// 지정한 값에는 ColorContext 안의 Consumer 컴포넌트 안 객체로 함수를 통해 접근
// <ColorContext.Consumer>
//   {value => <p>{value.width}</p>}
// </ColorContext.Consumer>
const ColorContext = createContext({
  width: '70px', 
  height: '100px', 
  color: 'black' 
});

export default ColorContext;

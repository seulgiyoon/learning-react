import React from 'react'
import styled, { css } from 'styled-components';

// div 엘리먼트에 스타일을 지정하여 컴포넌트처럼 만들기
const Box = styled('div')`
  /* props 로 전달한 값을 바로 사용 */
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;
`;

// button 엘리먼트에 스타일을 지정하여 컴포넌트처럼 만들기
const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* Sass의 & 문법과 같음 */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  ${props => 
    props.inverted &&
    css`
      background: none;
      border: 2px solid white;
      color: white;
      &:hover {
        background: white;
        color: black;
      }
    `
  }

  /* 바로 뒤따르는 button만 선택 */
  + button {
    margin-left: 2rem;
  }
`;

function StyledComponents() {
  return (
    <Box color="black">
      <Button>안녕하세요</Button>
      <Button inverted={true}>테두리만</Button>
      
    </Box>
  )
}

export default StyledComponents;

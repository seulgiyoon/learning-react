import React from 'react'
import styled, { css } from 'styled-components';
// 여러 줄의 스타일 구문을 조건부로 설정해야 하는 경우 css를 불러온다.

const sizes = {
  desktop: 1024,
  tablet: 768,
};

// sizes 안에 있는 크기들에 따라 @media (max-width: size){} 형태의 결과를 내는 함수를 생성하는 함수.
// 함수는 desktop: (...args) => { return css style } 형태.
// 인자로 미디어 크기에 적용할 스타일을 넘긴다. media.desktop`width: 768px;`처럼 함수는 tagged 템플릿 리터럴 형태로 작성.
// sizes에 입력된 수치는 em으로 바뀌도록 되어 있었는데 px로 해보았음.
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  console.log(acc);
  return acc;
}, {});

// div 엘리먼트에 스타일을 지정하여 컴포넌트처럼 만들기
const Box = styled('div')`
  /* props 로 전달한 값을 바로 사용 */
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;

  width: 1024px;
  margin: 0 auto;
  /* 창 가로크기 1024px부터는 width를 768px, 가운데 정렬 */
  /* @media (max-width: 1024px) {
    width: 768px;
  } */
  ${media.desktop`width: 768px;`}
  /* 창 가로크기 768px부터는 width를 창 크기와 같게 한다 */
  /* @media (max-width: 768px) {
    width: 100%
  } */
  ${media.tablet`width: 100%;`}
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
      {/* inverted가 true이면 34번째줄 스타일이 적용 */}
      <Button inverted={false}>테두리만</Button>
      
    </Box>
  )
}

export default StyledComponents;

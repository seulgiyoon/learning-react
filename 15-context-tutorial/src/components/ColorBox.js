import React from "react";
import ColorContext from "../contexts/color";

function ColorBox() {
  return (
    <ColorContext.Consumer>
    {/* 컴포넌트 안에 children으로 함수를 넣어주기. children 자리에 JSX나 문자열이 아닌 함수를 전달 */}
    {/* Function as a child or Render Props */}
      {value => (
        <div 
          style={{ 
            width: value.width, 
            height: value.height, 
            background: value.color 
          }} 
        />
      )}
    </ColorContext.Consumer>
  );
};

export default ColorBox;

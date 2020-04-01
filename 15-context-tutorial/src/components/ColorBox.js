import React from "react";
import { ColorConsumer } from "../contexts/color";

function ColorBox() {
  return (
    // Consumer를 통해서 Provider에 접근할 수 있다.
    <ColorConsumer>
      {({ state }) => (
        <>
        <div 
          style={{ 
            width: '50px', 
            height: '50px', 
            background: state.color 
          }} 
        />
        <div 
        style={{ 
          width: '80px', 
          height: '80px', 
          background: state.subcolor 
        }} 
      />
      </>
      )}
    </ColorConsumer>
  );
};

export default ColorBox;

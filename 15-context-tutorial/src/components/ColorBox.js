import React, { useContext } from "react";
import ColorContext from "../contexts/color";

function ColorBox() {
  // useContext로 바로 컨텍스트의 값을 조회한다
  const { state } = useContext(ColorContext);
  return (
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
  );
};

export default ColorBox;

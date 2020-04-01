import React from 'react';
import { ColorConsumer } from '../contexts/color';

const colors = ['tomato', 'orange', 'gold', 'green', 'blue'];

function SelectColors() {
  return (
    <div style={{ marginBottom: '30px' }}>
      <h2>색상을 선택하세요.</h2>
      {/* Consumer를 통해서 Provider에 접근할 수 있다. */}
      <ColorConsumer>
      {({actions}) => (
      <div style={{display: 'flex'}}>
        {colors.map((color, index) => (
          <div 
            key={index} 
            style={{
              width: '30px', 
              height: '30px', 
              background: color, 
              cursor: 'pointer'
            }} 
            onClick={() => actions.setColor(color)}
            onContextMenu={(e) => {
              e.preventDefault(); // 마우스 오른쪽 버튼 클릭 시 메뉴가 뜨는 것 무시
              actions.setSubcolor(color);
            }}
          />
        ))}
      </div>
      )}
      </ColorConsumer>
    </div>
  )
}

export default SelectColors

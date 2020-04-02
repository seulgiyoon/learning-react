import React, { Component } from 'react';
import ColorContext from '../contexts/color';

const colors = ['tomato', 'orange', 'gold', 'green', 'blue'];

class SelectColors extends Component {

  static contextType = ColorContext;

  render() {
    return (
      <div style={{ marginBottom: '30px' }}>
        <h2>색상을 선택하세요.</h2>
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
              onClick={() => this.context.actions.setColor(color)}
              onContextMenu={(e) => {
                e.preventDefault(); // 마우스 오른쪽 버튼 클릭 시 메뉴가 뜨는 것 무시
                this.context.actions.setSubcolor(color);
              }}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default SelectColors;

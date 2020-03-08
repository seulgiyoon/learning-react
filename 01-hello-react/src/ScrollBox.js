import React, { Component } from 'react';

class ScrollBox extends Component {

  scrollToBottom = () => {
    const {scrollHeight, clientHeight} = this.box;
    this.box.scrollTop = scrollHeight - clientHeight;
  }

  render() {
    const style = {
      height: '300px',
      width: '300px',
      overflow: 'auto',
    }

    const innerStyle = {
      width: '100%',
      height: '600px',
      background: 'linear-gradient(white, tomato)',
    }

    return (
      <div
        style={style}
        ref={(ref) => this.box = ref}
      >
        <div style={innerStyle}></div>    
      </div>
    );
  }
}

export default ScrollBox;
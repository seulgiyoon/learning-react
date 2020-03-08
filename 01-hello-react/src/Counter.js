import React, { Component } from 'react';

// rcc -> con -> est
class Counter extends Component {
  state = {
    number: 0,
  };
  
  render() {
    const { number } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <button
          onClick={() => { 
            this.setState(prevState => { 
              return { number: prevState.number + 1 }
            }, () => alert('hello!'));
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
import React, { Component } from 'react';
import './ValidationSample.css';

class ValidationSample extends Component {

  state = {
    password: '',
    clicked: false,
    validated: false
  }

  handleOnChange = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  handleOnClick = () => {
    this.setState({
      clicked: true,
      validated: this.state.password === '0000',
    });
    // 버튼 클릭 후 커서가 ref로 지정한 input창으로 옮겨간다
    this.anyNameYouLike.focus();
  }

  render() {
    return (
      <div>
        <input
          type="password"
          // 해당 input을 ref로 지정함
          ref={(ref) => this.anyNameYouLike = ref}
          value={this.state.password}
          onChange={this.handleOnChange}
          className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : null}
        />
        <button
          onClick={this.handleOnClick}
        >검증하기</button>        
      </div>
    );
  }
}

export default ValidationSample;
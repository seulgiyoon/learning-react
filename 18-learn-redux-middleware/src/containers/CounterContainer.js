import React from 'react'
import { connect } from 'react-redux';
import { increaseAsync, decreaseAsync } from '../modules/counter';
import Counter from '../components/Counter';

function CounterContainer({ number, increaseAsync, decreaseAsync }) {
  return (
    <div>
      <Counter number={number} onIncrease={increaseAsync} onDecrease={decreaseAsync} />
    </div>
  )
}

// 여러 리듀서의 state중에 counter에 접근
export default connect(
  state => ({
    number: state.counter
  }),
  {
    increaseAsync,
    decreaseAsync
  },
)(CounterContainer)

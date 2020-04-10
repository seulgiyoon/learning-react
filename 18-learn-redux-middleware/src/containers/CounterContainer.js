import React from 'react'
import { connect } from 'react-redux';
import { increase, decrease } from '../modules/counter';
import Counter from '../components/Counter';

function CounterContainer({ number, increase, decrease }) {
  return (
    <div>
      <Counter number={number} onIncrease={increase} onDecrease={decrease} />
    </div>
  )
}

// 여러 리듀서의 state중에 counter에 접근
export default connect(
  state => ({
    number: state.counter
  }),
  {
    increase,
    decrease
  },
)(CounterContainer)

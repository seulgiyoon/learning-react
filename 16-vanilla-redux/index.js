import { createStore } from 'redux';
const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

// action 만들기 : 프로젝트의 상태에 변화를 일으키는 것
// 액션 이름 지정
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 액션 이름을 사용하여 액션 객체를 만드는 함수 작성
// 액션 개체는 반드시 type값을 가지고 있어야 한다
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = difference => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

// 프로젝트의 초깃값 설정
const initialState = {
  toggle: false,
  counter: 0
};

// 변화를 일으키는 함수 reducer
// 불변성을 유지하기 쉽게 하려면 객체의 깊이가 얕아야 한다
function reducer(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        toggle: !state.toggle
      }
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference
      }
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1
      }
    default:
      return state
  }
}

// createStore를 이용해 스토어 생성
const store = createStore(reducer);

// HTML 엘리먼트에 접근하여 UI를 변경하는 함수
const render = () => {
  // 현재 상태를 불러온다
  const state = store.getState();
  if (state.toggle) {
    divToggle.classList.add('active')
  } else {
    divToggle.classList.remove('active');
  }
  counter.textContent = state.counter;
};

render();
// 스토어의 상태가 바뀔때마다 UI가 변경되도록, render함수를 실행시켜주는 subscribe 메서드
store.subscribe(render);

// dispatch 메서드로 각 엘리먼트 클릭 시 인자로 넘긴 함수가 실행되도록 함
divToggle.addEventListener('click', () => {
  store.dispatch(toggleSwitch());
});
btnIncrease.addEventListener('click', () => {
  store.dispatch(increase(1));
});
btnDecrease.addEventListener('click', () => {
  store.dispatch(decrease());
});

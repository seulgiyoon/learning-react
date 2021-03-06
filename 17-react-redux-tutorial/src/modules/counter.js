import { createAction, handleActions } from 'redux-actions';

// 액션 타입 정의. 문자열의 내용은 이름 충돌을 방지하기 위해서 '모듈 이름/액션 이름' 형태로 작성한다.
const INCREASE = 'counter/INCRESE';
const DECREASE = 'counter/DECREASE';

// export 키워드로 다른 파일에서 불러올 수 있도록 액션 생성 함수를 작성
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 초기 state
const initialState = {
  number: 0,
};

// 리듀서 함수
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);

// 현재 파일에서 내보낸 함수들을 다른 파일에서 import한다면
// import counter, { increase, decrease } from './counter'가 된다
export default counter;

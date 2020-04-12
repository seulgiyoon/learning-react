import { handleActions } from 'redux-actions';
import * as api from '../lib/api';

const GET_POST = 'sample/GET_POST';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';

// thunk 함수 내부에서 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치한다.
// 객체가 아닌 함수형태의 액션을 반환함.
export const getPost = (id) => async dispatch => {
  dispatch({ type: GET_POST }); // 요청 시작
  try {
    const response = await api.getPost(id);
    dispatch({ type: GET_POST_SUCCESS, payload: response.data });
  }
  catch (error) {
    dispatch({ type: GET_POST_FAILURE, payload: error, error: true });
    throw error // 나중에 요청 컴포넌트에서 에러를 조회할 수 있게 한다.
  }
}

export const getUsers = () => async dispatch => {
  dispatch({ type: GET_USERS });
  try {
    const response = await api.getUsers();
    dispatch({ type: GET_USERS_SUCCESS, payload: response.data });
  }
  catch (error) {
    dispatch({ type: GET_USERS_FAILURE, payload: error, error: true });
    throw error;
  }
}

const initialState = {
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null,
  users: null
}

const sample = handleActions({
  [GET_POST]: state => ({
    ...state,
    loading: {
      ...state.loading,
      GET_POST: true
    },
  }),
  [GET_POST_SUCCESS]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      GET_POST: false
    },
    post: action.payload
  }),
  [GET_POST_FAILURE]: state => ({
    ...state,
    loading: {
      ...state.loading,
      GET_POST: false
    }
  }),
  [GET_USERS]: state => ({
    ...state,
    loading: {
      ...state.loading,
      GET_USERS: true
    },
  }),
  [GET_USERS_SUCCESS]: (state, action) => ({
    ...state,
    loading: {
      ...state.loading,
      GET_USERS: false
    },
    users: action.payload
  }),
  [GET_USERS_FAILURE]: state => ({
    ...state,
    loading: {
      ...state.loading,
      GET_USERS: false
    }
  }),
}, initialState );

export default sample;

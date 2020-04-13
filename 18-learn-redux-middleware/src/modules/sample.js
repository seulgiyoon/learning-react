import { handleActions } from 'redux-actions';
import * as api from '../lib/api';
import createRequestThunk from '../lib/createRequestThunk';

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// thunk 함수 내부에서 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치한다.
// 객체가 아닌 함수형태의 액션을 반환함.
export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

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

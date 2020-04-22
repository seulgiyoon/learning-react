import axios from 'axios';

const GET_USERS_PENDING = 'users/GET_USERS_PENDING';
const GET_USERS_SUCCESS = 'users/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'users/GET_USERS_FAILURE';

const getUserPending = () => ({ type: GET_USERS_PENDING });
const getUsersSuccess = (payload) => ({ type: GET_USERS_SUCCESS, payload });
const getUsersFailure = (payload) => ({ type: GET_USERS_FAILURE, payload, error: true });


export const getUsers = () => async dispatch => {
  try {
    dispatch(getUserPending());
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    dispatch(getUsersSuccess(response.data));
  }
  catch(error) {
    dispatch(getUsersFailure(error));
    throw error;
  }
}

const initialState = {
  users: null,
  user: null,
  loading: {
    users: false,
    user: false,
  },
  error: {
    users: null,
    user: null
  }
};

function users(state = initialState, action) {
  switch(action.type) {
    case GET_USERS_PENDING:
      return {
        ...state,
        loading: {
          ...state.loading,
          users: true 
        }
      }
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: {
          ...state.loading,
          users: false,
        }
      }
    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: {
          ...state.loading,
          users: false,
        },
        error: {
          ...state.error,
          users: action.payload
        }
      }
    default:
      return state;
  }
};

export default users;

import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  SignOut,
  SignUp,
  fetch_Users_Signup_COMPLETE,
} from './userTypes';

const initialState = {
  isloading: false,
  users: [],
  name: '',
  error: '',
  islogging: false,
  token: '',
  feedback: [],
  id: '',
  profile: '',
  msg: '',
  pswd: '',
  isSignup: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isloading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isloading: false,
        users: action.payload,
        error: '',
        islogging: true,
        token: action?.payload?.UserLogin?.token,
        id: action?.payload?.UserLogin?._id,
        feedback: action?.payload?.UserLogin?.Feadbacks,
        name: action?.payload?.UserLogin?.name,
        profile: action?.payload?.UserLogin?.profile,
      };
    case FETCH_USERS_FAILURE:
      return {
        isloading: false,
        users: [],
        error: 'User does not exist',
      };
    case SignOut: //remove this
      return {
        ...state,
        isloading: false,
        islogging: false,
        users: [],
      };
    case SignUp:
      return {
        ...state,
        islogging: false,
        isloading: false,
        isSignup: true,
        users: action.payload,
        error: '',
        msg: action?.payload?.message,
        pswd: action?.payload?.password,
      };
    case fetch_Users_Signup_COMPLETE:
      return {
        ...state,
        isSignup: false,
      };

    default:
      return state;
  }
};
export default reducer;

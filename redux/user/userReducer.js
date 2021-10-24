import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  SignOut,
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
        error: action.payload,
      };
    case SignOut: //remove this
      return {
        isloading: false,
        islogging: false,
        users: [],
      };
    default:
      return state;
  }
};
export default reducer;

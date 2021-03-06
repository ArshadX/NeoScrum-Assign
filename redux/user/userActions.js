import axios from 'axios';

import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  SignOut,
  SignUp,
  fetch_Users_Signup_COMPLETE,
} from './userTypes';

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
const fetchUsersSignup = users => {
  return {
    type: SignUp,
    payload: users,
  };
};

const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};
const signOUT = () => {
  //remove this
  return {
    type: SignOut,
  };
};
const fetchUsersSignupComplete = () => {
  return {
    type: fetch_Users_Signup_COMPLETE,
  };
};

export const login = data => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios
      .post('https://quiet-harbor-07900.herokuapp.com/DeveloperSignin', data)
      .then(response => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
        console.log(users);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
        console.log(errorMsg);
      });
  };
};
export const registerUser = data => {
  return dispatch => {
    dispatch(fetchUsersRequest());
    axios
      .post('https://quiet-harbor-07900.herokuapp.com/register', data)
      .then(response => {
        const users = response.data;
        dispatch(fetchUsersSignup(users));
        console.log(users);
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchUsersFailure(errorMsg));
        console.log(errorMsg);
      });
  };
};

export const Logout = () => {
  return dispatch => {
    dispatch(signOUT());
  };
};
export const SignupComplete = () => {
  return dispatch => {
    dispatch(fetchUsersSignupComplete());
  };
};

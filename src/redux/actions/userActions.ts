import actionTypes from '../actionTypes';

/*
 * Reducer actions related with login
 */

export const loginRequest = (body: any, keepLogin: boolean) => {
  return {
    type: actionTypes.LOGIN_REQUEST,
    body,
    keepLogin,
  };
};

export const loginFailed = (error: any) => {
  return {
    type: actionTypes.LOGIN_FAILED,
    error,
  };
};

export const loginSuccess = (response: any) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    response,
  };
};

// logout
export const logOut = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

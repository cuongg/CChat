import actionTypes from 'redux/actionTypes';

export interface IUserReducer {
  data?: {};
  type: string;
  resetPasswordStatus: any;
  errorMessage: string;
  keepLogin: boolean;
  userSession: {
    user: {};
  };
  loginInfo: {};
  userName: string;
  loginWithFingerPrint: boolean;
  dataKekhai: {};
  listRead: [];
  dataBackUp: [];
  timeRead: string;
}
const initialState: IUserReducer = {
  data: {},
  type: '',
  resetPasswordStatus: null,
  errorMessage: '',
  keepLogin: false,
  userSession: {
    user: {},
  },
  loginInfo: {},
  userName: '',
  loginWithFingerPrint: false,
  dataKekhai: {},
  listRead: [],
  dataBackUp: [],
  timeRead: '',
};

export default (state = initialState, action: any) => {
  state.type = action.type;
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        userSession: {},
        dataKekhai: {},
        errorMessage: action.error,
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        data: action.response,
        keepLogin: action.keepLogin,
        loginInfo: action.body,
        errorMessage: '',
      };
    default:
      return state;
  }
};

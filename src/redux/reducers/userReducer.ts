import actionTypes from 'redux/actionTypes';

export interface IUserReducer {
  data?: {};
  type: string;
  errorMessage: string;
}
const initialState: IUserReducer = {
  data: {},
  type: '',
  errorMessage: '',
};

export default (state = initialState, action: any) => {
  state.type = action.type;
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        data: action.response,
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        errorMessage: '',
      };
    default:
      return state;
  }
};

export interface IUserReducer {
  type: string;
  isLoading: boolean;
}
const initialState: IUserReducer = {
  type: '',
  isLoading: false,
};

export default (state = initialState, action: any) => {
  state.type = action.type;
  if (action.type.includes('_REQUEST')) {
    return {
      ...state,
      isLoading: true,
    };
  }

  return {
    ...state,
    isLoading: false,
  };
};

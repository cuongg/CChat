import {combineReducers} from 'redux';
// Redux: Root Reducer
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';

const rootReducer = combineReducers({
  userReducer,
  loadingReducer,
});
// Exports
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

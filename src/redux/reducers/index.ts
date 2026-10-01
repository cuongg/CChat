import {combineReducers} from 'redux';
// Redux: Root Reducer
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userReducer,
});
// Exports
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;

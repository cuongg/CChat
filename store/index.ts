// Imports: Dependencies
import AsyncStorage from '@react-native-community/async-storage';
import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import sagas from '../src/redux/sagas';
import _ from 'lodash';
// Imports: Redux
import rootReducer from '../src/redux/reducers';
import * as serviceHandle from '../src/services/serviceHandle';
import actionTypes from '../src/redux/actionTypes';
// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: 'root',
  timeout: 0,
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['userReducer', 'languageReducer'],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
};
// Middleware: Redux Persist Persisted Reducer
const middleware = [];
const sagaMiddleware = createSagaMiddleware();
const handleAuthTokenMiddleware = () => (next: any) => (action: any) => {
  // if (action.type === actionTypes.LOGIN_SUCCESS) {
  //   const token = action.response?.result.accessToken;
  //   serviceHandle.setToken(token);
  // }
  next(action);
};
middleware.push(sagaMiddleware, handleAuthTokenMiddleware);
if (__DEV__) {
  middleware.push(createLogger());
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

const enhancers = [applyMiddleware(...middleware)];

const config: any = {enhancers};

// Redux: Store

const store = createStore(persistedReducer, undefined, compose(...enhancers));
// Middleware: Redux Persist Persister
const persistor = persistStore(store, config, () => {
  const stateData: any = store.getState();
  if (
    !_.isEmpty(stateData.userReducer) &&
    !_.isEmpty(stateData.userReducer.data)
  ) {
    // serviceHandle.setToken(stateData.userReducer.data.result.accessToken);
  }
});
sagaMiddleware.run(sagas);

// Exports
export {store, persistor};

import {put, call} from 'redux-saga/effects';
import {post} from '../../services/serviceHandle';
import serviceBase from '../../services/serviceBase';
import * as userActions from '../actions/userActions';
import _ from 'lodash';

export function* login(payload) {
  const url = serviceBase.url.login;
  try {
    const response = yield call(post, url, payload.body);
    if (response.error && !_.isEmpty(response.detail)) {
      yield put(userActions.loginFailed(response.detail));
    } else {
      yield put(
        userActions.loginSuccess(
          response.response,
          payload.keepLogin,
          payload.body.UserNameOrEmailAddress,
        ),
      );
    }
  } catch (error) {
    console.log('function*login -> error', error);
    // yield put(userActions.loginFailed(error));
  }
}

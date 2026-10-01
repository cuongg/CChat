import {create, NETWORK_ERROR} from 'apisauce';
import serviceBase from './serviceBase';
import _ from 'lodash';
import {Alert} from 'react-native';

// Debug mode
const debugMode = false;
const debug = (body: any) => {
  debugMode && Alert.alert('Params', JSON.stringify(body));
};

const api = create({
  baseURL: serviceBase.url.HOST,
  timeout: 60000,
  headers: {'content-type': 'application/json; charset=utf-8'},
});

const convertProblemMessages = (message: string) => {
  switch (message) {
    case NETWORK_ERROR:
      return 'Kết nối Wifi/3G/GPRS bị gián đoạn, Quý khách vui lòng kiểm tra lại';
    default:
      return message;
  }
};

/**
 * process return data
 * @param {*} response
 */
const returnData = (response: any) => {
  console.log('returnData -> response', response);
  let errorMessage = '';
  if (serviceBase.statusCode.success.includes(response.status)) {
    return {
      response: response.data,
      error: false,
    };
  }
  if (_.isNull(response.data)) {
    errorMessage = convertProblemMessages(response.problem);
  } else if (
    serviceBase.statusCode.notFound.includes(response.data.status) ||
    serviceBase.statusCode.auth.includes(response.data.status)
  ) {
    errorMessage = `${
      response.data.message ? response.data.message : response.data
    }`;
  } else if (serviceBase.statusCode.error.includes(response.data.status)) {
    errorMessage = convertProblemMessages(response.problem);
  } else {
    errorMessage = convertProblemMessages(response.data.problem);
  }
  return {
    errorMessage,
    detail: response.data ? response.data.error.details : errorMessage,
    error: true,
  };
};

/**
 * set token for authentication
 * @param {*} token
 */
const setToken = (token: string) => {
  api.setHeader('Authorization', `Bearer ${token}`);
  api.setHeader('Accept', 'application/json; charset=utf-8');
};

/**
 *
 * @param {*url without host} url
 * @param {*param} params
 */
const get = async (url: string, params: any) => {
  debug(params);
  const dataResponse = await api.get(url, params);
  return returnData(dataResponse);
};

/**
 *
 * @param {*url without host} url
 * @param {*} body
 */
const post = async (url: string, body: any) => {
  debug(body);
  const dataResponse = await api.post(url, JSON.stringify(body));
  return returnData(dataResponse);
};

/**
 *
 * @param {*url without host} url
 * @param {*} body
 */
const put = async (url: string, body: any) => {
  debug(body);
  const dataResponse = await api.put(url, body);
  // logic handle dataResponse here
  return returnData(dataResponse);
};

/**
 *
 * @param {*url without host} url
 * @param {*} body
 */
const patch = async (url: string, body: any) => {
  debug(body);
  const response = await api.patch(url, body);
  return returnData(response);
};

/**
 *
 * @param {*url without host} url
 * @param {*} body
 */
const deleteApi = async (url: string, body: any) => {
  debug(body);
  const response = await api.delete(url, body);
  // logic handle response here
  return returnData(response);
};

export {get, post, setToken, put, patch, deleteApi};

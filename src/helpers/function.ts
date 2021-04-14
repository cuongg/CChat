import queryString from 'query-string';
import _ from 'lodash';

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const convertObjectToQuery = (param: any) => {
  if (_.isEmpty(param)) {
    return '';
  }
  return '?' + queryString.stringify(param);
};

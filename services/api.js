import axios from 'axios';
import {BASE_URL} from '../constants';
var HttpClient = null;

export const createHttpClient = function (token) {
  HttpClient = axios.create({
    //all axios can be used, shown in axios documentation
    baseURL: BASE_URL,
    responseType: 'json',
    timeout: 10000,
    headers: {
      Authorization: 'Bearer ' + token,
      responseType: 'application/json',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

export default HttpClient = function () {
  return HttpClient;
};

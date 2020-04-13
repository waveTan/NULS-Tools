import axios from 'axios'
import {API_URL, API_TIME, chainInfo} from '../config.js'

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = API_TIME;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

/**
 * 封装get方法
 * Encapsulation get method
 * @param url
 * @param params
 * @returns {Promise}
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: params})
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        console.log(err);
        reject('网络异常')
      })
  })
}

/**
 * 封装post请求
 * Encapsulation post method
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, methodName, data = {}) {
  data.unshift(chainInfo.chainId);
  const parameter = {"jsonrpc": "2.0", "method": methodName, "params": data, "id": Math.floor(Math.random() * 1000)};
  return new Promise((resolve, reject) => {
    axios.post(url, parameter)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * Encapsulation patch method
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装 put 请求
 *  Encapsulation put method
 * @param url
 * @param data
 * @returns {Promise}
 * */
export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

import axios from 'axios'
import {IS_RUN, API_TIME, chainInfo} from './../config'

let API_URL = IS_RUN ? 'https://public1.nuls.io' : 'http://beta.public1.nuls.io/';
axios.defaults.baseURL = API_URL;
axios.defaults.timeout = Number(API_TIME);
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

/**
 * 封装get方法
 * Encapsulation get method
 * @param url
 * @param params
 * @returns {Promise}
 */
export function nulsGet(url: string, params = {}) {
    axios.defaults.baseURL = API_URL;
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
export async function nulsPost(url: string, methodName: string, data: any = {}) {
    axios.defaults.baseURL = API_URL;
    data.unshift(chainInfo.chainId);
    const parameter = {"jsonrpc": "2.0", "method": methodName, "params": data, "id": Math.floor(Math.random() * 1000)};
    try {
        let resData = await axios.post(url, parameter);
        return resData.data;
    } catch (err) {
        return err
    }
}

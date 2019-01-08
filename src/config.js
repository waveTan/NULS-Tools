const IS_DEV = process.env.NODE_ENV !== 'production';
let host = window.location.host; //获取地址和端口
//let host = '127.0.0.1:8080'; //获取地址和端口

//Request response time
export const API_TIME = IS_DEV ? '6000' : '16000';

//运行环境（true:正式环境，false:测试环境）
export const RUN_DEV = true;

//Request url
//测试网是http,正式环境是https
let url= RUN_DEV ? 'https://'+host+'/api/' : 'http://'+host+'/api/';
export const API_ROOT = IS_DEV ? '/api/' : url;


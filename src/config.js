/**
 * @disc: 测试网 配置文件
 * @date: 2019-10-10 13:58
 * @author: Wave
 */
"use strict";
//开发模式
export const IS_DEV = process.env.NODE_ENV === 'production';
//链信息
export const chainInfo = {chainId: 1, assetsId: 1, prefix: 'NULS'};
//api正式、测试网络的api
export let API_URL = IS_DEV ? 'http://public2.nuls.io' : 'http://public2.nuls.io';
//请求最迟时间
export const API_TIME = IS_DEV ? '9000' : '5000';
//浏览器连接地址
export const EXPLORER_URL = 'http://www.nulscan.io/';

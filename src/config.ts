/**
 * @disc: 测试网 配置文件
 * @date: 2019-10-10 13:58
 * @author: Wave
 */
"use strict";
//开发模式
export const IS_DEV = process.env.NODE_ENV === 'production';
//运行模式
export const IS_RUN = false;
//链信息
export const chainInfo =
  IS_RUN ? {chainId: 1, assetsId: 1, prefix: 'NULS'} : {chainId: 2, assetsId: 1, prefix: 'tNULS'};
//api正式、测试网络的api
export let API_URL = IS_RUN ? 'https://public1.nuls.io' : 'http://beta.public1.nuls.io/';
//请求最迟时间
export const API_TIME = IS_DEV ? '9000' : '5000';
//浏览器连接地址
export const EXPLORER_URL = IS_RUN ? 'https://nulscan.io/' : 'http://beta.nulscan.io/';
//开发者地址
export const DEV_ADDRESS = 'NULSd6HgaWymKrQ7NdtWossLFzunasJzdwave';


import {BigNumber} from 'bignumber.js'
import copy from 'copy-to-clipboard'
import {EXPLORER_URL, IS_RUN} from '@/config'
import openner from "./opener-web";
import {post} from './https'

/**
 * 10的N 次方
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Power(arg) {
  let newPower = new BigNumber(10);
  return newPower.pow(arg);
}

/**
 * 加法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Plus(nu, arg) {
  let newPlus = new BigNumber(nu);
  return newPlus.plus(arg);
}

/**
 * 减法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Minus(nu, arg) {
  let newMinus = new BigNumber(nu);
  return newMinus.minus(arg);
}

/**
 * 乘法
 * @param nu
 * @param arg
 * @returns {string}
 * @constructor
 */
export function Times(nu, arg) {
  let newTimes = new BigNumber(nu);
  return newTimes.times(arg).toFormat().replace(/[,]/g, '');
}

/**
 * 数字乘以精度系数
 * @param nu
 * @param decimals
 * @returns {number}
 * @constructor
 */
export function timesDecimals(nu, decimals = 8) {
  if (Number(nu) === 0) {
    return 0;
  }
  let newNu = new BigNumber(Times(nu, Power(decimals)).toString());
  return Number(newNu);
}

/**
 * 除法
 * @param nu
 * @param arg
 * @returns {string}
 * @constructor
 */
export function Division(nu, arg) {
  let newDiv = new BigNumber(nu);
  return newDiv.div(arg).toFormat().replace(/[,]/g, '');
}

/**
 * 数字除以精度系数
 * @param nu
 * @param decimals
 * @returns {string}
 * @constructor
 */
export function divisionDecimals(nu, decimals = 8) {
  let newNu = new BigNumber(Division(nu, Power(decimals)).toString());
  return newNu.toFormat().replace(/[,]/g, '');
}

/**
 * 保留指定小数位数
 * @param val 要处理的数据，Number | String
 * @param len 保留小数位数，位数不足时，以0填充
 * @param side 1|-1 对应 入|舍
 * @returns {string|number}
 */
export function tofix(val, len, side) {
  const numval = Number(val);
  if (isNaN(numval)) return 0;
  const str = val.toString();
  if (str.indexOf('.') > -1) {
    let numArr = str.split('.');
    if (numArr[1].length > len) {
      let tempnum = numval * Math.pow(10, len);
      if (!side) {
        return Number(val).toFixed(len)
      } else if (side === 1) {
        if (tempnum < 1) return (1 / Math.pow(10, len));
        return (Math.ceil(tempnum) / Math.pow(10, len)).toFixed(len)
      } else if (side === -1) {
        return (Math.floor(tempnum) / Math.pow(10, len)).toFixed(len)
      } else {
        return Number(val.toFixed(len))
      }
    } else {
      return Number(str).toFixed(len)
    }
  } else {
    return Number(val).toFixed(len)
  }
}

/**
 * @disc: 方法休眠
 * @params: time 时间毫秒
 * @date: 2020-04-15 14:52
 * @author: Wave
 */
export function sleep(time) {
  for (let t = Date.now(); Date.now() - t <= time;) ;
}

/**
 * 根据不同时区显示时间
 * @param time
 * @returns {*}
 */
export function getLocalTime(time) {
  if (typeof time !== 'number') return;
  let d = new Date();
  let offset = d.getTimezoneOffset() * 60000;
  let localUtc = new Date().getTimezoneOffset() / 60;
  let utcTime;
  if (localUtc > 0) {
    utcTime = time - offset;
  } else {
    utcTime = time + offset;
  }
  let localTime = utcTime + 3600000 * Math.abs(localUtc);
  return new Date(localTime);
}

/**
 * 复制 copy
 * @param value
 */
export const copys = (value) => copy(value);

/**
 * 超长数字显示
 * @param nu
 * @param powerNu
 * @returns {string}
 */
export function langNumber(nu, powerNu) {
  let newNu = new BigNumber(Division(nu, powerNu).toString());
  return newNu.toFormat().replace(/[,]/g, '');
}

/**
 * 字符串中间显示....
 * @param string
 * @param leng
 * @returns {*}
 */
export function superLong(string, leng) {
  if (string && string.length > 10) {
    return string.substr(0, leng) + "...." + string.substr(string.length - leng, string.length);
  } else {
    return string;
  }
}

/**
 * 连接跳转
 * @param name
 * @param parameter
 */
export function connectToExplorer(name, parameter) {
  let newUrl = '';
  if (name === 'height') {
    newUrl = EXPLORER_URL + 'block/info?height=' + parameter
  } else if (name === 'address') {
    newUrl = EXPLORER_URL + 'address/info?address=' + parameter
  } else if (name === 'hash') {
    newUrl = EXPLORER_URL + 'consensus/info?hash=' + parameter
  } else if (name === 'rotation') {
    newUrl = EXPLORER_URL + 'rotation/info?rotation=' + parameter
  } else if (name === 'contractsInfo') {
    newUrl = EXPLORER_URL + 'contracts/info?contractAddress=' + parameter
  } else if (name === 'contracts') {
    newUrl = EXPLORER_URL + 'contracts'
  } else if (name === 'consensusInfo') {
    newUrl = EXPLORER_URL + 'consensus/info?hash=' + parameter
  } else if (name === 'transactionInfo') {
    newUrl = EXPLORER_URL + 'transaction/info?hash=' + parameter
  } else if (name === 'nuls') {
    newUrl = parameter
  }
  return newUrl
}

/**
 * html转码
 * @param str
 * @returns {s}
 */
export function htmlEncodeByRegExp(str) {
  let s = "";
  if (str.length === 0) return "";
  s = str.replace(/&/g, "&amp;");
  s = s.replace(/</g, "&lt;");
  s = s.replace(/>/g, "&gt;");
  s = s.replace(/ /g, "&nbsp;");
  s = s.replace(/[\n\r\\]/g, '&nbsp;');
  s = s.replace(/\\'/g, "&apos;");
  s = s.replace(/\\"/g, "&quot;");
  return s;
}

/**
 * html解码
 * @param str
 * @returns {s}
 */
export function htmlDecodeByRegExp(str) {
  let s = "";
  if (str.length === 0) return "";
  s = str.replace(/&amp;/g, "&");
  s = s.replace(/&lt;/g, "<");
  s = s.replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, " ");
  s = s.replace(/&apos;/g, "\\'");
  s = s.replace(/&quot;/g, "\"");
  return s;
}

/**
 * @disc: 判断pc和手机端
 * @date: 2020-05-29 16:51
 * @author: Wave
 */
export function IsPC() {
  let userAgentInfo = navigator.userAgent;
  let Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

/**
 * 账户localStorage
 */
export function addressSetStorage(newAddressInfo) {
  //console.log(newAddressInfo);
  let addressList = [];
  let res = localStorage.getItem('addressData');
  let resData = [];
  if (res) {
    resData = [...JSON.parse(res), newAddressInfo];
  } else {
    resData.push(newAddressInfo);
  }
  let obj = {};
  let newAddressList = resData.reduce((item, next) => {
    obj[next.address] ? '' : obj[next.address] = true && item.push(next);
    return item
  }, []);

  //console.log(newAddressList.length);
  if (newAddressList.length !== 0) {
    let isAddress = false;
    for (let item of newAddressList) {
      item.isCurrent = false;
      if (item.address === newAddressInfo.address) {
        isAddress = true;
        item.isCurrent = true;
      }
    }
    if (isAddress) {
      newAddressInfo.isCurrent = true;
      addressList = [...newAddressList]
    } else {
      addressList = [...newAddressList]
    }
  }
  //console.log(addressList);
  localStorage.setItem('addressData', JSON.stringify(addressList));
  localStorage.setItem('accountInfo', JSON.stringify(newAddressInfo));
  return {
    success: true,
    data: addressList,
  };

}

/**
 * 获取地址列表或选择地址
 * @returns {*}
 */
export async function accountList() {
  return this.$store.state.accountInfo.address;
}

/**
 * 获取参数的必填值
 * @param parameterList
 * @returns {{allParameter: boolean, args: Array}}
 */
export function getArgs(parameterList) {
  //console.log(parameterList);
  let newArgs = [];
  let allParameter = false;
  if (parameterList.length !== 0) {
    //循环获取必填参数
    for (let itme of parameterList) {
      if (itme.required) {
        if (itme.value) {
          allParameter = true;
          newArgs.push(itme.value)
        } else {
          return {allParameter: false, args: newArgs};
        }
      } else {
        allParameter = true;
        if (!itme.value) {
          newArgs.push('')
        } else {
          newArgs.push(itme.value)
        }
      }
    }
    return {allParameter: allParameter, args: newArgs};
  } else {
    return {allParameter: true, args: newArgs};
  }
}

/**
 * @disc: 在浏览器中打开 url
 * @params: newUrl
 * @date: 2020-11-30 18:19
 * @author: Wave
 */
export function openConnection(newUrl) {
  openner(newUrl);
}

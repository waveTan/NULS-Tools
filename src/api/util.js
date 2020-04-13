import {BigNumber} from 'bignumber.js'

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
 * 除法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Times(nu, arg) {
  let newTimes = new BigNumber(nu);
  return newTimes.times(arg);
}

/**
 * 除法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Division(nu, arg) {
  let newDiv = new BigNumber(nu);
  return newDiv.div(arg);
}

/**
 * 数字除以精度系数
 */
export function timesDecimals(nu,decimals = 8) {
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





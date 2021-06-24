import {BigNumber} from 'bignumber.js'
import copy from 'copy-to-clipboard'


/**
 * 10的N 次方
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Power(arg: number) {
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
export function Plus(nu:string, arg:string) {
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
export function Minus(nu:string, arg:string) {
    let newMinus = new BigNumber(nu);
    return newMinus.minus(arg);
}

/**
 * 乘法
 * @param nu
 * @param arg
 * @returns {BigNumber}
 * @constructor
 */
export function Times(nu:string, arg:string) {
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
export function Division(nu:string, arg:string) {
    let newDiv = new BigNumber(nu);
    return newDiv.div(arg);
}

/**
 * 数字乘以精度系数
 * @param nu
 * @param decimals
 * @returns {number}
 * @constructor
 */
export function timesDecimals(nu:string, decimals:number = 8) {
    if (Number(nu) === 0) {
        return 0;
    }
    let newNu = new BigNumber(Times(nu, Power(decimals).toString()).toString());
    return Number(newNu);
}

/**
 * 数字除以精度系数
 * @param nu
 * @param decimals
 * @returns {string}
 * @constructor
 */
export function divisionDecimals(nu:string, decimals = 8) {
    let newNu = new BigNumber(Division(nu, Power(decimals).toString()).toString());
    return newNu.toFormat().replace(/[,]/g, '');
}

/**
 * 保留指定小数位数
 * @param val 要处理的数据，Number | String
 * @param len 保留小数位数，位数不足时，以0填充
 * @param side 1|-1 对应 入|舍
 * @returns {string|number}
 */
export function tofix(val:string, len:number, side:number) {
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
                return Number(Number(val).toFixed(len))
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
export function getLocalTime(time:number) {
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
export const copys = (value:string) => copy(value);

/**
 * 字符串中间显示....
 * @param string
 * @param leng
 * @returns {*}
 */
export function superLong(string:string, leng:number) {
    if (string && string.length > 10) {
        return string.substr(0, leng) + "...." + string.substr(string.length - leng, string.length);
    } else {
        return string;
    }
}

let EXPLORER_URL ='';

/**
 * 连接跳转
 * @param name
 * @param parameter
 */
export function connectToExplorer(name:string, parameter:string) {
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


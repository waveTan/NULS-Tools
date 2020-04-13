import nuls from 'nuls-sdk-js'
import {post} from './https'

/**
 * @disc: 验证密码
 * @params:  accountInfo
 * @params:  password
 * @date: 2019-08-22 12:05
 * @author: Wave
 */
export function passwordVerification(accountInfo, password) {
  let aesPri = accountInfo.aesPri ? accountInfo.aesPri : accountInfo.encryptedPrivateKey;
  const pri = nuls.decrypteOfAES(aesPri, password);
  const newAddressInfo = nuls.importByKey(defaultAsset.assetsChainId, pri, password, API_PREFIX);
  if (newAddressInfo.address === accountInfo.address) {
    return {success: true, pri: pri, pub: accountInfo.pub, address: accountInfo.address, aesPri: newAddressInfo.aesPri};
  } else {
    return {success: false};
  }
}

/**
 * 计算手续费
 * @param tx
 * @param signatrueCount 签名数量，默认为1
 **/
export function countFee(tx, signatrueCount) {
  let txSize = tx.txSerialize().length;
  txSize += signatrueCount * 110;
  return 100000 * Math.ceil(txSize / 1024);
}

/**
 * 获取地址信息
 * @param address
 * @returns {Promise<any>}
 */
export async function getAddressInfoByAddress(address) {
  return await post('/', 'getAccount', [address])
    .then((response) => {
      //console.log(response);
      if (response.hasOwnProperty('result')) {
        return {success: true, data: response.result}
      } else {
        return {success: false, data: response}
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 获取地址的余额及nonce根据地址
 * @param chainId
 * @param assetId
 * @param address
 * @returns {Promise<any>}
 */
export async function getBalanceOrNonceByAddress(address, chainId = 2, assetId = 1) {
  return await post('/', 'getAccountBalance', [chainId, assetId, address])
    .then((response) => {
      //console.log(response);
      if (response.success) {
        return {success: true, data: {balance: response.data.balance, nonce: response.data.nonce}}
      } else {
        return {success: false, data: response}
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 验证交易
 * @param txHex
 * @returns {Promise<any>}
 **/
export async function validateTx(txHex) {
  return await post('/', 'validateTx', [txHex])
    .then((response) => {
      //console.log(response);
      if (response.success) {
        return {success: true, data: response.data.value};
      } else {
        return {success: false, data: response.error};
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 广播交易
 * @param txHex
 * @returns {Promise<any>}
 **/
export async function broadcastTx(txHex) {
  return await post('/', 'broadcastTx', [txHex])
    .then((response) => {
      if (response.success) {
        return {success: true, data: response};
      } else {
        return {success: false, data: response};
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 验证交易并广播
 * @param txHex
 * @returns {Promise<any>}
 **/
export async function validateAndBroadcast(txHex) {
  return await post('/', 'validateTx', [txHex])
    .then((response) => {
      console.log(response);
      if (response.success) {
        let newHash = response.data.value;
        return post('/', 'broadcastTx', [txHex])
          .then((response) => {
            //console.log(response);
            if (response.success) {
              return {success: true, hash: newHash};
            } else {
              return {success: false, data: response};
            }
          })
          .catch((error) => {
            return {success: false, data: error};
          });
      } else {
        return {success: false, data: response};
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}

/**
 * 获取合约代码构造函数
 * @param contractCodeHex
 * @returns {Promise<any>}
 */
export async function getContractConstructor(contractCodeHex) {
  return await post('/', 'getContractConstructor', [contractCodeHex])
    .then((response) => {
      //console.log(response);
      if (response.hasOwnProperty("result")) {
        return {success: true, data: response.result.constructor};
      } else {
        return {success: false, data: response.error};
      }
    })
    .catch((error) => {
      return {success: false, data: error};
    });
}


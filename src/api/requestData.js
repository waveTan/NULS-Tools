import nuls from 'nuls-sdk-js'
import {chainInfo} from '@/config'
import {post} from './https'
import {Plus} from './util'

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
  const newAddressInfo = nuls.importByKey(chainInfo.chainId, pri, password, chainInfo.prefix);
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
 * 获取inputs and outputs
 * @param transferInfo
 * @returns {*}
 **/
export async function inputsOrOutputs(transferInfo, balanceInfo, type = 2) {
  let inputs = [{
    address: transferInfo.fromAddress,
    assetsChainId: transferInfo.assetsChainId,
    assetsId: transferInfo.assetsId,
    amount: transferInfo.amount,
    locked: 0,
    nonce: balanceInfo.data.nonce
  }];
  let outputs = [
    {
      address: transferInfo.toAddress,
      assetsChainId: transferInfo.assetsChainId,
      assetsId: transferInfo.assetsId,
      amount: transferInfo.amount,
      lockTime: 0
    }
  ];

  if (type === 2) {
    inputs[0].amount = Number(transferInfo.minValue);
    outputs[0].lockTime = transferInfo.time ? transferInfo.time/1000 : 0;
  } else if (type === 16) {
    if (transferInfo.toAddress) {
      if (transferInfo.value) {
        inputs[0].amount = Number(Plus(transferInfo.amount, transferInfo.fee));
        outputs[0].amount = transferInfo.value;
      }
    }
  }
  /*console.log(inputs);
  console.log(outputs);*/
  return {success: true, data: {inputs: inputs, outputs: outputs}};
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
      if (response.hasOwnProperty('result')) {
        return {success: true, data: {balance: response.result.balance, nonce: response.result.nonce}}
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
      //console.log(response);
      if (response.hasOwnProperty('result')) {
        let newHash = response.result.value;
        return post('/', 'broadcastTx', [txHex])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty('result')) {
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


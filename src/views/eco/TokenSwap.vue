<template>
  <div class="tokenSwap w1200">
    <div class="top">
      <div class="tc font18" style="line-height: 3rem">Token Swap</div>
    </div>
    <div class="info">
      <div class="fl">
        <div class="title">
          <span style="color: #0ede94 ">买入</span>
          <el-button @click="showDialog(0)" class="fr" type="success" size="mini" round>挂买单</el-button>
        </div>

        <el-table :data="buyData" stripe style="width: 580px">
          <el-table-column prop="addresss" label="广告方" min-width="160">
          </el-table-column>
          <el-table-column label="数量" width="130">
            <template slot-scope="scope">
              {{scope.row.number}}(<span class="click" :title="'合约地址:'+scope.row.token">{{scope.row.symbol}}</span>)
            </template>
          </el-table-column>
          <el-table-column label="金额" width="130">
            <template slot-scope="scope">
              {{scope.row.amount}}(<span>NULS</span>)
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="left">
            <template slot-scope="scope">
              <el-button @click="sellClick(scope.row)" class="sell" type="text" size="small">出售</el-button>
              <el-button @click="undoClick(scope.row)" type="text" size="small" v-if="scope.row.isMyOrder">撤销
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="fr tl">
        <div class="title">
          <span class="fred">卖出</span>
          <el-button @click="showDialog(1)" class="fr" type="danger" size="mini" round>挂卖单</el-button>
        </div>
        <el-table :data="sellData" stripe style="width: 580px">
          <el-table-column prop="addresss" label="广告方" min-width="160">
          </el-table-column>
          <el-table-column label="数量" width="130">
            <template slot-scope="scope">
              {{scope.row.number}}(<span class="click" :title="'合约地址:'+scope.row.token">{{scope.row.symbol}}</span>)
            </template>
          </el-table-column>
          <el-table-column label="金额" width="130">
            <template slot-scope="scope">
              {{scope.row.amount}}(<span>NULS</span>)
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" align="left">
            <template slot-scope="scope">
              <el-button @click="buyClick(scope.row)" class="buy" type="text" size="small">买入</el-button>
              <el-button @click="undoClick(scope.row)" type="text" size="small" v-if="scope.row.isMyOrder">撤销
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>

    <el-dialog :title="dialogTitle" :visible.sync="buyOrSellDialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false" class="token-dialog" width="50rem">
      <div class="fl" v-if="isShowInfo">
        <ul>
          <li>广告方:<span class="click">NULSd6HgXNRbGv7iMsoRRA37fzyTukitrWAVe(wave)</span></li>
          <li>数量:<span>88888(Goblin)</span></li>
          <li>金额:<span>999999(NULS)</span></li>
          <li>合约地址:<span class="click">NULSd6HgXNRbGv7iMsoRRA37fzyTukitrWAVe</span></li>
          <li>合约创建地址:<span class="click">NULSd6HgXNRbGv7iMsoRRA37fzyTukitrWAVe(wave)</span></li>
        </ul>
      </div>
      <div :class="isShowInfo ? 'fr':''">
        <el-form :model="tokenSwapForm" status-icon :rules="tokenSwapRules" ref="tokenSwapForm" class="tokenSwap-form">
          <el-form-item label="账户" prop="fromAddress">
            <el-select v-model="tokenSwapForm.fromAddress" filterable placeholder="请选择地址" @change="changeAddress">
              <el-option v-for="item in addressList" :key="item.address" :label="item.labels" :value="item.address">
              </el-option>
            </el-select>

          </el-form-item>
          <div class="balance">{{addressInfo.balance}} <span class="fCN">NULS</span></div>
          <el-form-item label="资产" prop="assets">
            <el-select v-model="tokenSwapForm.assets" filterable placeholder="请选择资产" @change="changeAssets">
              <el-option v-for="item in addressInfo.tokens"
                         :key="item.contractAddress"
                         :label="item.tokenSymbol +'('+item.balances +')'"
                         :value="item.contractAddress">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="'数量('+tokenInfo.tokenSymbol+')'" prop="number">
            <el-input v-model="tokenSwapForm.number" autocomplete="off">
              <el-button slot="append" @click="changeAll">全部</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="金额(NULS)" prop="amount">
            <el-input v-model="tokenSwapForm.amount" autocomplete="off">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="cb"></div>
      <div slot="footer" class="dialog-footer tc">
        <el-button @click="resetForm('tokenSwapForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('tokenSwapForm')">确 定</el-button>
      </div>
    </el-dialog>

    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
  </div>
</template>

<script>
  import axios from 'axios'
  import nuls from 'nuls-sdk-js'
  import Password from '@/components/PasswordBar'
  import {chainInfo} from '@/config.js'
  import {
    Division,
    divisionDecimals,
    timesDecimals,
    accountList,
    superLong,
    getArgs,
    Times,
    Plus,
    tofix,
    getLocalTime
  } from '@/api/util'
  import {
    countFee,
    inputsOrOutputs,
    validateAndBroadcast,
    passwordVerification,
    getBalanceOrNonceByAddress,
    validateTx
  } from '@/api/requestData'
  import {chainMethodCall} from '@/api/contractCall'

  export default {
    name: "token-swap",
    data() {
      let checkFromAddress = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账户不能为空'));
        } else {
          callback();
        }
      };
      let checkAssets = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('资产不能为空'));
        } else {
          callback();
        }
      };
      let checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('数量不能为空'));
        }/* else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } */ else {
          callback();
        }
      };
      let checkAmount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('数量不能为空'));
        } /*else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } */ else {
          callback();
        }
      };
      return {
        addressList: [],//地址列表
        addressInfo: {},//选择地址信息
        urls: 'http://129.204.111.201:81',//连接地址
        tokenInfo: {},//token信息
        contractAddress: 'tNULSeBaNAQdsP9hxLhZahNU8HhKH1rmP9W7GR',
        allNRC20List: [],//所有NRC20合约
        contractInfo: {},
        contractCallData: {},//调用合约信息

        buyData: [],
        sellData: [],
        buyOrSellDialog: false,//买、卖挂单弹框
        dialogTitle: '',//弹框标题
        isShowInfo: false,//是否显示弹框左侧信息
        type: 'buy',//类型（buy:买 sell:卖）
        tokenSwapForm: {
          fromAddress: '',
          assets: '',
          number: '1',
          amount: '2'
        },

        tokenSwapRules: {
          fromAddress: [
            {validator: checkFromAddress, trigger: 'blur'}
          ],
          assets: [
            {validator: checkAssets, trigger: 'blur'}
          ],
          number: [
            {validator: checkNumber, trigger: 'blur'}
          ],
          amount: [
            {validator: checkAmount, trigger: 'blur'}
          ]
        },
      }
    },
    components: {
      Password,
    },
    created() {
      this.addressInfo = accountList(1);
      this.getAddressList()
    },
    mounted() {
      this.init();
      //this.getAddressList()
      /*this.goblinSetInterval = setInterval(() => {
        this.getAddressList();
      }, 10000);*/
    },
    beforeDestroy() {
      //离开界面清除定时器
      //clearInterval(this.goblinSetInterval);
    },
    methods: {

      //初始化
      async init() {
        this.allList();
        this.getContractAddress();
        setTimeout(() => {
          this.getBuyOrdersList();
          this.getSaleOrdersList();
        }, 1000);

        let resData = await this.contractInfoByAddress(this.contractAddress);
        //console.log(resData.data);
        if (resData.success) {
          this.contractInfo = resData.data;
        }
      },

      /**
       * @disc:获取合约地址
       * @params:
       * @date: 2020-12-15 15:04
       * @author: Wave
       */
      async getContractAddress() {
        let url = this.urls + '/tokenex/contract';
        try {
          let resData = await axios.get(url);
          //console.log(resData.data);
          if (resData.data.success) {
            this.contractAddress = resData.data.data;
          } else {
            console.log('获取合约地址失败: ' + JSON.stringify(resData.data))
          }
        } catch (err) {
          console.log('获取合约地址异常: ' + JSON.stringify(err))
        }
      },

      /**
       * 获取合约详情根据合约地址
       * @param address
       **/
      async contractInfoByAddress(address) {
        return await this.$post('/', 'getContract', [address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              //this.contractInfo = response.result;
              return {success: true, data: response.result}
            } else {
              return {success: false, data: response}
            }
          })
          .catch((error) => {
            return {success: false, data: error}
          });
      },

      /**
       * @disc: 获取所有list
       * @params:
       * @date: 2020-12-15 15:53
       * @author: Wave
       */
      async allList(pageIndex = 1, pageSize = 100) {
        let resDatas = await this.getAllNRC20(pageIndex, pageSize);
        //console.log(resDatas);
        if (resDatas.success) {
          this.allNRC20List = [...this.allNRC20List, ...resDatas.data.list];
          if (resDatas.data.totalCount > pageIndex * pageSize) {
            this.allList(pageIndex + 1, pageSize)
          }
        }
      },

      /**
       * 获取所有的NRC20合约
       **/
      async getAllNRC20(pageIndex = 1, pageSize = 100) {
        return await this.$post('/', 'getContractList', [pageIndex, pageSize, 1, false])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              //this.contractInfo = response.result;
              return {success: true, data: response.result}
            } else {
              return {success: false, data: response}
            }
          })
          .catch((error) => {
            return {success: false, data: error}
          });
      },

      /**
       * @disc:获取买单列表
       * @params:
       * @date: 2020-12-15 15:04
       * @author: Wave
       */
      async getBuyOrdersList(index = '1') {
        let url = this.urls + '/tokenex/buyOrders/' + index;
        try {
          let resData = await axios.get(url);
          if (resData.data.success) {
            //console.log(resData.data.data);
            for (let item of resData.data.data.list) {
              item.symbol = this.allNRC20List.filter(obj => obj.contractAddress === item.token)[0].symbol;
              item.addresss = superLong(item.buyer, 6);
              item.number = divisionDecimals(item.remainAmount, item.tokenDecimals);
              item.amount = parseFloat(tofix(Division(item.number, item.rate), 3, 1));
              if (item.buyer === this.addressInfo.address) {
                item.isMyOrder = true;
              } else {
                item.isMyOrder = false;
              }

            }
            this.buyData = resData.data.data.list
          } else {
            console.log('获取卖单列表失败: ' + JSON.stringify(resData.data))
          }
        } catch (err) {
          console.log('获取卖单列表异常: ' + JSON.stringify(err))
        }
      },

      /**
       * @disc:获取卖单列表
       * @params:
       * @date: 2020-12-15 15:04
       * @author: Wave
       */
      async getSaleOrdersList(index = '1') {
        let url = this.urls + '/tokenex/saleOrders/' + index;
        try {
          let resData = await axios.get(url);
          if (resData.data.success) {
            //console.log(resData.data.data);
            for (let item of resData.data.data.list) {
              item.symbol = this.allNRC20List.filter(obj => obj.contractAddress === item.token)[0].symbol;
              item.addresss = superLong(item.seller, 6);
              item.number = divisionDecimals(item.remainAmount, item.tokenDecimals);
              item.amount = Division(item.number, item.rate).toString();
              if (item.seller === this.addressInfo.address) {
                item.isMyOrder = true;
              } else {
                item.isMyOrder = false;
              }

            }
            this.sellData = resData.data.data.list
          } else {
            console.log('获取卖单列表失败: ' + JSON.stringify(resData.data))
          }
        } catch (err) {
          console.log('获取卖单列表异常: ' + JSON.stringify(err))
        }
      },

      /**
       * @disc: 显示买卖弹框
       * @params: type （0：买单 1：卖单）
       * @params: info 买、卖单信息
       * @date: 2020-12-07 17:35
       * @author: Wave
       */
      showDialog(type, info = {}) {
        this.buyOrSellDialog = true;
        this.isShowInfo = false;
        if (type === 0) {
          this.dialogTitle = '挂买单';
          this.type = 'buy';
        } else {
          this.dialogTitle = '挂卖单';
          this.type = 'sell';
        }

      },

      /**
       * @disc: 出售
       * @params: info
       * @date: 2020-12-15 17:46
       * @author: Wave
       */
      sellClick(info) {
        console.log(info)
      },

      /**
       * @disc: 买入
       * @params: info
       * @date: 2020-12-15 17:46
       * @author: Wave
       */
      buyClick(info) {
        console.log(info)
      },

      /**
       * @disc: 撤销
       * @params: info
       * @date: 2020-12-15 17:48
       * @author: Wave
       */
      undoClick(info) {
        console.log(info)
      },

      /**
       * 获取账户列表
       */
      async getAddressList() {
        let newAddressData = accountList(0);
        for (let item of newAddressData) {

          if (!item.note || item.note.toString() === 'undefined') {
            item.note = '';
            item.labels = item.address;
          } else {
            item.labels = item.address + '(' + item.note + ')';
          }

          let addressInfo = await this.getAddressInfoByNode(item.address);
          if (addressInfo.success) {
            item.balance = parseFloat(tofix(divisionDecimals(addressInfo.data.balance), 4, -1));
            let tokenList = await this.getTokenListByAddress(item.address);
            //console.log(tokenList);
            item.tokens = tokenList.data.list;
            //console.log(item.tokens);
            for (let k of item.tokens) {
              //console.log(k);
              k.balances = parseFloat(tofix(divisionDecimals(k.balance, k.decimals), k.decimals, -1));
            }
          }

        }
        this.addressList = newAddressData;
        //console.log(this.addressList);
        if (this.addressList.length !== 0) {
          this.addressInfo = this.addressList[0];
          //console.log(this.addressInfo);
          if (this.addressInfo.tokens && this.addressInfo.tokens.length !== 0) {
            this.tokenSwapForm.assets = this.addressInfo.tokens[0].contractAddress;
            this.tokenInfo = this.addressInfo.tokens[0];
          }
          this.tokenSwapForm.fromAddress = this.addressInfo.address.toString();
        }
      },

      /**
       * 获取地址网络信息
       * @param address
       **/
      async getAddressInfoByNode(address) {
        return await this.$post('/', 'getAccount', [address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              return {success: true, data: response.result}
            } else {
              return {success: false, data: response}
            }
          })
          .catch((error) => {
            return {success: false, data: error}
          });
      },

      /**
       * 获取地址代币资产信息
       * @param pageSize
       * @param pageRows
       * @param address
       **/
      async getTokenListByAddress(address, pageSize = 1, pageRows = 100) {
        return await this.$post('/', 'getAccountTokens', [pageSize, pageRows, address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              return {success: true, data: response.result}
            } else {
              return {success: false, data: response}
            }
          })
          .catch((error) => {
            return {success: false, data: error}
          });
      },

      /**
       * @disc: 选择地址
       * @params: address
       * @date: 2020-12-09 10:55
       * @author: Wave
       */
      changeAddress(address) {
        //console.log(address);
        let newAddressData = this.addressList.filter(obj => obj.address === address);
        this.addressInfo = newAddressData[0];
        if (this.addressInfo.tokens && this.addressInfo.tokens.length !== 0) {
          this.tokenSwapForm.assets = this.addressInfo.tokens[0].contractAddress;
        }
      },

      /**
       * @disc: 选择资产
       * @params: contractAddress
       * @date: 2020-12-09 11:10
       * @author: Wave
       */
      changeAssets(contractAddress) {
        //console.log(contractAddress);
        this.tokenInfo = this.addressInfo.tokens.filter(obj => obj.contractAddress === contractAddress)[0];
        //console.log(this.tokenInfo.contractAddress);
      },

      //全部
      changeAll() {
        let newTokenData = this.addressInfo.tokens.filter(obj => obj.contractAddress === this.tokenSwapForm.assets);
        this.tokenSwapForm.number = newTokenData[0].balances
      },

      /**
       * @disc: 取消弹框
       * @params:
       * @date: 2020-12-09 11:28
       * @author: Wave
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.buyOrSellDialog = false;
      },

      /**
       * @disc: 挂单提交
       * @params:
       * @date: 2020-12-09 11:27
       * @author: Wave
       */
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let name = 'buyOrder';
            console.log(this.contractInfo);
            let methodsInfo = this.contractInfo.methods.filter(obj => obj.name === name);
            console.log(this.tokenInfo);
            methodsInfo[0].params[0].value = this.tokenInfo.contractAddress;
            methodsInfo[0].params[1].value = this.tokenSwapForm.number;
            let newArgs = getArgs(methodsInfo[0].params);
            if (!newArgs.allParameter) {
              console.log('arges 错误：' + newArgs.allParameter);
              return;
            }
            let resData = await chainMethodCall(this.addressInfo.address, methodsInfo[0], this.contractAddress, this.tokenSwapForm.amount, newArgs.args);
            //console.log(resData);
            if (!resData.success) {
              console.log('验证合约错误：' + resData.data);
              return;
            }
            this.contractCallData = resData.data;
            this.$refs.password.showPassword(true, this.addressInfo.address);
          } else {
            return false;
          }
        });
      },

      /**
       *  获取密码框的密码
       * @param password
       **/
      async passSubmit(password) {
        //console.log(password);
        let newAddressInfo = this.addressList.filter(obj => obj.address === this.contractCallData.sender);
        let passwordInfo = await passwordVerification(newAddressInfo[0], password);
        //console.log(passwordInfo);
        if (!passwordInfo.success) {
          this.$message({message: this.$t('tips.tips4'), type: 'error', duration: 3000});
          for (let item of this.addressList) {
            if (item.address === newAddressInfo[0].address) {
              item.password = '';
            }
          }
          //console.log(this.addressList);
          localStorage.setItem('addressData', JSON.stringify(this.addressList));
          return;
        }

        console.log(this.contractCallData);
        let amount = Number(Times(this.contractCallData.gasLimit, this.contractCallData.price));
        let transferInfo = {
          fromAddress: this.contractCallData.sender,
          toAddress: this.contractAddress,
          assetsChainId: chainInfo.chainId,
          assetsId: 1,
          amount: amount,
          fee: 100000,
          value: timesDecimals(this.tokenSwapForm.amount).toString()
        };

        amount = Number(Plus(transferInfo.fee, amount));
        let remark = '';
        //console.log(this.balanceInfo);
        let resData = await getBalanceOrNonceByAddress(this.addressInfo.address, chainInfo.chainId, 1);
        //console.log(resData);
        if (!resData.success) {
          console.log('获取账户nonce错误:' + resData.data);
          return
        }
        let inOrOutputs = await inputsOrOutputs(transferInfo, resData, 16);
        console.log(inOrOutputs);
        let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 16, this.contractCallData);
        let txhex = '';
        //获取手续费
        let newFee = countFee(tAssemble, 1);
        //手续费大于0.001的时候重新组装交易及签名
        if (transferInfo.fee !== newFee) {
          transferInfo.fee = newFee;
          inOrOutputs = await inputsOrOutputs(transferInfo, this.balanceInfo, 16);
          tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 16, this.contractCallData);
          txhex = await nuls.transactionSerialize(passwordInfo.pri, passwordInfo.pub, tAssemble);
        } else {
          txhex = await nuls.transactionSerialize(passwordInfo.pri, passwordInfo.pub, tAssemble);
        }
        console.log(txhex);

        //验证交易
        /*let validateTxRes = await validateTx(txhex);
        console.log(validateTxRes);*/

        //验证并广播交易
        await validateAndBroadcast(txhex).then((response) => {
          //console.log(response);
          if (response.success) {
            this.$message({message: this.$t('tips.tips15'), type: 'success', duration: 1000});
          } else {
            if (response.data.code === 'err_0014') {
              this.$message({message: response.data.message, type: 'error', duration: 3000});
            } else {
              this.$message({
                message: this.$t('tips.tips14') + JSON.stringify(response.data),
                type: 'error',
                duration: 3000
              });
            }
          }
        }).catch((err) => {
          this.$message({message: this.$t('public.err1') + err, type: 'error', duration: 3000});
        });
      },

    }

  }
</script>

<style lang="less">
  .tokenSwap {
    .top {
      height: 5rem;
    }
    .info {
      .title {
        line-height: 2rem;
        height: 2rem;
        padding: 0;
        .el-button--mini {
          width: auto;
        }
      }
      .el-table td, .el-table th {
        padding: 0.4rem 0;
        .sell {
          span {
            color: #FF3300;
          }
        }
        .buy {
          span {
            color: #0ede94;
          }
        }
      }
    }

    .token-dialog {
      .fl {
        width: 21rem;
        border-right: 1px solid #A4AEC4;
        ul {
          li {
            height: 4rem;
            font-size: 12px;
            span {
              display: block;
            }
          }
        }
      }
      .fr {
        width: 25rem;
      }
      .tokenSwap-form {
        .el-form-item {
          .el-form-item__label {
            line-height: 1rem;
            height: 1rem;
          }
          .el-form-item__content {
            .el-input {
              .el-input__inner {
                height: 2rem;
                line-height: 2rem;
              }
            }
            .el-select {
              width: 100%;
              .el-input {
                width: 100%;
              }
            }
          }
        }
        .balance {
          display: block;
          position: absolute;
          right: 1.5rem;
          font-size: 12px;
        }
      }
    }
  }
</style>

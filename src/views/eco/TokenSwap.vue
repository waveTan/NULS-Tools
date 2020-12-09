<template>
  <div class="tokenSwap w1200">
    <div class="top"></div>
    <div class="info">
      <div class="fl">
        <div class="title">
          <span style="color: #0ede94 ">买入</span>
          <el-button @click="showDialog(0)" class="fr" type="success" size="mini" round>挂买单</el-button>
        </div>

        <el-table :data="buyData" stripe style="width: 580px">
          <el-table-column prop="address" label="广告方" min-width="160">
          </el-table-column>
          <el-table-column label="数量" width="130">
            <template slot-scope="scope">
              {{scope.row.number}}(<span class="click">{{scope.row.token}}</span>)
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" width="130">
          </el-table-column>
          <el-table-column label="操作" width="100" align="right">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" class="sell" type="text" size="small">出售</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">撤销</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="fr tl">
        <div class="title">
          <span class="fred">卖出</span>
          <el-button class="fr" type="danger" size="mini" round>挂卖单</el-button>
        </div>
        <el-table :data="sellData" stripe style="width: 580px">
          <el-table-column prop="address" label="广告方" min-width="160">
          </el-table-column>
          <el-table-column label="数量" width="130">
            <template slot-scope="scope">
              {{scope.row.number}}(<span class="click">{{scope.row.token}}</span>)
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" width="130">
          </el-table-column>
          <el-table-column label="操作" width="100" align="right">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" class="buy" type="text" size="small">买入</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">撤销</el-button>
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
  import nuls from 'nuls-sdk-js'
  import Password from '@/components/PasswordBar'
  import {chainInfo} from '@/config.js'
  import {
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
        tokenInfo: {},//token信息
        contractAddress: 'tNULSeBaNC4QkG1ZAA2GffDdFSDnatewu5PPkK',
        contractInfo: {},
        contractCallData: {},//调用合约信息

        buyData: [
          {address: 'dfsWd...34RWf(张三)', token: 'Goblin', tokenAdress: '', number: '100', amount: '500(NULS)'},
          {address: 'dfsWd...34RWf', token: 'Blackiron', tokenAdress: '', number: '10', amount: '50(NULS)'},
          {address: 'dfsWd...34RWf', token: 'tungsten', tokenAdress: '', number: '1000', amount: '1000(NULS)'},
          {address: 'dfsWd...34RWf', token: 'platinum', tokenAdress: '', number: '1220', amount: '100(NULS)'},
          {address: 'dfsWd...34RWf', token: 'obsidian', tokenAdress: '', number: '88', amount: '5(NULS)'},
        ],
        sellData: [
          {address: 'NULSd6...EtCara', token: 'platinum', tokenAdress: '', number: '22', amount: '100(NULS)'},
          {address: 'NULSd6...EtCara', token: 'obsidian', tokenAdress: '', number: '44', amount: '5(NULS)'},
          {address: 'NULSd6...EtCara', token: 'Goblin', tokenAdress: '', number: '888', amount: '500(NULS)'},
          {address: 'NULSd6...EtCara', token: 'Blackiron', tokenAdress: '', number: '666', amount: '50(NULS)'},
          {address: 'NULSd6...EtCara(wave)', token: 'tungsten', tokenAdress: '', number: '555', amount: '1000(NULS)'},
        ],
        buyOrSellDialog: true,//买、卖挂单弹框
        dialogTitle: '',//弹框标题
        isShowInfo: false,//是否显示弹框左侧信息
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
        }
      }
    },
    components: {
      Password,
    },
    created() {
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
        let resData = await this.contractInfoByAddress(this.contractAddress);
        if (resData.success) {
          this.contractInfo = resData.data;
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
       * @disc: 显示买卖弹框
       * @params: type （0：买单 1：卖单）
       * @params: info 买、卖单信息
       * @date: 2020-12-07 17:35
       * @author: Wave
       */
      showDialog(type, info = {}) {
        if (type === 0) {
          this.buyOrSellDialog = true;
          this.isShowInfo = false;
          this.dialogTitle = '挂买单'
        } else {
          console.log(info)
        }

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
        console.log(contractAddress);
        this.tokenInfo = this.addressInfo.tokens.filter(obj => obj.contractAddress === contractAddress)[0];
        console.log(this.tokenInfo.contractAddress);
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
        let validateTxRes = await validateTx(txhex);
        console.log(validateTxRes);

        //验证并广播交易
        /*await validateAndBroadcast(txhex).then((response) => {
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
        });*/
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

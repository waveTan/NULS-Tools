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
          <el-table-column prop="id" label="ID" width="60">
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
              <el-button @click="undoClick('buy',scope.row)" type="text" size="small" v-if="scope.row.isMyOrder">撤销
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
          <el-table-column prop="id" label="ID" width="60">
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
              <el-button @click="undoClick('sell',scope.row)" type="text" size="small" v-if="scope.row.isMyOrder">撤销
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>

    <div class="cb bottom">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的卖单" name="first">
          <el-table :data="mySellData">
            <el-table-column prop="address" label="地址" width="200">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="60" align="center">
            </el-table-column>
            <el-table-column label="数量" width="150" align="center">
              <template slot-scope="scope">
                {{scope.row.number}}(<span class="click" :title="'合约地址:'+scope.row.token">{{scope.row.symbol}}</span>)
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="金额(NULS)" width="150" align="center">
            </el-table-column>
            <el-table-column prop="txHashs" label="TXHash" width="220" align="center">
              <template slot-scope="scope">
                <span class="click">{{scope.row.txHashs}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="txTime" label="创建时间" width="160" align="center">
            </el-table-column>
            <el-table-column label="操作" min-width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                <el-button type="text" size="small">撤销</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="我的买单" name="second">我的挂单(买单)</el-tab-pane>
        <el-tab-pane label="历史记录" name="third">历史记录 （我的买单，我的卖单）</el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog class="token-dialog" width="50rem" @close="closeTokenDialog"
               :title="dialogTitle"
               :visible.sync="buyOrSellDialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
      <div class="fl" v-if="isShowInfo">
        <ul>
          <li>广告方:<span class="click">{{changeInfo.buyer ? changeInfo.buyer: changeInfo.seller}}</span></li>
          <li>数量:<span>{{changeInfo.number}}({{changeInfo.symbol}})</span></li>
          <li>金额:<span>{{changeInfo.amount}}(NULS)</span></li>
          <li>合约地址:<span class="click">{{changeInfo.token}}</span></li>
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
          <div class="balance" v-if="!isShowInfo">{{addressInfo.balance}} <span class="fCN">NULS</span></div>
          <el-form-item label="资产" prop="assets">
            <el-select v-model="tokenSwapForm.assets" filterable placeholder="请选择资产" @change="changeAssets"
                       v-if="addressInfo.tokens" :disabled="isShowInfo">
              <el-option v-for="item in addressInfo.tokens"
                         :key="item.contractAddress"
                         :label="item.tokenSymbol +'('+item.balances +')'"
                         :value="item.contractAddress">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="'数量('+tokenInfo.tokenSymbol+')'" prop="number">
            <el-input v-model="tokenSwapForm.number" autocomplete="off">
              <el-button slot="append" @click="changeAll">Max</el-button>
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
  import moment from 'moment'
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
        changeInfo: {},//操作信息
        type: 'buy',//类型（buy:买 sell:卖 selling:出售 buying:买入 ）
        tokenSwapForm: {
          fromAddress: '',
          assets: '',
          number: '100',
          amount: '1'
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

        activeName: 'first',
        mySellData: [],//我的卖单列表
        tokenSwapSetInterval: null,//定时器
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
      this.tokenSwapSetInterval = setInterval(() => {
        // this.addressInfo = accountList(1);
        this.getBuyOrdersList();
        this.getSaleOrdersList();
      }, 10000);
    },
    watch: {},
    beforeDestroy() {
      //离开界面清除定时器
      clearInterval(this.tokenSwapSetInterval);
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

        if (this.addressInfo.address) {
          this.tabData(this.activeName, this.addressInfo.address, 1);
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
              item.amount = divisionDecimals(item.remainAmount, item.tokenDecimals).toString();
              item.number = Times(item.rate, item.amount).toString();
              //item.amount =   parseFloat(tofix(Division(item.number, item.rate), 3, 1));
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
       * @disc: 关闭弹框
       * @params:
       * @date: 2020-12-17 16:06
       * @author: Wave
       */
      closeTokenDialog() {
        this.addressInfo = accountList(1);
      },

      /**
       * @disc: 出售
       * @params: info
       * @date: 2020-12-15 17:46
       * @author: Wave
       */
      sellClick(info) {
        console.log(info);
        this.changeInfo = info;
        this.buyOrSellDialog = true;
        this.isShowInfo = true;
        this.type = 'selling';
        this.dialogTitle = '出售给ID:' + info.id;

        let newAssetsInfo = this.addressInfo.tokens.filter(obj => obj.contractAddress === info.token)[0];
        if (newAssetsInfo.contractAddress) {
          this.tokenSwapForm.assets = newAssetsInfo.contractAddress;
          this.tokenInfo = newAssetsInfo;
        }
        this.tokenSwapForm.fromAddress = this.addressInfo.address.toString();

      },

      /**
       * @disc: 买入
       * @params: info
       * @date: 2020-12-15 17:46
       * @author: Wave
       */
      buyClick(info) {
        console.log(info);
        this.changeInfo = info;
        this.buyOrSellDialog = true;
        this.isShowInfo = true;
        this.type = 'buying';
        this.dialogTitle = '买入ID:' + info.id;

        let newAssetsInfo = this.addressInfo.tokens.filter(obj => obj.contractAddress === info.token)[0];
        if (newAssetsInfo.contractAddress) {
          this.tokenSwapForm.assets = newAssetsInfo.contractAddress;
          this.tokenInfo = newAssetsInfo;
        }
        this.tokenSwapForm.fromAddress = this.addressInfo.address.toString();
      },

      /**
       * @disc: 撤销
       * @params: type
       * @params: info
       * @date: 2020-12-15 17:48
       * @author: Wave
       */
      undoClick(type, info) {
        console.log(type, info);

        let infos = '您确定要撤销ID:' + info.id + '的订单';
        let newInfo = type === 'buy' ? '买' : '卖';
        let title = '撤销' + newInfo + '订单ID:' + info.id;
        this.$confirm(infos, title, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let name = type === 'buy' ? 'cancelBuyOrder' : 'cancelSaleOrder';
          //console.log(this.contractInfo);
          let methodsInfo = this.contractInfo.methods.filter(obj => obj.name === name);
          //console.log(this.tokenInfo);
          methodsInfo[0].params[0].value = info.token;
          methodsInfo[0].params[1].value = info.totalAmount;
          let newArgs = getArgs(methodsInfo[0].params);
          if (!newArgs.allParameter) {
            console.log('arges 错误：' + newArgs.allParameter);
            return;
          }
          let resData = await chainMethodCall(this.addressInfo.address, methodsInfo[0], this.contractAddress, 0, newArgs.args);
          //console.log(resData);
          if (!resData.success) {
            console.log('验证合约错误：' + resData.data);
            return;
          }
          this.contractCallData = resData.data;

          this.$refs.password.showPassword(true, this.addressInfo.address);
        }).catch(() => {

        });
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

        if (this.addressInfo.address) {
          this.addressInfo.tokens = this.addressList.filter(obj => obj.address === this.addressInfo.address)[0].tokens;
          if (this.addressInfo.tokens.length !== 0) {
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
          this.tokenInfo = this.addressInfo.tokens.filter(obj => obj.contractAddress === this.tokenSwapForm.assets)[0];
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
        if (this.type === 'selling') {
          this.tokenSwapForm.number = this.changeInfo.number
        } else {
          let newTokenData = this.addressInfo.tokens.filter(obj => obj.contractAddress === this.tokenSwapForm.assets);
          this.tokenSwapForm.number = newTokenData[0].balances
        }

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
            let name = '';
            if (this.type === 'buy') {
              name = 'buyOrder';
            } else if (this.type === 'sell') {
              name = 'saleOrder';
            } else if (this.type === 'selling') {
              name = 'takeBuyOrder';
            } else if (this.type === 'buying') {
              name = 'takeSaleOrder';
            }

            console.log(this.contractInfo);
            let methodsInfo = this.contractInfo.methods.filter(obj => obj.name === name);
            let value = 0;
            //console.log(this.tokenInfo);
            if (this.type === 'buy') {
              value = this.tokenSwapForm.amount;
              methodsInfo[0].params[0].value = this.tokenInfo.contractAddress;
              methodsInfo[0].params[1].value = Division(timesDecimals(this.tokenSwapForm.number, this.tokenInfo.decimals).toFixed(), this.tokenSwapForm.amount).toString();
            } else if (this.type === 'sell') {
              methodsInfo[0].params[0].value = this.tokenInfo.contractAddress;
              methodsInfo[0].params[1].value = timesDecimals(this.tokenSwapForm.number, this.tokenInfo.decimals).toString();
              methodsInfo[0].params[2].value = Number(Division(this.tokenSwapForm.number, this.tokenSwapForm.amount));
            } else if (this.type === 'selling') {
              methodsInfo[0].params[0].value = this.changeInfo.buyer;
              methodsInfo[0].params[1].value = this.changeInfo.token;
              methodsInfo[0].params[2].value = timesDecimals(this.tokenSwapForm.number, this.changeInfo.tokenDecimals).toString();
            } else if (this.type === 'buying') {
              console.log(this.changeInfo);
              methodsInfo[0].params[0].value = this.changeInfo.seller;
              methodsInfo[0].params[1].value = this.changeInfo.token;
              value = this.tokenSwapForm.amount;
            }
            let newArgs = getArgs(methodsInfo[0].params);
            console.log(newArgs);
            if (!newArgs.allParameter) {
              console.log('arges 错误：' + newArgs.allParameter);
              return;
            }
            let resData = await chainMethodCall(this.addressInfo.address, methodsInfo[0], this.contractAddress, value, newArgs.args);
            console.log(resData);
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

      /**
       * @disc: tab 切换
       * @params:
       * @date: 2020-12-18 11:27
       * @author: Wave
       */
      handleClick(tab) {
        this.activeName = tab.name;
      },

      /**
       * @disc: tab 数据加载
       * @params: tabName
       * @date: 2020-12-18 11:29
       * @author: Wave
       */
      tabData(tabName, address, pageIndex = 1) {
        if (tabName === 'first') {
          this.getMyBuyList(address, pageIndex)
        } else if (tabName === 'second') {
          this.getMySellList(address, pageIndex)
        } else if (tabName === 'third') {
          console.log('third');
          //this.getMyBuyList(address,pageIndex)
        }
      },

      /**
       * @disc: 获取我的买单
       * @params: address
       * @params: pageIndex
       * @date: 2020-12-15 15:04
       * @author: Wave
       */
      async getMyBuyList(address, pageIndex) {
        let url = this.urls + '/tokenex/buyOrdersByCreator/' + address + '/' + pageIndex;
        try {
          let resData = await axios.get(url);
          console.log(resData.data);
          if (resData.data.success) {
            for (let item of resData.data.data.list) {
              console.log(item);
              //item.symbol = this.allNRC20List.filter(obj => obj.contractAddress === item.token)[0].symbol;
              item.address = superLong(item.buyer, 6);
              item.txHashs = superLong(item.txHash, 8);
              item.txTime = moment(getLocalTime(item.txTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
            }
            this.mySellData = resData.data.data.list;
          } else {
            console.log('获取我的买单失败: ' + JSON.stringify(resData.data))
          }
        } catch (err) {
          console.log('获取我的买单异常: ' + JSON.stringify(err))
        }
      },

      /**
       * @disc: 获取我的卖单
       * @params: address
       * @params: pageIndex
       * @date: 2020-12-15 15:04
       * @author: Wave
       */
      async getMySellList(address, pageIndex) {
        let url = this.urls + '/tokenex/saleOrdersByCreator/' + address + '/' + pageIndex;
        try {
          let resData = await axios.get(url);
          console.log(resData.data);
          if (resData.data.success) {
            //this.contractAddress = resData.data.data;
          } else {
            console.log('获取我的买卖失败: ' + JSON.stringify(resData.data))
          }
        } catch (err) {
          console.log('获取我的买卖异常: ' + JSON.stringify(err))
        }
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
      height: 450px;
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

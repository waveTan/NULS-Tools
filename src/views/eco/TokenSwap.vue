<template>
  <div class="tokenSwap w1200">
    <div class="top">
      <div class="tc font18" style="line-height: 3rem">Push Market</div>
    </div>
    <div class="info">
      <div class="fl">
        <div class="title">
          <span style="color: #0ede94 ">{{$t('pm.pm0')}}Token</span>
          <Search :allData="allNRC20List" type="buy">
          </Search>
          <!--<el-button @click="toUrl('newAddress','',0)" v-if="!addressInfo.address" class="fr" type="success"
                     size="mini"
                     round>
            导入/创建账户
          </el-button>
          <el-button @click="showDialog(1)" v-else class="fr" type="success" size="mini" round>挂卖单</el-button>-->
          <el-button @click="showDialog(1)" v-if="addressInfo.address" class="fr" type="success" size="mini" round>{{$t('pm.pm2')}}</el-button>
        </div>
        <div class="scroll" style="width: 580px;height: 455px;overflow: auto">
          <el-table :data="buyData" style="height: 420px">
            <el-table-column prop="addresss" :label="$t('pm.pm3')" min-width="140">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="40" align="center">
            </el-table-column>
            <el-table-column :label="$t('pm.pm4')" width="110" align="center">
              <template slot-scope="scope">
                {{scope.row.number}}<span class="click" :title="$t('pm.pm5')+':'+scope.row.token">{{scope.row.symbol}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('pm.pm6')+'(NULS)'" width="110" align="center">
              <template slot-scope="scope">
                {{scope.row.price}}
              </template>
            </el-table-column>
            <el-table-column :label="$t('pm.pm7')+'(NULS)'" width="110" align="center">
              <template slot-scope="scope">
                {{scope.row.amount}}
              </template>
            </el-table-column>
            <el-table-column :label="$t('pm.pm8')" width="50" align="center">
              <template slot-scope="scope">
                <el-button @click="sellClick(scope.row)" v-if="addressInfo.address" class="sell"
                           type="text"
                           size="small">
                  {{$t('pm.pm9')}}
                </el-button>
                <!--<el-button @click="undoClick('buy',scope.row)" type="text" size="small" v-if="scope.row.isMyOrder">撤销
                </el-button>-->
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @current-change="buyCurrentChange"
            :current-page="buyPage"
            :page-size="10"
            :total="buyTotal"
            layout="total, prev, pager, next, jumper"
            v-show="buyTotal > 10">
          </el-pagination>
        </div>

      </div>

      <div class="fr tl">
        <div class="title">
          <span class="fred">{{$t('pm.pm10')}}Token</span>
          <Search :allData="allNRC20List" type="sell">
          </Search>
          <!--<el-button @click="toUrl('newAddress','',0)" v-if="!addressInfo.address" class="fr" type="danger"
                     size="mini"
                     round>
            导入/创建账户
          </el-button>
          <el-button @click="showDialog(0)" v-else class="fr" type="danger" size="mini" round>挂买单</el-button>-->
          <el-button @click="showDialog(0)" v-if="addressInfo.address" class="fr" type="danger" size="mini" round>{{$t('pm.pm11')}}</el-button>
        </div>
        <div class="scroll" style="width: 580px;height: 455px;overflow: auto">
          <el-table :data="sellData" stripe style="height: 420px">
            <el-table-column prop="addresss" :label="$t('pm.pm3')" min-width="140">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="40" align="center">
            </el-table-column>
            <el-table-column :label="$t('pm.pm4')" width="110" align="center">
              <template slot-scope="scope">
                {{scope.row.number}}<span class="click" :title="$t('pm.pm5')+':'+scope.row.token">{{scope.row.symbol}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('pm.pm6')+'(NULS)'" width="110" align="center">
              <template slot-scope="scope">
                {{scope.row.price}}
              </template>
            </el-table-column>
            <el-table-column :label="$t('pm.pm7')+'(NULS)'" width="110" align="center">
              <template slot-scope="scope">
                {{scope.row.amount}}
              </template>
            </el-table-column>
            <el-table-column :label="$t('pm.pm8')" width="50" align="center">
              <template slot-scope="scope">
                <el-button @click="buyClick(scope.row)" v-if="addressInfo.address" class="buy"
                           type="text" size="small">
                  {{$t('pm.pm12')}}
                </el-button>
                <!--<el-button @click="undoClick('sell',scope.row)" type="text" size="small" v-if="scope.row.isMyOrder">撤销
                </el-button>-->
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @current-change="sellCurrentChange"
            :current-page="sellPage"
            :page-size="10"
            :total="sellTotal"
            layout="total, prev, pager, next, jumper"
            v-show="sellTotal > 10">
          </el-pagination>
        </div>
      </div>

    </div>

    <div class="cb bottom" v-if="addressInfo.address">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('pm.pm13')" name="first">
          <el-table :data="mySellData" stripe>
            <el-table-column prop="address" :label="$t('pm.pm14')" width="200">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="60" align="center">
            </el-table-column>
            <el-table-column :label="$t('pm.pm4')" width="150" align="center">
              <template slot-scope="scope">
                {{scope.row.number}}
                <span @click="toUrl('contractsInfo',scope.row.token)" class="click"
                      :title="$t('pm.pm5')+':'+scope.row.token">{{scope.row.symbol}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="price" :label="$t('pm.pm6')+'(NULS)'" width="150" align="center">
            </el-table-column>
            <el-table-column :label="$t('pm.pm7')+'(NULS)'" width="150" align="center">
              <template slot-scope="scope">
                {{scope.row.amount}}
              </template>
            </el-table-column>
            <el-table-column prop="txHashs" label="TXHash" width="220" align="center">
              <template slot-scope="scope">
                <span class="click" @click="toUrl('transactionInfo',scope.row.txHash)">{{scope.row.txHashs}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="txTime" :label="$t('pm.pm17')" width="160" align="center">
            </el-table-column>
            <el-table-column :label="$t('pm.pm8')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="editInfo('editSell',scope.row)" size="small">{{$t('pm.pm18')}}
                </el-button>
                <el-button type="text" @click="undoClick('sell',scope.row)" size="small">{{$t('pm.pm19')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('pm.pm20')" name="second">
          <el-table :data="myBuyData" stripe>
            <el-table-column prop="address" :label="$t('pm.pm14')" width="200">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="60" align="center">
            </el-table-column>
            <el-table-column :label="$t('pm.pm4')" width="150" align="center">
              <template slot-scope="scope">
                {{scope.row.number}}
                <span class="click" @click="toUrl('contractsInfo',scope.row.token)"
                      :title="$t('pm.pm5')+':'+scope.row.token">{{scope.row.symbol}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('pm.pm16')" width="150" align="center">
              <template slot-scope="scope">
                {{scope.row.amount}} <span>{{scope.row.amountSymbol}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="txHashs" label="TXHash" width="220" align="center">
              <template slot-scope="scope">
                <span class="click" @click="toUrl('transactionInfo',scope.row.txHash)">{{scope.row.txHashs}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="txTime" :label="$t('pm.pm17')" width="160" align="center">
            </el-table-column>
            <el-table-column :label="$t('pm.pm8')" min-width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="editInfo('editBuy',scope.row)" type="text" size="small">{{$t('pm.pm18')}}
                </el-button>
                <el-button type="text" @click="undoClick('buy',scope.row)" size="small">{{$t('pm.pm19')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('pm.pm21')" name="third">
          <el-table :data="historyData" stripe>
            <el-table-column prop="id" label="ID" width="100" align="center">
            </el-table-column>
            <el-table-column prop="txHashs" label="TXHash" min-width="220" align="center">
              <template slot-scope="scope">
                <span class="click" @click="toUrl('transactionInfo',scope.row.txHash)">{{scope.row.txHashs}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('pm.pm4')" width="180" align="center">
              <template slot-scope="scope">
                {{scope.row.number}}
                <span class="click" @click="toUrl('contractsInfo',scope.row.token)"
                      :title="$t('pm.pm5')+':'+scope.row.token">{{scope.row.symbol}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="amount" :label="$t('pm.pm16')" width="180" align="center">
              <template slot-scope="scope">
                {{scope.row.amount}} <span>{{scope.row.amountSymbol}}</span>
              </template>
            </el-table-column>
            <el-table-column :label="$t('pm.pm29')" width="100" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.type ===1">{{$t('pm.pm30')}}</span>
                <span v-else-if="scope.row.type ===2">{{$t('pm.pm31')}}</span>
                <span v-else-if="scope.row.type ===3">{{$t('pm.pm32')}}</span>
                <span v-else-if="scope.row.type ===4">{{$t('pm.pm33')}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="txTime" :label="$t('pm.pm22')" width="200" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog class="token-dialog" width="50rem" @close="closeTokenDialog"
               :title="dialogTitle"
               :visible.sync="buyOrSellDialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false">
      <div class="fl" v-if="isShowInfo">
        <ul>
          <li>{{$t('pm.pm3')}}:<span class="click">{{changeInfo.buyer ? changeInfo.buyer: changeInfo.seller}}</span></li>
          <li>{{type==='selling' ? $t('pm.pm34'):$t('pm.pm35')}}{{$t('pm.pm15')}}:<span>{{changeInfo.number}}({{changeInfo.symbol}})</span>
          </li>
          <li>{{$t('pm.pm6')}}:<span>{{changeInfo.price}}(NULS)</span></li>
          <li>{{$t('pm.pm23')}}:<span>{{changeInfo.amount}}(NULS)</span></li>
          <li>{{$t('pm.pm5')}}:<span class="click">{{changeInfo.token}}</span></li>
        </ul>
      </div>
      <div :class="isShowInfo ? 'fr':''">
        <el-form :model="tokenSwapForm" status-icon :rules="tokenSwapRules" ref="tokenSwapForm"
                 class="tokenSwap-form">
          <el-form-item :label="$t('pm.pm14')+': '" prop="fromAddress">
            <el-input v-model="tokenSwapForm.fromAddress" autocomplete="off" disabled="true">
            </el-input>
          </el-form-item>
          <!--<div class="balance">{{addressInfo.balance}} <span class="fCN">NULS</span></div>-->
          <el-form-item :label="type.includes('sell') ? $t('pm.pm32')+'Token:':$t('pm.pm33')+'Token:'" prop="assets">
            <el-select v-model="tokenSwapForm.assets" filterable :placeholder="$t('pm.pm24')"
                       @change="changeAssets"
                       v-if="addressInfo.tokens"
                       :disabled="isShowInfo || type === 'editBuy' || type ==='editSell'">
              <el-option v-for="item in addressInfo.tokens"
                         :key="item.contractAddress"
                         :label="item.symbol +'('+item.balance +')'"
                         :value="item.contractAddress">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="type.includes('sell') ? $t('pm.pm25')+'('+tokenInfo.symbol+'):':$t('pm.pm26')+'('+tokenInfo.symbol+'):'"
            prop="number">
            <el-input v-model="tokenSwapForm.number" autocomplete="off" @input="changeNumber"
                      :disabled="type ==='editSell' || type ==='editBuy'">
              <el-button slot="append" @click="changeAll">Max</el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="price"
                        :label="$t('pm.pm6')+'( 1 '+tokenInfo.symbol+$t('pm.pm27')+tokenSwapForm.price+' NULS):' ">
            <el-input v-model="tokenSwapForm.price" autocomplete="off" @input="changeAmount"
                      :disabled="type ==='buying' || type ==='selling'">
            </el-input>
          </el-form-item>
          <div class="font14">{{$t('pm.pm28')}}{{type.includes('sell') ? '收入':'支出'}}{{$t('pm.pm16')}}:
            {{parseFloat((tokenSwapForm.number*tokenSwapForm.price).toFixed(6))}}
            <span class="fCN">NULS</span></div>
        </el-form>
      </div>
      <div class="cb"></div>
      <div slot="footer" class="dialog-footer tc">
        <el-button @click="resetForm('tokenSwapForm')">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="submitForm('tokenSwapForm')">{{$t('public.confirm')}}</el-button>
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
  import Search from '@/views/eco/Search'
  import {chainInfo, IS_RUN} from '@/config.js'
  import {
    Division,
    divisionDecimals,
    timesDecimals,
    superLong,
    getArgs,
    Times,
    Plus,
    tofix,
    getLocalTime,
    connectToExplorer
  } from '@/api/util'
  import {
    countFee,
    inputsOrOutputs,
    validateAndBroadcast,
    passwordVerification,
    getBalanceOrNonceByAddress,
    getAddressInfoByAddress
  } from '@/api/requestData'
  import {chainMethodCall, methodCall} from '@/api/contractCall'

  export default {
    name: "token-swap",
    data() {
      let checkFromAddress = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('pm.pm36')));
        } else {
          callback();
        }
      };
      let checkAssets = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('pm.pm37')));
        } else {
          callback();
        }
      };
      let checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('pm.pm38')));
        } else {

          if (this.type === 'selling' || this.type === 'buying') {
            if (Number(value) > Number(this.changeInfo.number)) {
              return callback(new Error(this.$t('pm.pm39')+':' + this.changeInfo.number));
            }
          }
          callback();
        }
      };
      let checkAmount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('pm.pm40')));
        } else {
          /*if (this.type === 'selling' || this.type === 'buying') {
            if (Number(value) > Number(this.changeInfo.amount)) {
              return callback(new Error('单价最大为:' + this.changeInfo.amount));
            }
          }*/
          callback();
        }
      };
      return {
        addressList: [],//地址列表
        addressInfo: {},//选择地址信息
        urls: 'https://nuls.ipbsc.cn',//连接地址
        tokenInfo: {},//token信息
        contractAddress: '',//token swap 合约地址
        allNRC20List: [],//所有NRC20合约
        contractInfo: {},
        contractCallData: {},//调用合约信息
        buyData: [],
        buyTotal: 0,
        buyPage: 1,
        sellData: [],
        sellTotal: 0,
        sellPage: 1,
        buyOrSellDialog: false,//买、卖挂单弹框
        dialogTitle: '',//弹框标题
        isShowInfo: false,//是否显示弹框左侧信息
        changeInfo: {},//操作信息
        type: 'buy',//类型（buy:买 sell:卖 selling:出售 buying:买入 ）
        tokenSwapForm: {
          fromAddress: '',
          assets: '',
          number: '',
          price: '',
          amount: ''
        },
        tokenSwapRules: {
          fromAddress: [
            {validator: checkFromAddress, trigger: 'blur'}
          ],
          assets: [
            {validator: checkAssets, trigger: 'blur'}
          ],
          number: [
            {validator: checkNumber, trigger: ['blur', 'change']}
          ],
          price: [
            {validator: checkAmount, trigger: ['blur', 'change']}
          ]
        },
        activeName: 'first',
        mySellData: [],//我的卖单列表
        myBuyData: [],//我的买单列表
        historyData: [],//历史记录
        pager: {
          total: 0,
          page: 1,
          rows: 10,
        },
        tokenSwapSetInterval: null,//定时器
        tokenSwapSetIntervalTwo: null,//定时器
        searchValue: '',//搜索内容
      }
    },
    components: {
      Password, Search
    },
    async created() {
      this.addressInfo.address = this.$store.state.accountInfo.address;
      this.urls = IS_RUN ? 'https://nuls.ipbsc.cn' : 'https://tokenex.mimieye.net';
    },
    mounted() {
      this.init();
      this.tokenSwapSetIntervalTwo = setInterval(async () => {
        this.addressInfo.address = this.$store.state.accountInfo.address;
      }, 1000);

      this.setInterval();
    },
    watch: {
      "addressInfo.address": async function (val, oldVal) {
        //console.log(val, oldVal);
        if (oldVal && val !== oldVal) {
          this.init();
          this.tabData(this.activeName);
        }
      },
    },
    beforeDestroy() {
      //离开界面清除定时器
      clearInterval(this.tokenSwapSetInterval);
      clearInterval(this.tokenSwapSetIntervalTwo);
    },
    methods: {

      //初始化
      async init() {
        let resData = await  getAddressInfoByAddress(this.addressInfo.address);
        //console.log(resData);
        if (resData.success) {
          this.addressInfo = resData.data
        }
        this.getAddressList(this.addressInfo);
        this.getContractAddress();
        this.allList();
        setTimeout(() => {
          this.getBuyOrdersList('', this.buyPage);
          this.getSaleOrdersList('', this.sellPage);
        }, 1000);
      },

      /**
       * @disc: 设置定时获取数据
       * @params:
       * @date: 2020-12-28 11:54
       * @author: Wave
       */
      setInterval(buyToken = '', sellToken = '', index = 1) {
        this.tokenSwapSetInterval = setInterval(() => {
          this.getBuyOrdersList(buyToken, index);
          this.getSaleOrdersList(sellToken, index);
        }, 10000);
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
            let newContracoInfo = await this.contractInfoByAddress(this.contractAddress);
            //console.log(resData.data);
            if (newContracoInfo.success) {
              this.contractInfo = newContracoInfo.data;
            }
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
          } else {
            if (this.addressInfo.address) {
              this.tabData(this.activeName);
            }
          }
        }
      },

      /**
       * 获取所有的NRC20合约
       **/
      async getAllNRC20(pageIndex = 1, pageSize = 100) {
        return await this.$post('/', 'getContractList', [pageIndex, pageSize, 1, false])
          .then((response) => {
            // console.log(response);
            if (response.hasOwnProperty("result")) {
              //this.contractInfo = response.result;
              for (let item of response.result.list) {
                item.value = item.symbol
              }
              return {success: true, data: response.result}
            } else {
              return {success: false, data: response}
            }
          })
          .catch((error) => {
            return {success: false, data: error}
          });
      },

      //查询是否授权
      async isAuthorization(tokenAddress, address, contractAddress) {
        let contractInfo = await this.contractInfoByAddress(tokenAddress);
        //console.log(contractInfo);
        if (!contractInfo.success) {
          //this.$message({message: "获取合约信息错误+", type: 'error', duration: 3000});
          return {success: false, data: '查询是否授权-获取合约信息错误'};
        }
        let name = 'allowance';
        let methodsInfo = contractInfo.data.methods.filter(obj => obj.name === name);
        methodsInfo[0].params[0].value = address;
        methodsInfo[0].params[1].value = contractAddress;
        let newArgs = getArgs(methodsInfo[0].params);
        if (!newArgs.allParameter) {
          return {success: false, data: '查询是否授权-arges错误'};
        }
        let resData = await methodCall(tokenAddress, name, methodsInfo[0].desc, newArgs.args);
        //console.log(resData);
        if (!resData.success) {
          return {success: false, data: '查询是否授权-调用allowance方法错误'};
        }
        return {success: true, data: divisionDecimals(resData.data.result, contractInfo.decimals).toString()};
      },

      /**
       * @disc: 授权金额
       * @params:
       * @date: 2020-12-22 16:33
       * @author: Wave
       */
      async authorizationInfoValue(tokenAddress) {
        let authorizationInfo = await this.isAuthorization(tokenAddress, this.addressInfo.address, this.contractAddress);
        //console.log(authorizationInfo);
        if (!authorizationInfo.success) {
          return {success: false, data: "获取授权信息错误-" + authorizationInfo.data};
        } else if (Number(authorizationInfo.data) <= 1000) {
          //console.log('授权金额为:' + authorizationInfo.data);
          this.authorization(tokenAddress, authorizationInfo.data);
          return {success: false, data: '授权金额为:' + authorizationInfo.data};
        }/* else if (Number(authorizationInfo.data) < 10000) {
          console.log('授权金额为:' + authorizationInfo.data);
        } */else {
          return {success: true, data: authorizationInfo.data};
        }
      },

      /**
       * @disc: 是否重新授权
       * @params: tokenAddress
       * @params: value
       * @date: 2020-12-22 16:31
       * @author: Wave
       */
      async authorization(tokenAddress, value) {
        this.$confirm(this.$t('pm.pm41')+ value + ')，'+this.$t('pm.pm42')+'?', this.$t('pm.pm43'), {
          confirmButtonText:this.$t('pm.pm44'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(async () => {
          this.tokenSwapForm.amount = '0';
          let contractInfo = await this.contractInfoByAddress(tokenAddress);
          //console.log(contractInfo);
          if (!contractInfo.success) {
            //this.$message({message: "获取合约信息错误+", type: 'error', duration: 3000});
            return {success: false, data: '查询授权-获取合约信息错误'};
          }
          this.type = 'approve';
          let name = 'approve';
          let methodsInfo = contractInfo.data.methods.filter(obj => obj.name === name);
          let value = 0;
          //console.log(this.tokenInfo);
          methodsInfo[0].params[0].value = this.contractAddress;
          let newValue = '100000000000';
          let len = newValue.length + Number(contractInfo.data.decimals);
          methodsInfo[0].params[1].value = newValue.padEnd(len, '0');
          let newArgs = getArgs(methodsInfo[0].params);
          //console.log(newArgs);
          if (!newArgs.allParameter) {
            console.log('arges 错误：' + newArgs.allParameter);
            return;
          }
          let resData = await chainMethodCall(this.addressInfo.address, methodsInfo[0], tokenAddress, value, newArgs.args);
          // console.log(resData);
          if (!resData.success) {
            console.log('验证合约错误：' + resData.data);
            return;
          }
          this.contractCallData = resData.data;
          this.buyOrSellDialog = false;
          this.contractData();
        }).catch((e) => {
          console.log(e)
        });
      },

      /**
       * @disc:获取买单列表
       * @params: token
       * @params: index
       * @date: 2020-12-15 15:04
       * @author: Wave
       */
      async getBuyOrdersList(token, index = '1') {
        let url = '';
        if (token) {
          url = this.urls + '/tokenex/buyOrders/' + token + '/' + index;
        } else {
          url = this.urls + '/tokenex/buyOrders/' + index;
        }
        clearInterval(this.tokenSwapSetInterval);
        this.setInterval(token, '', index);
        //console.log(url);
        try {
          let resData = await axios.get(url);
          //console.log(resData);
          if (resData.data.success) {
            //console.log(resData.data.data);
            for (let item of resData.data.data.list) {
              //let contractInfo = this.allNRC20List.filter(obj => obj.contractAddress === item.token);
              //console.log(contractInfo);
              item.symbol = this.allNRC20List.filter(obj => obj.contractAddress === item.token)[0].symbol;
              item.addresss = superLong(item.buyer, 6);
              item.amount = parseFloat(tofix(divisionDecimals(item.remainAmount, 8), 8, -1));
              item.number = Times(item.rate, item.amount).toString();
              item.price = parseFloat(tofix(Division(1, item.rate), 6, -1));
              //item.amount =   parseFloat(tofix(Division(item.number, item.rate), 3, 1));
              if (item.buyer === this.addressInfo.address) {
                item.isMyOrder = true;
              } else {
                item.isMyOrder = false;
              }
            }
            this.buyData = resData.data.data.list;
            this.buyTotal = resData.data.data.total;
          } else {
            console.log('获取买单列表失败: ' + JSON.stringify(resData.data))
          }
        } catch (err) {
          console.log('获取买单列表异常: ' + JSON.stringify(err))
        }
      },

      /**
       * @disc: 获取买单列表 分页
       * @params: val
       * @date: 2021-01-08 16:17
       * @author: Wave
       */
      buyCurrentChange(val) {
        //console.log(val);
        this.buyPage = Number(val);
        this.getBuyOrdersList('', this.buyPage);
      },

      /**
       * @disc:获取卖单列表
       * @params: token
       * @params: index
       * @date: 2020-12-15 15:04
       * @author: Wave
       */
      async getSaleOrdersList(token, index = '1') {
        let url = '';
        if (token) {
          url = this.urls + '/tokenex/saleOrders/' + token + '/' + index;
        } else {
          url = this.urls + '/tokenex/saleOrders/' + index;
        }
        clearInterval(this.tokenSwapSetInterval);
        this.setInterval('', token, index);
        try {
          let resData = await axios.get(url);
          //console.log(resData);
          if (resData.data.success) {
            //console.log(resData.data.data);
            for (let item of resData.data.data.list) {
              item.symbol = this.allNRC20List.filter(obj => obj.contractAddress === item.token)[0].symbol;
              item.addresss = superLong(item.seller, 6);
              item.number = divisionDecimals(item.remainAmount, item.tokenDecimals);
              item.price = parseFloat(tofix(Division(1, item.rate), 6, -1));
              //item.amount = parseFloat(tofix(Division(item.number, item.rate), 8, -1));
              item.amount = Times(item.number, item.price).toString();
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
       * @disc: 获取卖单列表 分页
       * @params: val
       * @date: 2021-01-08 16:17
       * @author: Wave
       */
      sellCurrentChange(val) {
        //console.log(val);
        this.sellPage = Number(val);
        this.getSaleOrdersList('', this.sellPage);
      },

      /**
       * @disc: 显示买卖弹框
       * @params: type （0：买单 1：卖单）
       * @date: 2020-12-07 17:35
       * @author: Wave
       */
      showDialog(type) {
        if (type === 0) {
          //console.log(this.allNRC20List);
          this.addressInfo.tokens = this.allNRC20List;
          this.dialogTitle = this.$t('pm.pm11');
          this.type = 'buy';
        } else {
          //console.log(this.addressInfo, this.addressList);
          if (this.addressInfo.address) {
            this.addressInfo.tokens = this.addressList.filter(obj => obj.address === this.addressInfo.address);
            //console.log(this.addressInfo.tokens);
            if (this.addressInfo.tokens.length !== 0) {
              this.tokenSwapForm.assets = this.addressInfo.tokens[0].contractAddress;
              this.tokenInfo = this.addressInfo.tokens[0];
              //console.log(this.tokenInfo)
            }
            this.tokenSwapForm.fromAddress = this.addressInfo.address.toString();
          }

          //this.addressInfo.tokens = this.allNRC20List;
          if (this.addressInfo.tokens.length === 0 || !this.addressInfo.tokens) {
            this.$message({message: this.$t('pm.pm45'), type: 'error', duration: 3000});
            return
          }
          this.tokenSwapForm.assets = this.addressInfo.tokens[0].contractAddress;
          this.dialogTitle = this.$t('pm.pm2');
          this.type = 'sell';
        }
        this.tokenSwapForm.number = '';
        this.tokenSwapForm.price = '';
        this.buyOrSellDialog = true;
        this.isShowInfo = false;
      },

      /**
       * @disc: 关闭弹框
       * @params:
       * @date: 2020-12-17 16:06
       * @author: Wave
       */
      closeTokenDialog() {
        this.$refs['tokenSwapForm'].resetFields();
        this.tokenSwapForm.number = '';
        this.tokenSwapForm.amount = '';
        this.addressInfo.tokens = [];
        this.getAddressList(this.addressInfo);
      },

      /**
       * @disc: 出售
       * @params: info
       * @date: 2020-12-15 17:46
       * @author: Wave
       */
      async sellClick(info) {
        //console.log(info);
        let newAssetsInfo = this.addressInfo.tokens.filter(obj => obj.contractAddress === info.token);
        if (newAssetsInfo.length === 0) {
          this.$message({message: this.$t('pm.pm46') + info.symbol + this.$t('locking.locking2'), type: 'error', duration: 3000});
          return;
        }

        let resData = await this.authorizationInfoValue(info.token);
        if (!resData.success) {
          return;
        }
        this.changeInfo = info;
        this.buyOrSellDialog = true;
        this.isShowInfo = true;
        this.type = 'selling';
        this.dialogTitle = this.$t('pm.pm47')+'ID:' + info.id;

        this.tokenSwapForm.assets = newAssetsInfo[0].contractAddress;
        this.tokenInfo = newAssetsInfo[0];
        this.tokenSwapForm.fromAddress = this.addressInfo.address.toString();
        this.tokenSwapForm.number = info.number;
        this.tokenSwapForm.price = info.price;

      },

      /**
       * @disc: 买入
       * @params: info
       * @date: 2020-12-15 17:46
       * @author: Wave
       */
      buyClick(info) {
        //console.log(info);
        this.changeInfo = info;
        this.buyOrSellDialog = true;
        this.isShowInfo = true;
        this.type = 'buying';
        this.dialogTitle = this.$t('pm.pm12')+'ID:' + info.id;
        this.addressInfo.tokens = this.allNRC20List;
        let newAssetsInfo = this.addressInfo.tokens.filter(obj => obj.contractAddress === info.token)[0];
        //console.log(newAssetsInfo);
        if (newAssetsInfo.contractAddress) {
          this.tokenSwapForm.assets = newAssetsInfo.contractAddress;
          this.tokenInfo = newAssetsInfo;
        }
        this.tokenSwapForm.fromAddress = this.addressInfo.address.toString();
        this.tokenSwapForm.number = info.number;
        this.tokenSwapForm.price = info.price;
      },

      /**
       * @disc: 修改 挂单信息
       * @params: type 类型
       * @params: info 编辑的信息
       * @date: 2020-12-22 10:13
       * @author: Wave
       */
      editInfo(type, info) {
        //console.log(type, info);
        this.tokenSwapForm.number = info.number;
        this.tokenSwapForm.price = info.price;
        let newAssetsInfo = this.allNRC20List.filter(obj => obj.contractAddress === info.token);
        this.tokenSwapForm.assets = newAssetsInfo[0].contractAddress;
        this.tokenInfo = newAssetsInfo[0];
        //console.log(this.tokenInfo);
        this.tokenSwapForm.fromAddress = this.addressInfo.address.toString();

        this.buyOrSellDialog = true;
        this.isShowInfo = false;
        if (type === 'editBuy') {
          this.dialogTitle = this.$t('pm.pm48')+'ID:' + info.id;
          this.type = 'editBuy';
        } else {
          this.dialogTitle = this.$t('pm.pm49')+'ID:' + info.id;
          this.type = 'editSell';
        }

      },

      /**
       * @disc: 撤销
       * @params: type
       * @params: info
       * @date: 2020-12-15 17:48
       * @author: Wave
       */
      undoClick(type, info) {
        //console.log(type, info);
        let infos = this.$t('pm.pm50')+'ID:' + info.id + this.$t('pm.pm51');
        let newInfo = type === 'buy' ? this.$t('pm.pm52') : this.$t('pm.pm53');
        let title = this.$t('pm.pm19') + newInfo + this.$t('pm.pm54')+'ID:' + info.id;
        this.$confirm(infos, title, {
          confirmButtonText: this.$t('public.confirm'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(async () => {
          let name = type === 'buy' ? 'cancelBuyOrder' : 'cancelSaleOrder';
          //console.log(name);
          //console.log(this.contractInfo);
          let methodsInfo = this.contractInfo.methods.filter(obj => obj.name === name);
          //console.log(this.tokenInfo);
          methodsInfo[0].params[0].value = info.token;
          methodsInfo[0].params[1].value = info.remainAmount;
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
          this.contractData();
        }).catch((e) => {
          console.log(e)
        });
      },

      /**
       * 获取账户列表
       */
      async getAddressList(addressInfo) {
        // console.log(addressInfo.address);
        let resData = await this.getAddressInfo(addressInfo.address);
        //console.log(resData);
        if (resData.success) {
          addressInfo.balance = parseFloat(tofix(divisionDecimals(resData.data.balance), 4, -1));
          let tokenList = await this.getTokenListByAddress(addressInfo.address);
          //console.log(tokenList);
          addressInfo.tokens = tokenList.data.list;
          // console.log(addressInfo.tokens);
          for (let k of addressInfo.tokens) {
            //console.log(k);
            k.balance = parseFloat(tofix(divisionDecimals(k.balance, k.decimals), k.decimals, -1));
            k.symbol = k.tokenSymbol;
          }
        }
        this.addressList = addressInfo.tokens;
        if (this.addressInfo.address) {
          this.addressInfo.tokens = this.addressList.filter(obj => obj.address === this.addressInfo.address);
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
      async getAddressInfo(address) {
        //console.log(address);
        return await this.$post('/', 'getAccount', [address])
          .then((response) => {
            // console.log(response);
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
        //console.log(this.type);
        if (this.type === 'selling') {
          this.tokenSwapForm.number = this.changeInfo.number;
          this.changeNumber();
        } else if (this.type === 'buying') {
          this.tokenSwapForm.number = this.changeInfo.number;
          this.changeNumber();
        } else {
          let newTokenData = this.addressInfo.tokens.filter(obj => obj.contractAddress === this.tokenSwapForm.assets);
          this.tokenSwapForm.number = newTokenData[0].balances
        }
      },

      //token数量发生变化
      changeNumber() {
        //console.log(this.changeInfo, this.type);
        if (this.type === 'selling' || this.type === 'buying') {
          this.tokenSwapForm.amount = Division(Number(this.tokenSwapForm.number), Number(this.changeInfo.rate)).toString();
        }
      },

      //NULS 金额发生变化
      changeAmount() {
        //console.log(this.changeInfo, this.type);
        if (this.type === 'selling' || this.type === 'buying') {
          this.tokenSwapForm.number = Times(Number(this.tokenSwapForm.amount), Number(this.changeInfo.rate)).toString();
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
        this.tokenInfo.contractAddress = '';
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
            //console.log(this.type);
            this.tokenSwapForm.amount = Times(this.tokenSwapForm.number, this.tokenSwapForm.price).toString();
            /*console.log(this.addressList);
            console.log(this.addressInfo);
            let newAddressInfo = this.addressList.filter(obj => obj.address === this.addressInfo.address);*/
            //let newBalance = Minus(newAddressInfo[0].balance, this.tokenSwapForm.amount);
            //console.log(newBalance);
            if (Number(this.addressInfo.balance.toFixed(3)) < 0.1) {
              this.$message({message: this.$t('pm.pm55'), type: 'error', duration: 3000});
              return;
            }

            let name = '';
            //console.log(this.type);
            if (this.type === 'buy') {
              this.tokenSwapForm.amount = Times(this.tokenSwapForm.number, this.tokenSwapForm.price).toString();
              name = 'buyOrder';
            } else if (this.type === 'sell') {
              this.tokenSwapForm.amount = Times(this.tokenSwapForm.number, this.tokenSwapForm.price).toString();
              name = 'saleOrder';
              let resData = await this.authorizationInfoValue(this.tokenInfo.contractAddress);
              //console.log(resData);
              if (!resData.success) {
                return;
              }
            } else if (this.type === 'selling') {
              name = 'takeBuyOrder';
            } else if (this.type === 'buying') {
              name = 'takeSaleOrder';
            } else if (this.type === 'editBuy') {
              this.tokenSwapForm.amount = Times(this.tokenSwapForm.number, this.tokenSwapForm.price).toString();
              name = 'setRateOfBuyOrder';
            } else if (this.type === 'editSell') {
              this.tokenSwapForm.amount = Times(this.tokenSwapForm.number, this.tokenSwapForm.price).toString();
              name = 'setRateOfSaleOrder';
            }

            //console.log(this.contractInfo);
            let methodsInfo = this.contractInfo.methods.filter(obj => obj.name === name);
            let value = 0;

            if (this.type === 'buy') {
              value = this.tokenSwapForm.amount;
              methodsInfo[0].params[0].value = this.tokenInfo.contractAddress;
              /*let newNumber = timesDecimals(this.tokenSwapForm.number, this.tokenInfo.decimals).toString();
              let newAmount = timesDecimals(this.tokenSwapForm.amount, 8).toString();*/
              //console.log(this.tokenSwapForm.number, this.tokenSwapForm.amount);
              methodsInfo[0].params[1].value = Division(this.tokenSwapForm.number, this.tokenSwapForm.amount).toString();
              //methodsInfo[0].params[1].value = timesDecimals(this.tokenSwapForm.amount, 8).toString();
            } else if (this.type === 'sell') {
              methodsInfo[0].params[0].value = this.tokenInfo.contractAddress;
              methodsInfo[0].params[1].value = timesDecimals(this.tokenSwapForm.number, this.tokenInfo.decimals).toString();
              methodsInfo[0].params[2].value = Number(Division(this.tokenSwapForm.number, this.tokenSwapForm.amount));
            } else if (this.type === 'selling') {
              methodsInfo[0].params[0].value = this.changeInfo.buyer;
              methodsInfo[0].params[1].value = this.changeInfo.token;
              methodsInfo[0].params[2].value = timesDecimals(this.tokenSwapForm.number, this.changeInfo.tokenDecimals).toString();
            } else if (this.type === 'buying') {
              methodsInfo[0].params[0].value = this.changeInfo.seller;
              methodsInfo[0].params[1].value = this.changeInfo.token;
              value = Times(this.tokenSwapForm.number, this.tokenSwapForm.price).toString();
            } else if (this.type === 'editBuy') {
              methodsInfo[0].params[0].value = this.tokenInfo.contractAddress;
              let newNumber = timesDecimals(this.tokenSwapForm.number, this.tokenInfo.decimals).toString();
              let newAmount = timesDecimals(this.tokenSwapForm.amount, 8).toString();
              methodsInfo[0].params[1].value = Division(newNumber, newAmount).toString();
            } else if (this.type === 'editSell') {
              methodsInfo[0].params[0].value = this.tokenInfo.contractAddress;
              let newNumber = timesDecimals(this.tokenSwapForm.number, this.tokenInfo.decimals).toString();
              let newAmount = timesDecimals(this.tokenSwapForm.amount, 8).toString();
              methodsInfo[0].params[1].value = Division(newNumber, newAmount).toString();
            }
            //console.log(methodsInfo);
            let newArgs = getArgs(methodsInfo[0].params);
            //console.log(newArgs);
            if (!newArgs.allParameter) {
              console.log('arges 错误：' + newArgs.allParameter);
              return;
            }
            let resData = await chainMethodCall(this.addressInfo.address, methodsInfo[0], this.contractAddress, value, newArgs.args);
            //console.log(resData);
            if (!resData.success) {
              console.log('验证合约错误：' + resData.data);
              if (resData.data === 'contract error - No enough amount for authorization') {
                this.authorization(this.tokenInfo.contractAddress, '');
              }
              return;
            }
            this.contractCallData = resData.data;
            //console.log(this.type);
            if (this.type === 'buy' || this.type === 'buying') {
              this.contractCallData.value = divisionDecimals(this.contractCallData.value, 8).toString()
            }
            this.contractData()
            //this.$refs.password.showPassword(true, this.addressInfo.address);
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

        //console.log(this.contractCallData);
        let amount = Number(Times(this.contractCallData.gasLimit, this.contractCallData.price));
        //console.log(amount);
        let transferInfo = {
          fromAddress: this.contractCallData.sender,
          toAddress: '',
          assetsChainId: chainInfo.chainId,
          assetsId: 1,
          amount: amount,
          fee: 100000,
          value: 0
        };
        if (this.contractCallData.methodName === 'buyOrder') {
          transferInfo.toAddress = this.contractAddress;
          transferInfo.value = timesDecimals(this.tokenSwapForm.amount).toString()
        } else if (this.contractCallData.methodName === 'takeSaleOrder') {
          transferInfo.toAddress = this.contractAddress;
          transferInfo.value = this.contractCallData.value
        }

        amount = Number(Plus(transferInfo.fee, amount));
        let remark = '';
        //console.log(transferInfo);
        //console.log(this.balanceInfo);
        let resData = await getBalanceOrNonceByAddress(this.addressInfo.address, chainInfo.chainId, 1);
        //console.log(resData);
        if (!resData.success) {
          console.log('获取账户nonce错误:' + resData.data);
          return
        }
        let inOrOutputs = await inputsOrOutputs(transferInfo, resData, 16);
        //console.log(inOrOutputs);
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
            this.buyOrSellDialog = false;
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
       *  nabox 调用合约
       **/
      async contractData() {
        //console.log(this.contractCallData);
        const data = {
          from: this.contractCallData.sender,
          value: this.contractCallData.value,
          contractAddress: this.contractCallData.contractAddress,
          methodName: this.contractCallData.methodName,
          methodDesc: this.contractCallData.methodDesc,
          args: this.contractCallData.args,
          multyAssetValues: []
        };
        //console.log(data);
        const resData = await window.nabox.contractCall(data); // 返回交易hash
        //console.log(resData);
        if (resData) {
          this.$message({message: this.$t('tips.tips15'), type: 'success', duration: 1000});
          this.buyOrSellDialog = false;
        }

      },

      /**
       * @disc: tab 切换
       * @params:
       * @date: 2020-12-18 11:27
       * @author: Wave
       */
      handleClick(tab) {
        this.activeName = tab.name;
        this.tabData(this.activeName);
      },

      /**
       * @disc: tab 数据加载
       * @params: tabName
       * @date: 2020-12-18 11:29
       * @author: Wave
       */
      tabData(tabName) {
        //console.log(tabName);
        if (tabName === 'first') {
          this.getMySellList(this.addressInfo.address, this.pager.page)
        } else if (tabName === 'second') {
          this.getMyBuyList(this.addressInfo.address, this.pager.page)
        } else if (tabName === 'third') {
          this.historyData = [];
          this.getMySellOrder(this.addressInfo.address, this.pager.page)
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
        //console.log(url);
        try {
          let resData = await axios.get(url);
          //console.log(resData.data);
          if (resData.data.success) {
            for (let item of resData.data.data.list) {
              //console.log(item);
              item.address = superLong(item.seller, 6);
              item.txHashs = superLong(item.txHash, 8);
              item.txTime = moment(getLocalTime(item.txTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              item.number = parseFloat(divisionDecimals(item.remainAmount, item.tokenDecimals).toString());
              item.symbol = this.allNRC20List.filter(obj => obj.contractAddress === item.token)[0].symbol;
              item.amountSymbol = 'NULS';
              item.price = parseFloat(tofix(Division(1, item.rate), 6, -1));
              item.amount = parseFloat(Division(item.number, item.rate).toString());
            }
            this.mySellData = resData.data.data.list.filter(obj => Number(obj.amount) > 0);
          } else {
            console.log('获取我的卖单失败: ' + JSON.stringify(resData.data))
          }
        } catch (err) {
          console.log('获取我的卖单异常: ' + JSON.stringify(err))
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
        //console.log(url);
        try {
          let resData = await axios.get(url);
          //console.log(resData.data);
          if (resData.data.success) {
            for (let item of resData.data.data.list) {
              //console.log(item);
              //item.symbol = this.allNRC20List.filter(obj => obj.contractAddress === item.token)[0].symbol;
              item.address = superLong(item.buyer, 6);
              item.txHashs = superLong(item.txHash, 8);
              item.txTime = moment(getLocalTime(item.txTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              item.symbol = this.allNRC20List.filter(obj => obj.contractAddress === item.token)[0].symbol;
              item.amountSymbol = 'NULS';
              item.amount = divisionDecimals(item.remainAmount, 8).toString();
              item.price = parseFloat(tofix(Division(1, item.rate), 6, -1));
              item.number = Times(item.rate, item.amount).toString();
            }
            this.myBuyData = resData.data.data.list.filter(obj => Number(obj.amount) > 0);
          } else {
            console.log('获取我的买单失败: ' + JSON.stringify(resData.data))
          }
        } catch (err) {
          console.log('获取我的买单异常: ' + JSON.stringify(err))
        }
      },

      /**
       * @disc: 用户吃单记录-卖单
       * @params:
       * @date: 2020-12-21 16:28
       * @author: Wave
       */
      async getMySellOrder(address, pageIndex) {
        let url = this.urls + '/tokenex/takeSaleOrders/' + address + '/' + pageIndex;
        //console.log(url);
        try {
          let resData = await axios.get(url);
          //console.log(resData.data);
          if (resData.data.success) {
            for (let item of resData.data.data.list) {
              item.txHashs = superLong(item.txHash, 10);
              item.txTime = moment(getLocalTime(item.txTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              let contractInfo = this.allNRC20List.filter(obj => obj.contractAddress === item.token)[0];
              item.number = parseFloat(divisionDecimals(item.buyAmountOfToken, contractInfo.decimals).toString());
              item.symbol = contractInfo.symbol;
              item.amountSymbol = 'NULS';
              item.amount = parseFloat(divisionDecimals(item.payAmountOfNuls, 8).toString());
              item.type = 1;
            }
            this.historyData = [...this.historyData, ...resData.data.data.list];
            this.getMyBuyOrder(address, pageIndex);
          } else {
            console.log('获取用户吃单记录-卖单失败: ' + JSON.stringify(resData.data))
          }
        } catch (err) {
          console.log('获取用户吃单记录-卖单异常: ' + JSON.stringify(err))
        }
      },

      /**
       * @disc: 用户吃单记录-买单
       * @params:
       * @date: 2020-12-21 16:28
       * @author: Wave
       */
      async getMyBuyOrder(address, pageIndex) {
        let url = this.urls + '/tokenex/takeBuyOrders/' + address + '/' + pageIndex;
        //console.log(url);
        try {
          let resData = await axios.get(url);
          //console.log(resData.data);
          if (resData.data.success) {
            for (let item of resData.data.data.list) {
              item.txHashs = superLong(item.txHash, 10);
              item.txTime = moment(getLocalTime(item.txTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              let contractInfo = this.allNRC20List.filter(obj => obj.contractAddress === item.token)[0];
              item.number = parseFloat(divisionDecimals(item.payAmountOfToken, contractInfo.decimals).toString());
              item.symbol = contractInfo.symbol;
              item.amountSymbol = 'NULS';
              item.amount = parseFloat(divisionDecimals(item.buyAmountOfNuls, 8).toString());
              item.type = 2;
            }
            //this.myBuyData = resData.data.data.list;
            this.historyData = [...this.historyData, ...resData.data.data.list];
            this.getMyOrderSell(address, pageIndex);
          } else {
            console.log('获取用户吃单记录-买单失败: ' + JSON.stringify(resData.data))
          }
        } catch (err) {
          console.log('获取用户吃单记录-买单异常: ' + JSON.stringify(err))
        }
      },

      /**
       * @disc: 用户创建的卖单的被吃记录
       * @params:
       * @date: 2020-12-21 16:28
       * @author: Wave
       */
      async getMyOrderSell(address, pageIndex) {
        let url = this.urls + '/tokenex/takeSaleOrdersByCreator/' + address + '/' + pageIndex;
        //console.log(url);
        try {
          let resData = await axios.get(url);
          //console.log(resData.data);
          if (resData.data.success) {
            for (let item of resData.data.data.list) {
              item.txHashs = superLong(item.txHash, 10);
              item.txTime = moment(getLocalTime(item.txTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              let contractInfo = this.allNRC20List.filter(obj => obj.contractAddress === item.token)[0];
              item.number = parseFloat(divisionDecimals(item.buyAmountOfToken, contractInfo.decimals).toString());
              item.symbol = contractInfo.symbol;
              item.amountSymbol = 'NULS';
              item.amount = parseFloat(divisionDecimals(item.payAmountOfNuls, 8).toString());
              item.type = 3;
            }
            this.historyData = [...this.historyData, ...resData.data.data.list];
            this.getMyOrderBuy(address, pageIndex);
          } else {
            console.log('获取用户创建的卖单的被吃记录失败: ' + JSON.stringify(resData.data))
          }
        } catch (err) {
          console.log('获取用户创建的卖单的被吃记录异常: ' + JSON.stringify(err))
        }
      },

      /**
       * @disc: 用户创建的买单的被吃记录
       * @params:
       * @date: 2020-12-21 16:28
       * @author: Wave
       */
      async getMyOrderBuy(address, pageIndex) {
        let url = this.urls + '/tokenex/takeBuyOrdersByCreator/' + address + '/' + pageIndex;
        //console.log(url);
        try {
          let resData = await axios.get(url);
          //console.log(resData.data);
          if (resData.data.success) {
            for (let item of resData.data.data.list) {
              item.txHashs = superLong(item.txHash, 10);
              item.txTime = moment(getLocalTime(item.txTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              let contractInfo = this.allNRC20List.filter(obj => obj.contractAddress === item.token)[0];
              item.number = parseFloat(divisionDecimals(item.payAmountOfToken, contractInfo.decimals).toString());
              item.symbol = contractInfo.symbol;
              item.amountSymbol = 'NULS';
              item.amount = parseFloat(divisionDecimals(item.buyAmountOfNuls, 8).toString());
              item.type = 4;
            }
            this.historyData = [...this.historyData, ...resData.data.data.list];
            //console.log(this.historyData);
          } else {
            console.log('获取用户创建的买单的被吃记录失败: ' + JSON.stringify(resData.data))
          }
        } catch (err) {
          console.log('获取用户创建的买单的被吃记录异常: ' + JSON.stringify(err))
        }
      },

      /**
       * 连接跳转
       * @param urlName
       * @param parameter
       * @param type  0:路由跳转 1：外部链接
       */
      toUrl(urlName, parameter, type) {
        if (type === 0) {
          this.$router.push({
            name: urlName
          })
        } else {
          let url = connectToExplorer(urlName, parameter);
          //window.open(urlName)
          window.open(url)
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
        span {
          display: block;
          float: left;
        }

        .el-button--mini {
          width: auto;
        }
      }
      .el-table td, .el-table th {
        padding: 0.2rem 0;
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
    .bottom {
      .el-tabs {
        .el-tabs__content {
          .el-table {
            margin-bottom: 5rem;
            tr {
              th {
                padding: 3px 0;
              }
              td {
                padding: 0 0;
              }
            }
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
                .el-input__icon {
                  line-height: 2rem;
                }
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
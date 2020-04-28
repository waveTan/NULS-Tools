<template>
  <div class="guess_number w1200">
    <div class="top">
      <div class="fl guess" v-loading="loading"
           :element-loading-text=loadingText
           element-loading-spinner="el-icon-loading"
           element-loading-background="rgba(0, 0, 0, 0.8)">
        <h2>NULS 第{{gameCurrentInfo.id}}轮猜数字</h2>
        <div class="explain">
          <p>1、用户选择0-9中的一个数字参与，每轮中奖的用户平分奖池所有（没有中奖奖池累计下一次）</p>
          <p>2、参与游戏将消耗 <span class="fred fW600">2.011</span> NULS</p>
          <p>3、游戏每<span class="fred"> 20 </span>块开奖一次，中间间隔<span class="fred"> 10 </span>块</p>
          <p>4、此随机数是基于<span class="fred">NULS随机数</span>开发的绝对公平</p>
        </div>
        <div class="number">
          <el-button circle v-for="item in valueList" :key="item.value" @click="clickNumber(item.value)"
                     :class="item.value ===numberValue ? 'is_number':''">
            {{item.label}}
          </el-button>
        </div>
        <div class="submit tc">
          <el-button type="success" @click="guessStart">{{this.numberValue ==='' ? '请点击数字':'您猜本轮开'}}
            {{this.numberValue}}
          </el-button>
        </div>
        <div class="jackpot font14">
          奖池
          <span class="font12">({{jackpotInfo.address}})</span>:&nbsp;
          <font class="fCN fW600">{{jackpotInfo.balance}}</font> NULS
        </div>
        <!--<div class="font14">本轮截止时间: <span class="fred fW600">52.25</span> 秒</div>-->
        <div class="font14">
          <div class="fl">本轮截止高度: <span class="fred fW600">{{gameCurrentInfo.endHeight}}</span></div>
          <div class="fl">&nbsp;&nbsp;本轮开奖高度: <span class="fred">{{gameCurrentInfo.endHeight + gameCurrentInfo.gameLotteryDelay}}</span>
          </div>
        </div>
      </div>
      <div class="fr party">
        <h3>当前参与</h3>
        <el-table :data="gameDetailInfo.participants" style="width: 100%">
          <el-table-column label="地址" align="center" width="120">
            <template slot-scope="scope">
              <span class="click" @click="toUrl('address',scope.row.address,1)">{{scope.row.addresss}}</span>
            </template>
          </el-table-column>
          <el-table-column label="txHash" align="center" min-width="80">
            <template slot-scope="scope">
              <span class="click" @click="toUrl('hash',scope.row.txHash,1)">{{scope.row.txHashs}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="txTime" label="时间" align="center" width="160">
          </el-table-column>
          <el-table-column prop="number" label="猜数" align="center" width="70">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer cb">
      <el-tabs v-model="activeHistory" @tab-click="handleClick">
        <el-tab-pane label="中奖历史" name="first">
          <el-table :data="participantData" stripe style="width: 100%" border>
            <el-table-column prop="gameId" label="游戏轮次" width="120" align="center">
            </el-table-column>
            <el-table-column label="参与地址" width="380" align="center">
              <template slot-scope="scope">
                <span class="click" @click="toUrl('address',scope.row.winner,1)">{{scope.row.winner}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="perPrize" label="奖金" width="120" align="center">
            </el-table-column>
            <el-table-column prop="number" label="开奖数" width="120" align="center">
            </el-table-column>
            <el-table-column prop="txTime" label="参与时间" width="160" align="center">
            </el-table-column>
            <el-table-column label="txHash" min-width="180" align="center">
              <template slot-scope="scope">
                <span class="click" @click="toUrl('hash',scope.row.txHash,1)">{{scope.row.txHashs}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="参与历史" name="second">
          <el-table :data="participantHistoryData" stripe style="width: 100%" border>
            <el-table-column prop="gameId" label="游戏轮次" width="120" align="center">
            </el-table-column>
            <el-table-column label="参与地址" width="380" align="center">
              <template slot-scope="scope">
                <span class="click" @click="toUrl('address',scope.row.address,1)">{{scope.row.address}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="number" label="开奖数" width="160" align="center">
            </el-table-column>
            <el-table-column prop="txTime" label="参与时间" width="160" align="center">
            </el-table-column>
            <el-table-column label="txHash" min-width="180" align="center">
              <template slot-scope="scope">
                <span class="click" @click="toUrl('hash',scope.row.txHash,1)">{{scope.row.txHashs}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="开奖历史" name="third">
          <el-collapse v-model="activeName" accordion @change="changeColapse()">
            <el-collapse-item v-for="item in historyData"
                              :title="'第' +item.gameId+'轮 开奖: '+item.number+'  中奖金额: '+item.perPrize + '  开奖时间: '+item.txTime"
                              :name=item.gameId

            >
              <div class="footer_table">
                <div>参与信息</div>
                <el-table :data="historyDataIn" style="width: 100%">
                  <el-table-column label="地址" align="center" width="180">
                    <template slot-scope="scope">
                      <span class="click" @click="toUrl('address',scope.row.address,1)">{{scope.row.addresss}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="txHash" align="center" min-width="80">
                    <template slot-scope="scope">
                      <span class="click" @click="toUrl('hash',scope.row.txHash,1)">{{scope.row.txHashs}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="txTime" label="时间" align="center" width="180">
                  </el-table-column>
                  <el-table-column prop="number" label="猜数" align="center" width="150">
                  </el-table-column>
                </el-table>
                <div>中奖信息</div>
                <el-table :data="historyDataOut" style="width: 100%">
                  <el-table-column label="地址" align="center" width="180">
                    <template slot-scope="scope">
                      <span class="click" @click="toUrl('address',scope.row.address,1)">{{scope.row.addresss}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="txHash" align="center" min-width="80">
                    <template slot-scope="scope">
                      <span class="click" @click="toUrl('hash',scope.row.txHash,1)">{{scope.row.txHashs}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="txTime" label="时间" align="center" width="180">
                  </el-table-column>
                  <el-table-column prop="number" label="猜数" align="center" width="150">
                  </el-table-column>
                  <el-table-column prop="perPrize" label="中奖金额" align="center" width="150">
                  </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
          </el-collapse>

        </el-tab-pane>
      </el-tabs>

      <div class="page" v-show="pageTotal > pageSize">
        <el-pagination layout="total, prev, pager, next, jumper"
                       @current-change="pageChange"
                       :current-page=pageIndex
                       :page-size=pageSize
                       :total="pageTotal">
        </el-pagination>
      </div>

    </div>
    <Password ref="password" @passwordSubmit="guessPassSubmit">
    </Password>
  </div>
</template>

<script>
  import moment from 'moment'
  import axios from 'axios'
  import nuls from 'nuls-sdk-js'
  import sdk from 'nuls-sdk-js/lib/api/sdk'
  import utils from 'nuls-sdk-js/lib/utils/utils'
  import {chainInfo, API_URL} from '@/config'
  import {divisionDecimals, Times, Plus, getLocalTime, superLong, connectToExplorer} from '@/api/util'
  import {
    passwordVerification,
    getBalanceOrNonceByAddress,
    inputsOrOutputs,
    validateAndBroadcast
  } from '@/api/requestData'
  import Password from '@/components/PasswordBar'

  export default {
    data() {
      return {
        accontInfo: localStorage.hasOwnProperty('accountInfo') ? JSON.parse(localStorage.getItem('accountInfo')) : {}, //账户信息
        config: {
          url: 'http://192.168.1.40:81',
        },//配置信息
        jackpotInfo: {
          address: 'tNULSeBaNAUbZGCqnRm2nUD6uak2omChuEueVF',//合约地址
          balance: 0,
        },//奖池信息
        gameCurrentInfo: {},//当前游戏信息
        loading: true,
        loadingText: '',//加载提示语
        gameDetailInfo: {},//当前游戏信息
        valueList: [
          {value: 0, label: 0},
          {value: 1, label: 1},
          {value: 2, label: 2},
          {value: 3, label: 3},
          {value: 4, label: 4},
          {value: 5, label: 5},
          {value: 6, label: 6},
          {value: 7, label: 7},
          {value: 8, label: 8},
          {value: 9, label: 9},
        ],//数字列表
        numberValue: '',//选中数字
        partyData: [],
        activeHistory: 'first',//tab选中了
        activeName: '1', //手风琴选中
        participantData: [],//中奖历史
        participantHistoryData: [],//参与历史
        historyData: [],//开奖历史
        historyDataIn: [],//开奖历史参与
        historyDataOut: [],//开奖历史中奖
        pageSize: 10, //每页显示条数
        pageIndex: 1,  //当前页
        pageTotal: 0,//总页数
      }
    },

    created() {
      this.gameCurrent();
      this.getPrizePool();
      //this.getJackpotAmount(this.jackpotInfo.address)
    },
    mounted() {

      if (this.activeHistory === 'first') {
        this.userLotteryHistory(this.accontInfo.address)
      } else if (this.activeHistory === 'second') {
        this.gameParticipantHistory(this.accontInfo.address);
      } else {
        this.gameHistory();
      }

      setInterval(() => {
        this.getPrizePool();
        this.gameCurrent();
      }, 10000);

    },
    destroyed() {
      //clearInterval(this.chartInterval);
    },
    watch: {},
    components: {
      Password
    },
    methods: {

      /**
       * @disc: 获取当前游戏信息
       * @date: 2020-04-20 18:08
       * @author: Wave
       */
      async gameCurrent() {
        let url = this.config.url + '/game/current';
        try {
          let resData = await axios.get(url);
          //console.log(resData);
          //console.log(this.$store.getters.getHeight);
          if (resData.data.success) {
            if (resData.data.data) {
              this.gameCurrentInfo = resData.data.data;
              this.gameDetail(this.gameCurrentInfo.id);
              //console.log(this.gameCurrentInfo.endHeight < this.$store.getters.getHeight);
              if (this.gameCurrentInfo.endHeight <= this.$store.getters.getHeight) {
                this.loadingText = '准备开奖了';
                this.loading = true;
              } else {
                this.loading = false;
              }
            } else {
              this.gameCurrentInfo = {
                id: 0,
                startHeight: 0,
                endHeight: 0,
                gameLotteryDelay: 0,
                txHash: "0",
                txTime: 0,
              };
              this.loading = true;
              this.loadingText = '正在准备下一轮，请稍等...';
              this.userLotteryHistory(this.accontInfo.address);
            }
          }
        } catch (err) {
          console.log(err)
        }
      },

      /**
       * @disc: 根据gameId获取当前游戏信息
       * @params: gameId
       * @date: 2020-04-20 18:08
       * @author: Wave
       */
      async gameDetail(gameId, type = 0) {
        let url = this.config.url + '/game/detail/' + gameId;
        try {
          let resData = await axios.get(url);
          //console.log(resData);
          if (resData.data.success) {
            for (let item of resData.data.data.participants) {
              item.addresss = superLong(item.address, 4);
              item.txHashs = superLong(item.txHash, 6);
              item.txTime = moment(getLocalTime(item.txTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
            }
            if (type === 0) {
              this.gameDetailInfo = resData.data.data
            } else {
              this.historyDataIn = resData.data.data.participants;
              for (let item of resData.data.data.lottery.winners) {
                item.perPrize = divisionDecimals(resData.data.data.lottery.perPrize, 8);
                item.address = item.winner;
                item.addresss = superLong(item.address, 4);
                item.number = resData.data.data.lottery.number;
                item.txHash = resData.data.data.lottery.txHash;
                item.txHashs = superLong(item.txHash, 6);
                item.txTime = moment(getLocalTime(resData.data.data.lottery.txTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
              }
              this.historyDataOut = resData.data.data.lottery.winners;
            }
          }
        } catch (err) {
          console.log(err)
        }
      },

      /**
       * @disc: 选择数字
       * @params: number
       * @date: 2020-04-16 9:44
       * @author: Wave
       */
      clickNumber(number) {
        this.numberValue = number.toString();
      },

      /**
       * @disc: 猜数字开始
       * @params:
       * @date: 2020-04-17 17:27
       * @author: Wave
       */
      async guessStart() {
        if (!localStorage.hasOwnProperty('accountInfo')) {
          this.$message({message: '请登录', type: 'error'});
          return
        } else if (!this.numberValue) {
          this.$message({message: '请选择数字', type: 'error'});
          return
        }
        let contractInfo = {
          value: 201000000,
          address: this.jackpotInfo.address,
          methodName: 'join',
          methodDesc: '(Long gameId, Integer number) return void',
          args: [this.gameCurrentInfo.id, Number(this.numberValue)], //[gameId,number]
        };
        let validateContractCallRes = await this.validateContractCall(this.accontInfo.address, contractInfo.value, sdk.CONTRACT_MAX_GASLIMIT, sdk.CONTRACT_MINIMUM_PRICE, contractInfo.address, contractInfo.methodName, contractInfo.methodDesc, contractInfo.args);
        //console.log(validateContractCallRes);
        if (validateContractCallRes.success) {
          this.$refs.password.showPassword(true);
        }
      },

      /**
       * 验证调用合约交易
       * @param sender
       * @param value
       * @param gasLimit
       * @param price
       * @param contractAddress
       * @param methodName
       * @param methodDesc
       * @param args
       */
      async validateContractCall(sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args) {
        try {
          let resData = await this.$post('/', 'validateContractCall', [sender, value, gasLimit, price, contractAddress, methodName, methodDesc, args]);
          //console.log(resData);
          if (resData.hasOwnProperty('result')) {
            return {success: true, data: resData.result};
          } else {
            return {success: false, data: resData.result};
          }
        } catch (error) {
          return {success: false, data: error};
        }
      },

      /**
       * @disc: 输入密码开始抽奖
       * @params: password
       * @date: 2019-09-02 10:49
       * @author: Wave
       */
      async guessPassSubmit(password) {
        let accountInfo = JSON.parse(localStorage.getItem('accountInfo'));
        let newAccountInfo = await passwordVerification(accountInfo, password);
        //console.log(newAccountInfo);
        if (!newAccountInfo.success) {
          this.$message({message: '对不起，请输入正确的密码', type: 'error', duration: 3000});
          return;
        }
        let contractInfo = {
          value: 201000000,
          address: this.jackpotInfo.address,
          methodName: 'join',
          methodDesc: '(Long gameId, Integer number) return void',
          args: [this.gameCurrentInfo.id, Number(this.numberValue)], //[gameId,number]
        };
        let contractCallDataInfo = await this.imputedContractCallGas(accountInfo.address, contractInfo.value, contractInfo.address, contractInfo.methodName, contractInfo.methodDesc, contractInfo.args);
        //console.log(contractCallDataInfo);
        let contractCallFee = Number(Times(contractCallDataInfo.data.gasLimit, contractCallDataInfo.data.price));
        let transferInfo = {
          fromAddress: accountInfo.address,
          toAddress: contractInfo.address,
          assetsChainId: chainInfo.chainId,
          assetsId: chainInfo.assetsId,
          amount: contractInfo.value,
          fee: Number(Plus(100000, contractCallFee)),
          value: contractInfo.value
        };
        //console.log(transferInfo);
        let remark = '';
        let balanceInfo = await getBalanceOrNonceByAddress(accountInfo.address, chainInfo.chainId, chainInfo.assetsId);
        //console.log(balanceInfo);
        if (balanceInfo.success && balanceInfo.data.balance < 10000) {
          this.$message({message: '此账户余额不足，请充值或重新导入!', type: 'error'});
          return {success: false}
        }
        //交易组装
        let inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo, 16);
        //console.log(inOrOutputs);
        let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remark, 16, contractCallDataInfo.data);
        //console.log(tAssemble);
        let txhex = await nuls.transactionSerialize(newAccountInfo.pri, newAccountInfo.pub, tAssemble);
        //console.log(txhex);
        //验证并广播交易
        let validateTxhex = await validateAndBroadcast(txhex);
        //console.log(validateTxhex);
        if (!validateTxhex.success) {
          this.$message({message: '验证并广播交易错误：' + JSON.stringify(validateTxhex.data), type: 'error'});
        } else {
          this.$message({message: '交易已经发出，等待区块确认!', type: 'success'});
        }
      },

      /**
       * @disc: 获取奖池金额 getPrizePool()
       * @params: address
       * @date: 2020-04-17 16:30
       * @author: Wave
       */
      async getPrizePool() {
        let jackpotAmount = await this.methodCall(this.jackpotInfo.address, 'getPrizePool', '() return String', []);
        //console.log(jackpotAmount);
        if (!jackpotAmount.success) {
          console.log('获取奖池金额失败！')
        }
        jackpotAmount.data.balance = divisionDecimals(jackpotAmount.data.result, 8);
        this.jackpotInfo.balance = jackpotAmount.data.balance;
      },

      /**
       * 不上链方法调用
       * @param contractAddress
       * @param methodName
       * @param methodDesc
       * @param args
       */
      async methodCall(contractAddress, methodName, methodDesc, args) {
        let url = API_URL;
        let data = {
          "jsonrpc": "2.0",
          "method": "invokeView",
          "params": [chainInfo.chainId, contractAddress, methodName, methodDesc, args],
          "id": Math.floor(Math.random() * 1000)
        };
        //console.log(data);
        try {
          let resData = await axios.post(url, data);
          //console.log(resData);
          if (resData.data.hasOwnProperty('result')) {
            return {success: true, data: resData.data.result}
          } else {
            return {success: false, data: resData.data}
          }
        } catch (err) {
          return {success: true, data: err}
        }
      },

      /**
       * 预估调用合约交易的gas
       * @param sender
       * @param value
       * @param contractAddress
       * @param methodName
       * @param methodDesc
       * @param args
       */
      async imputedContractCallGas(sender, value, contractAddress, methodName, methodDesc, args) {
        let resData = await this.$post('/', 'imputedContractCallGas', [sender, value, contractAddress, methodName, methodDesc, args]);
        //console.log(resData);
        if (!resData.hasOwnProperty('result')) {
          console.log("预估调用合约交易的gas错误");
          return {success: false, data: resData}
        }

        let contractConstructorArgsTypes = await this.getContractMethodArgsTypes(contractAddress, methodName, methodDesc);
        //console.log(contractConstructorArgsTypes);
        if (!contractConstructorArgsTypes.success) {
          console.log("获取合约指定函数的参数类型错误");
          return {success: false, data: contractConstructorArgsTypes}
        }

        let newArgs = utils.twoDimensionalArray(args, contractConstructorArgsTypes.data);
        //console.log(newArgs);
        let contractCallData = {
          chainId: chainInfo.chainId,
          sender: sender,
          contractAddress: contractAddress,
          value: value,
          gasLimit: resData.result.gasLimit,
          price: sdk.CONTRACT_MINIMUM_PRICE,
          methodName: methodName,
          methodDesc: methodDesc,
          args: newArgs
        };
        return {success: true, data: contractCallData};
      },

      /**
       * 获取合约指定函数的参数类型
       * @param contractAddress
       * @param  methodName
       * @param  methodDesc
       */
      async getContractMethodArgsTypes(contractAddress, methodName, methodDesc) {
        return await this.$post('/', 'getContractMethodArgsTypes', [contractAddress, methodName, methodDesc])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              return {success: true, data: response.result};
            } else {
              return {success: false, data: response.error};
            }
          })
          .catch((error) => {
            return {success: false, data: error};
          });
      },

      /**
       * @disc: tab 切换
       * @params: tab
       * @date: 2020-04-17 10:31
       * @author: Wave
       */
      handleClick(tab) {
        //console.log(tab.name);
        this.activeHistory = tab.name;
        this.pageIndex = 1;
        this.pageTotal = 0;
        this.pageSize = 10;

        if (this.activeHistory === 'first') {
          this.userLotteryHistory(this.accontInfo.address)
        } else if (this.activeHistory === 'second') {
          this.gameParticipantHistory(this.accontInfo.address);
        } else {
          this.gameHistory();
        }

      },

      /**
       * @disc: 中奖列表
       * @params: address
       * @date: 2020-04-17 9:53
       * @author: Wave
       */
      async userLotteryHistory(address) {
        let url = this.config.url + '/game/user/lottery/' + address + '/' + this.pageIndex;
        let resData = await axios.get(url);
        //console.log(resData);
        if (resData.data.success) {
          this.pageTotal = resData.data.data.total;
          for (let item of resData.data.data.list) {
            item.perPrize = divisionDecimals(item.perPrize, 8);
            item.txHashs = superLong(item.txHash, 15);
            item.txTime = moment(getLocalTime(item.txTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
          }
          this.participantData = resData.data.data.list;
        }
      },

      /**
       * @disc: 参与列表
       * @params: address
       * @date: 2020-04-17 9:53
       * @author: Wave
       */
      async gameParticipantHistory(address) {
        let url = this.config.url + '/game/user/participation/' + address + '/' + this.pageIndex;
        let resData = await axios.get(url);
        //console.log(resData);
        if (resData.data.success) {
          this.pageTotal = resData.data.data.total;
          for (let item of resData.data.data.list) {
            item.txHashs = superLong(item.txHash, 15);
            item.txTime = moment(getLocalTime(item.txTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
          }
          this.participantHistoryData = resData.data.data.list;
        }
      },

      /**
       * @disc: 开奖历史
       * @date: 2020-04-17 9:53
       * @author: Wave
       */
      async gameHistory() {
        let url = this.config.url + '/game/history/' + this.pageIndex;
        //let data = {page: this.pageIndex, pageSize: this.pageSize};
        let historyData = await axios.get(url);
        //console.log(historyData);
        if (historyData.data.success) {
          this.pageTotal = historyData.data.data.total;
          for (let item of historyData.data.data.list) {
            if (item.number || item.number === 0) {
              item.perPrize = !item.perPrize ? '流局' : divisionDecimals(item.perPrize, 8);
            } else {
              item.number = '流局';
              item.perPrize = '流局';
            }
            item.txTime = moment(getLocalTime(item.txTime * 1000)).format('YYYY-MM-DD HH:mm:ss');
          }
          this.historyData = historyData.data.data.list;
        }
      },

      /**
       * @disc: 手风琴切换
       * @params:
       * @date: 2020-04-21 17:11
       * @author: Wave
       */
      changeColapse() {
        //console.log(this.activeName);
        this.gameDetail(this.activeName, 1)
      },

      /**
       * @disc: 分页功能
       * @params:val
       * @date: 2020-04-17 16:03
       * @author: Wave
       */
      pageChange(val) {
        this.pageIndex = val;
        if (this.activeHistory === 'first') {
          this.userLotteryHistory(this.accontInfo.address)
        } else if (this.activeHistory === 'second') {
          this.gameParticipantHistory(this.accontInfo.address);
        } else {
          this.gameHistory();
        }
      },

      /**
       * @disc: 连接跳转
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
          let newUrl = connectToExplorer(urlName, parameter);
          window.open(newUrl)
        }
      },
    }
  }
</script>

<style lang="less">
  .guess_number {
    .top {
      min-height: 400px;
      .guess {
        width: 600px;
        @media screen and (max-width: 1000px) {
          width: 100%;
        }
        h2 {
          text-align: center;
          margin: 40px 0;
        }
        .explain {
          background-color: #c1c1c1;
          padding: 10px;
          p {
            font-size: 12px;
            line-height: 22px;
          }
        }
        .number {
          margin: 40px auto 0;
          text-align: center;
          height: 50px;
          .is-circle {
            width: 40px;
            height: 40px;
            @media screen and (max-width: 1000px) {
              width: 1.8rem;
              height: 1.8rem;
              line-height: 0.9rem;
              padding: 0.45rem;
            }
          }
          .is_number {
            background-color: #67C23A;
            color: #FFFFFF;
          }
        }
        .submit {
          margin: 20px 0 0 0;
        }
        .jackpot {
          margin: 50px 0 0 0;
          height: 30px;
        }
      }
      .party {
        width: 550px;
        h3 {
          text-align: left;
          margin: 20px 0 0 0;
          border-bottom: 1px solid #c1c1c1;
          padding: 0 0 5px 10px;
          font-size: 16px;
          font-weight: bold;
        }
        .el-table {
          margin: 10px 0 0 0;
          th {
            background-color: #c1c1c1;
          }
          td, th {
            padding: 2px 0;
          }
        }
      }
    }
    .footer {
      .footer_table {
        .el-table {
          margin: 10px 0 0 0;
          th {
            background-color: #c1c1c1;
          }
          td, th {
            padding: 2px 0;
          }
        }
      }
      .el-collapse-item__header {
        height: 35px;
        line-height: 35px;
      }
      .el-table td, .el-table th {
        padding: 5px 0 !important;
      }
      .page {
        margin: 20px auto 80px;
        text-align: center;
      }
    }
  }

</style>

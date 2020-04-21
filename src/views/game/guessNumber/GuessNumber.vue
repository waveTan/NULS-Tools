<template>
  <div class="guess_number w1200">
    <div class="top">
      <div class="fl guess">
        <h2>NULS 猜数字</h2>
        <div class="explain">
          <p>1、用户选择0-9中的一个数字参与，每轮中奖的用户平分奖池所有（没有中奖奖池累计下一次）</p>
          <p>2、此随机数是基于NULS随机数开发的绝对公平</p>
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
        <div class="font14">本轮截止高度: <span class="fred fW600">{{gameCurrentInfo.endHeight}}</span></div>
      </div>
      <div class="fr party">
        <h3>当前参与</h3>
        <el-table :data="partyData" style="width: 100%">
          <el-table-column prop="address" label="地址" align="center" width="120">
          </el-table-column>
          <el-table-column prop="txHash" label="txHash" align="center" min-width="80">
          </el-table-column>
          <el-table-column prop="date" label="时间" align="center" width="160">
          </el-table-column>
          <el-table-column prop="amount" label="金额" align="center" width="70">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="footer cb">
      <el-tabs v-model="activeHistory" @tab-click="handleClick">
        <el-tab-pane label="中奖历史" name="first">中奖历史</el-tab-pane>
        <el-tab-pane label="参与历史" name="second">参与历史</el-tab-pane>
        <el-tab-pane label="开奖历史" name="third">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item v-for="item in historyData"
                              :title="'第' +item.gameId+'轮 开奖 '+item.gameLotteryDelay"
                              :name=item.gameId>
              <div class="footer_table">
                <el-table :data="partyData" style="width: 100%">
                  <el-table-column prop="address" label="地址" align="center" width="180">
                  </el-table-column>
                  <el-table-column prop="txHash" label="txHash" align="center" min-width="80">
                  </el-table-column>
                  <el-table-column prop="date" label="时间" align="center" width="180">
                  </el-table-column>
                  <el-table-column prop="amount" label="金额" align="center" width="150">
                  </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>
          </el-collapse>

        </el-tab-pane>
      </el-tabs>

      <div class="page" v-show="pageTotal > pageSize ">
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
  import axios from 'axios'
  import nuls from 'nuls-sdk-js'
  import sdk from 'nuls-sdk-js/lib/api/sdk'
  import utils from 'nuls-sdk-js/lib/utils/utils'
  import {chainInfo, API_URL} from '@/config'
  import {divisionDecimals, Times, Plus} from '@/api/util'
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
          address: 'tNULSeBaNAUbZGCqnRm2nUD6uak2omChuEueVF',
          balance: 0,
        },//奖池信息
        gameCurrentInfo: {},//当前游戏信息
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
        activeHistory: 'first',
        activeName: '1',
        historyData: [],//开奖历史
        participantData: [],//中奖历史
        participantHistoryData: [],//参与历史
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

      setInterval(() => {
        //this.getJackpotAmount(this.jackpotInfo.address)
      }, 10000)

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
        let url = 'http://192.168.1.40:81/game/current';
        try {
          let resData = await axios.get(url);
          //console.log(resData);
          if (resData.data.success) {
            this.gameCurrentInfo = resData.data.data
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
        this.numberValue = number
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
          args: [this.gameCurrentInfo.id, this.numberValue], //[gameId,number]
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
        let contractInfo = {
          value: 201000000,
          address: this.jackpotInfo.address,
          methodName: 'join',
          methodDesc: '(Long gameId, Integer number) return void',
          args: [this.gameCurrentInfo.id, this.numberValue], //[gameId,number]
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
        this.pageIndex = 1;
        this.pageTotal = 0;
        this.pageSize = 10;
        if (tab.name === 'third') {
          this.gameHistory();
        }

      },

      /**
       * @disc: 参与列表
       * @date: 2020-04-17 9:53
       * @author: Wave
       */
      async participantList(address) {
        let url = this.config.url + '/game/user/participation/' + address;
        let participantData = await axios.get(url);
        //console.log(historyData);
        if (participantData.data.success) {
          this.pageTotal = participantData.data.data.total;
          this.participantData = participantData.data.data.list;
        }
      },

      /**
       * @disc: 参与历史
       * @date: 2020-04-17 9:53
       * @author: Wave
       */
      async participantHistory(address) {
        let url = this.config.url + '/game/user/lottery/' + address;
        let participantHistoryData = await axios.get(url);
        //console.log(historyData);
        if (participantHistoryData.data.success) {
          this.pageTotal = participantHistoryData.data.data.total;
          this.participantHistoryData = participantHistoryData.data.data.list;
        }
      },

      /**
       * @disc: 开奖历史
       * @date: 2020-04-17 9:53
       * @author: Wave
       */
      async gameHistory() {
        let url = this.config.url + '/game/history';
        let data = {page: this.pageIndex, pageSize: this.pageSize};
        let historyData = await axios.post(url, data);
        //console.log(historyData);
        if (historyData.data.success) {
          this.pageTotal = historyData.data.data.total;
          this.historyData = historyData.data.data.list;
        }
      },

      /**
       * @disc: 分页功能
       * @params:val
       * @date: 2020-04-17 16:03
       * @author: Wave
       */
      pageChange(val) {
        this.pageIndex = val;
        this.gameHistory();
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
      .page {
        margin: 20px auto 0;
        text-align: center;
      }
    }
  }

</style>

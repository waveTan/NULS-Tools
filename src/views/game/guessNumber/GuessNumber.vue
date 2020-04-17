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
          <el-button type="success">{{this.numberValue ==='' ? '请点击数字':'您猜本轮开'}} {{this.numberValue}}</el-button>
        </div>
        <div class="jackpot font14">
          奖池<span class="font12" v-show="false">({{jackpotInfo.address}})</span>:&nbsp; <font
                class="fCN fW600">{{jackpotInfo.balance}}</font> NULS
        </div>
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
  import {chainInfo} from '@/config'
  import {divisionDecimals} from '@/api/util'
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
        config: {
          url: 'http://192.168.1.40:81',
        },
        jackpotInfo: {
          address: 'tNULSeBaMrbMRiFAUeeAt6swb4xVBNyi81YL24',
          balance: 0,
        },
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
      this.getJackpotAmount(this.jackpotInfo.address)
    },
    mounted() {

      setInterval(() => {
        this.getJackpotAmount(this.jackpotInfo.address)
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
       * @disc: 选择数字
       * @params: number
       * @date: 2020-04-16 9:44
       * @author: Wave
       */
      clickNumber(number) {
        this.numberValue = number
      },

      /**
       * @disc: 开始前执行方法
       * @date: 2020-04-15 11:28
       * @author: Wave
       */
      async handStartBefore() {

        if (!localStorage.hasOwnProperty('accountInfo')) {
          this.$message({message: '请先导入账户!', type: 'warning'});
          return {success: false}
        }
        let accountInfo = JSON.parse(localStorage.getItem('accountInfo'));

        let balanceInfo = await getBalanceOrNonceByAddress(accountInfo.address, chainInfo.chainId, chainInfo.assetsId);
        if (balanceInfo.success && balanceInfo.data.balance < 10000) {
          this.$message({message: '此账户余额不足，请充值或重新导入!', type: 'error'});
          return {success: false}
        }
        this.$refs.password.showPassword(true);

        /*  let newInterval = setInterval(() => {
            console.log(this.transferHash);
            if (this.transferHash) {
              clearInterval(newInterval);
              return {success: true, hash: this.transferHash}
            } else {
              console.log('没获取到transferHash')
            }
          }, 500);*/

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
        let transferInfo = {
          fromAddress: newAccountInfo.address,
          assetsChainId: chainInfo.chainId,
          assetsId: chainInfo.assetsId,
          toAddress: this.toAddress,
          amount: 10000,
          fee: 100000,
        };

        let balanceInfo = await getBalanceOrNonceByAddress(accountInfo.address, chainInfo.chainId, chainInfo.assetsId);
        if (balanceInfo.success && balanceInfo.data.balance < 10000) {
          this.$message({message: '此账户余额不足，请充值或重新导入!', type: 'error'});
          return {success: false}
        }
        //交易组装
        let inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo);
        //console.log(inOrOutputs);

        let remarks = 'lucky ticket';
        let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, remarks, 2);
        console.log(tAssemble);
        let txhex = await nuls.transactionSerialize(nuls.decrypteOfAES(accountInfo.aesPri, password), accountInfo.pub, tAssemble);
        console.log(txhex);
        this.transferHash = '256423'
        let validateTxhex = await validateAndBroadcast(txhex);
        console.log(validateTxhex)
      },

      /**
       * @disc:获取奖池金额
       * @params: address
       * @date: 2020-04-17 16:30
       * @author: Wave
       */
      async getJackpotAmount(address) {
        let jackpotAmount = await getBalanceOrNonceByAddress(address, chainInfo.chainId, chainInfo.assetsId);
        //console.log(jackpotAmount);
        if (!jackpotAmount.success) {
          console.log('获取奖池金额失败！')
        }
        jackpotAmount.data.balance = divisionDecimals(jackpotAmount.data.balance, 8);
        this.jackpotInfo.balance = jackpotAmount.data.balance;
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

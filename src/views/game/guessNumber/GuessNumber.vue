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
          <el-button circle v-for="item in valueList" :key="item" @click="clickNumber(item)">{{item}}</el-button>
        </div>
        <div class="submit tc">
          <el-button type="success">{{this.numberValue ==='' ? '请点击数字':'您猜本轮开'}} {{this.numberValue}}</el-button>
        </div>
        <div class="jackpot font14">
          奖池<span class="font12">(NULSd6HgXNRbGv7iMsoRRA37fzyTukitrWAVe)</span>:5625.123 NULS
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
      <h3>开奖历史</h3>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="第4轮 开奖 8" name="1">
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
        <el-collapse-item title="第3轮 开奖 5" name="2">
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
        <el-collapse-item title="第2轮 开奖 4" name="3">
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
        <el-collapse-item title="第1轮 开奖 6" name="4">
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
    </div>
    <Password ref="password" @passwordSubmit="guessPassSubmit">
    </Password>
  </div>
</template>

<script>
  import nuls from 'nuls-sdk-js'
  import {chainInfo} from '@/config'
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
        valueList: 9,//
        numberValue: '',
        partyData: [
          {address: 'NULS...WAVe', txHash: 'NULSew...WAVerwe', date: '2016-05-02 08:08:08', amount: '2.00'},
          {address: 'NULS...WAVe', txHash: 'NULSew...WAVerwe', date: '2016-05-02 08:08:08', amount: '2.00'},
          {address: 'NULS...WAVe', txHash: 'NULSew...WAVerwe', date: '2016-05-02 08:08:08', amount: '2.00'},
          {address: 'NULS...WAVe', txHash: 'NULSew...WAVerwe', date: '2016-05-02 08:08:08', amount: '2.00'},
          {address: 'NULS...WAVe', txHash: 'NULSew...WAVerwe', date: '2016-05-02 08:08:08', amount: '2.00'},
        ],
        activeName: '1'
      }
    },
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
       * @disc: 开始抽奖
       * @params:
       * @date: 2020-04-15 11:29
       * @author: Wave
       */
      handleStart() {
        console.log('开始抽奖');
      },

      /**
       * @disc: 抽奖完成
       * @params: index 中奖索引
       * @date: 2020-04-15 11:29
       * @author: Wave
       */
      handleEnd(index) {
        console.log(index);
        alert('恭喜您抽到大奖, 奖品为' + this.awards[this.currIndex].name)
      }
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
      h3 {
        text-align: left;
        margin: 20px 0 0 0;
        border-bottom: 1px solid #c1c1c1;
        padding: 0 0 5px 10px;
        font-size: 16px;
        font-weight: bold;
      }
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
    }
  }

</style>

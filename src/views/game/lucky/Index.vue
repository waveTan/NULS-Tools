<template>
  <div class="lucky">
    <h2 class="tc">NULS 大转盘</h2>
    <LuckDraw
            v-model="currIndex"
            :awards="awards"
            :rate="rate"
            :radius="radius"
            :textFontSize="textFontSize"
            :lineHeight="lineHeight"
            :textColor="textColor"
            :textMargin="textMargin"
            :textPadding="textPadding"
            :btnFontSize="btnFontSize"
            :btnColor="btnColor"
            :btnBorderColor1="btnBorderColor1"
            :btnBorderColor2="btnBorderColor2"
            :btnBorderColor3="btnBorderColor3"
            :btnBgColor="btnBgColor"
            :btnText="btnText"
            :btnRadius="btnRadius"
            :borderColor="borderColor"
            @start="handleStart"
            @end="handleEnd"
    />
    <div class="jackpot">
      <div class="font14">
        <div class="font14 fl">奖池</div>
        <div class="font12 fl">（NULSd6HghDFLgVoprpkePPJzxnXaGY2AcWAVE）</div>
        <el-popover placement="right" width="400" trigger="click">
          <div class="rule">
            <div>
              游戏规则:<br/>
              1、玩家花费0.01NULS 玩一次抽奖<br/>
              2、中奖以后系统立即转账到玩家地址<br/>
              3、0.01-手续费后的归集到奖池<br/>
              4、奖池金额望大佬多多支持（中奖几率和奖池中单个数量有关）
            </div>

          </div>
          <el-button type="text" class="fl" slot="reference" style="margin-top: -13px">规则</el-button>
        </el-popover>
      </div>
      <ul class="cb">
        <li><span>NULS:</span><font>1000.123456</font></li>
        <li><span>CC:</span><font>1000.123456</font></li>
        <li><span>wave:</span><font>1000.123456</font></li>
        <li><span>BBAI:</span><font>1000.123456</font></li>
        <li><span>Vibook:</span><font>1000.123456</font></li>
        <li><span>TPU:</span><font>1000.123456</font></li>
        <li><span>SLKC:</span><font>1000.123456</font></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currIndex: 2,               // 奖品的索引
        rate: 80,                   // 转盘速率
        radius: 220,                // 转盘半径
        textFontSize: '13px',       // 文字大小
        lineHeight: 20,             // 文字行高
        textColor: '#d64737',       // 文字颜色
        textMargin: 30,             // 文字距离边框距离
        textPadding: 0,             // 文字补偿宽度
        btnFontSize: '26px',        // 按钮文字大小
        btnColor: '#d64737',        // 按钮文件颜色
        btnBorderColor1: '#d64737', // 按钮外边框颜色
        btnBorderColor2: '#ffffff', // 按钮内边框颜色
        btnBorderColor3: '#f6c66f', // 按钮指针颜色
        btnBgColor: '#ffdea0',      // 按钮背景颜色
        btnText: '抽奖',            // 按钮内容
        btnRadius: 60,              // 按钮半径
        borderColor: '#d64737',     // 边框颜色
        awards: [                   // 奖品
          {name: 'NULS 主资产 1', color: '#f9e3bb'},
          {name: 'CC 合约 100', color: '#f8d384'},
          {name: 'wave 主资产 1000', color: '#f9e3bb'},
          {name: 'BBAI 主资产 100', color: '#f8d384'},
          {name: 'Vibook 主资产 10', color: '#f9e3bb'},
          {name: 'TPU 主资产 10', color: '#f8d384'},
          {name: 'NULS 主资产 10', color: '#f8d384'},
        ],
      }
    },
    methods: {
      handleStart() {
        console.log('开始抽奖');
      },
      handleEnd(index) {
        alert('恭喜您抽到大奖, 奖品为' + this.awards[this.currIndex].name)
      }
    }
  }
</script>

<style lang="less">
  .lucky {
    width: 440px;
    height: auto;
    margin: 40px auto;
    h2 {
      height: 50px;
    }
    .jackpot {
      margin: 20px 0 0 30px;
      ul {
        margin: 10px 0 0 0;
        li {
          line-height: 24px;
          font-size: 14px;
          span {
            width: 80px;
            display: block;
            float: left;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="container">
    <div class="w1200">
      <div class="left fl">
        <div class="lucky-wheel">
          <div class="lucky-title"></div>
          <div class="wheel-main">
            <div class="wheel-pointer-box">
              <div class="wheel-pointer" @click="rotate_handle()"
                   :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
            </div>
            <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
              <div class="prize-list">
                <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                  <div class="prize-pic">
                    <img :src="item.icon">
                  </div>
                  <div class="prize-count" v-if="item.count">
                    {{item.count}}
                  </div>
                  <div class="prize-type">
                    {{item.name}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="toast" v-show="toast_control">
          <div class="toast-container">
            <img :src="toast_pictrue" class="toast-picture">
            <div class="close" @click="close_toast()"></div>
            <div class="toast-title">
              {{toast_title}}
            </div>
            <div class="toast-btn">
              <div class="toast-cancel" @click="close_toast">关闭</div>
            </div>
          </div>
        </div>
        <div class="toast-mask" v-show="toast_control"></div>
      </div>
      <div class="right fr">
        <div class="main">
          <div class="countAddress font14">
            <p>奖池地址：<span class="click">NsdyJjLFGGsNMjwuo9KABrg2nWfgwQ8</span></p>
            <p>奖池金额：<span class="fCN fW600">88888.56885 NULS</span></p>
          </div>
          <div class="history">
            <p class="fW600 font18">游戏历史</p>
            <div class="history-title">
              <label class="itemList">
                <span class="addr">玩家</span>
                <span class="bet">赌注</span>
                <span class="result">结果</span>
                <span class="prize">随机数</span>
                <span class="icon"></span>
              </label>
            </div>

            <ul class="history-list">
              <li class="fwhite font14 tc">
                <label class="itemList">
                  <span class="addr">Nse1...WavE</span>
                  <span class="bet">0.5</span>
                  <span class="result">0.8</span>
                  <span class="prize">8</span>
                  <span class="icon"></span>
                </label>
              </li>
              <li class="fwhite font14 tc">
                <label class="itemList">
                  <span class="addr">Nse1...WavE</span>
                  <span class="bet">0.5</span>
                  <span class="result">0.8</span>
                  <span class="prize">8</span>
                  <span class="icon"></span>
                </label>
              </li>
              <li class="fwhite font14 tc">
                <label class="itemList">
                  <span class="addr">Nse1...WavE</span>
                  <span class="bet">0.5</span>
                  <span class="result">0.8</span>
                  <span class="prize">8</span>
                  <span class="icon"></span>
                </label>
              </li>
              <li class="fwhite font14 tc">
                <label class="itemList">
                  <span class="addr">Nse1...WavE</span>
                  <span class="bet">0.5</span>
                  <span class="result">0.8</span>
                  <span class="prize">8</span>
                  <span class="icon"></span>
                </label>
              </li>
              <li class="fwhite font14 tc">
                <label class="itemList">
                  <span class="addr">Nse1...WavE</span>
                  <span class="bet">0.5</span>
                  <span class="result">0.8</span>
                  <span class="prize">8</span>
                  <span class="icon"></span>
                </label>
              </li>
            </ul>
          </div>
          <div class="content" v-show="false">
            <div class="lottery_ticket">抽奖次数： {{ lottery_ticket}}</div>
          </div>
          <div class="tip">
            <div class="tip-title">活动规则</div>
            <div class="tip-content">
              <p> 1.一个NULS抽奖一次，次数无限</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        easejoy_bean: 0, //金豆
        lottery_ticket: 0, //抽奖次数
        prize_list: [
          {
            icon: require("./../../assets/img/bean_500.png"), // 奖品图片
            count: 10, // 奖品数量
            name: "NULS", // 奖品名称
            isPrize: 1 // 该奖项是否为奖品
          },
          {
            icon: require("./../../assets/img/bean_five.png"),
            count: 0.8,
            name: "NULS",
            isPrize: 1
          },
          {
            icon: require("./../../assets/img/bean_one.png"),
            count: 3,
            name: "NULS",
            isPrize: 1
          },
          {
            icon: require("./../../assets/img/point_five.png"),
            count: 0.5,
            name: "NULS",
            isPrize: 1
          },
          {
            icon: require("./../../assets/img/point_ten.png"),
            count: 10,
            name: "NULS",
            isPrize: 1
          },
          {
            icon: require("./../../assets/img/bean_500.png"),
            count: 2,
            name: "NULS",
            isPrize: 1
          },
          {
            icon: require("./../../assets/img/give_up.png"),
            count: 0,
            name: "未中奖",
            isPrize: 0
          },
          {
            icon: require("./../../assets/img/bean_500.png"),
            count: 6,
            name: "NULS",
            isPrize: 1
          }
        ], //奖品列表
        toast_control: false, //抽奖结果弹出框控制器
        hasPrize: false, //是否中奖
        start_rotating_degree: 0, //初始旋转角度
        rotate_angle: 0, //将要旋转的角度
        start_rotating_degree_pointer: 0, //指针初始旋转角度
        rotate_angle_pointer: 0, //指针将要旋转的度数
        rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
        rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
        click_flag: true, //是否可以旋转抽奖
        index: 0
      };
    },
    created() {
      this.init_prize_list("list");
    },
    computed: {
      toast_title() {
        return this.hasPrize
          ? "恭喜您，获得" + this.prize_list[this.index].count + ' ' + this.prize_list[this.index].name
          : "未中奖";
      },
      toast_pictrue() {
        return this.hasPrize
          ? require("./../../assets/img/congratulation.png")
          : require("./../../assets/img/sorry.png");
      }
    },
    methods: {
      //此方法为处理奖品数据
      init_prize_list(list) {
        console.log(list)
      },
      rotate_handle() {
        this.index = 1; //指定每次旋转到的奖品下标
        this.rotating();
      },
      rotating() {
        if (!this.click_flag) return;
        let type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
        let during_time = 5; // 默认为1s
        //let random = Math.floor(Math.random() * 7);
        let result_index = this.index; // 最终要旋转到哪一块，对应prize_list的下标
        let result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
        let rand_circle = 6; // 附加多转几圈，2-3
        this.click_flag = false; // 旋转结束前，不允许再次触发
        if (type === 0) {
          // 转动盘子
          let rotate_angle =
            this.start_rotating_degree +
            rand_circle * 360 +
            result_angle[result_index] -
            this.start_rotating_degree % 360;
          this.start_rotating_degree = rotate_angle;
          this.rotate_angle = "rotate(" + rotate_angle + "deg)";
          // // //转动指针
          // this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
          // this.start_rotating_degree_pointer =360*rand_circle;
          let that = this;
          // 旋转结束后，允许再次触发
          setTimeout(function () {
            that.click_flag = true;
            that.game_over();
          }, during_time * 1000 + 1500); // 延时，保证转盘转完
        } else {
          console.log("2")
        }
      },
      game_over() {
        this.toast_control = true;
        this.hasPrize = this.prize_list[this.index].isPrize
      },
      //关闭弹窗
      close_toast() {
        this.toast_control = false;
      }
    }
  };
</script>
<style lang="less">
  @import "./../../assets/css/style";
  .container {
    min-height: 877px;
    background: rgb(243, 109, 86);
    .left {
      width: 500px;
    }
    .right {
      width: 700px;
      background: rgb(252, 207, 133) url("./../../assets/img/color_pillar.png") no-repeat center bottom;
      background-size: 100%;
      .main {
        position: relative;
        width: 100%;
        min-height: 45rem;
        padding-bottom: 1.6875rem;
        .countAddress {
          width: 100%;
          height: 5rem;
          margin: 5rem 0 0 5rem;
          p {
            line-height: 22px;
          }
        }
        .history{
          margin: 0 0 0 5rem;
          width: 500px;
          .history-title{
            width: 100%;
            height: 43px;
            margin: 1rem 0 0 0;
            text-align: center;
            border: 1px solid #c1c1c1;
          }
          .history-list{
            li{
              height: 1.2rem;
             border-bottom: 1px solid #c1c1c1;
            }
          }
        }
      }
    }
  }

  .lucky-wheel {
    width: 100%;
    height: 50rem;
    background: rgb(252, 207, 133) url("./../../assets/img/color_pillar.png") no-repeat center bottom;
    background-size: 100%;
    padding-top: 1.5625rem;
  }

  .lucky-title {
    width: 100%;
    height: 14rem;
    background: url("./../../assets/img/lucky_title.png") no-repeat center top;
    background-size: 100%;
  }

  .wheel-main {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .wheel-bg {
    width: 18.4375rem;
    height: 18.4375rem;
    background: url("./../../assets/img/draw_wheel.png") no-repeat center top;
    background-size: 100%;
    color: #fff;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    transition: transform 3s ease;
  }

  .wheel-pointer-box {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -60%);
    width: 5.3125rem;
    height: 5.3125rem;
  }

  .wheel-pointer {
    width: 5.3125rem;
    height: 5.3125rem;
    background: url("./../../assets/img/draw_btn.png") no-repeat center top;
    background-size: 100%;
    transform-origin: center 60%;
  }

  .wheel-bg div {
    text-align: center;
  }

  .prize-list {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .prize-list .prize-item {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .prize-list .prize-item:first-child {
    top: 0;
    left: 8.3125rem;
    transform: rotate(20deg);
  }

  .prize-list .prize-item:nth-child(2) {
    top: 2.8rem;
    left: 10.8rem;
    transform: rotate(67deg);
  }

  .prize-list .prize-item:nth-child(3) {
    top: 6.4rem;
    left: 10.6rem;
    transform: rotate(-250deg);
  }

  .prize-list .prize-item:nth-child(4) {
    top: 9rem;
    left: 8.2125rem;
    transform: rotate(-210deg);
  }

  .prize-list .prize-item:nth-child(5) {
    top: 9.2125rem;
    left: 4.4rem;
    transform: rotate(-160deg);
  }

  .prize-list .prize-item:nth-child(6) {
    top: 6.3875rem;
    left: 1.9rem;
    transform: rotate(-111deg);
  }

  .prize-list .prize-item:nth-child(7) {
    top: 2.8rem;
    left: 1.8125rem;
    transform: rotate(-69deg);
  }

  .prize-list .prize-item:nth-child(8) {
    top: 0;
    left: 4.5rem;
    transform: rotate(-20deg);
  }

  .prize-item {
    width: 5.875rem;
    height: 9rem;
  }

  .prize-pic img {
    width: 4.0625rem;
    height: 2.5rem;
    margin-top: 1.5625rem;
  }

  .prize-count {
    font-size: 0.875rem;
  }

  .prize-type {
    font-size: 0.75rem;
  }

  .content {
    position: absolute;
    left: 0;
    //background: rgb(243, 109, 86);
    width: 100%;
    height: 5.1875rem;
    font-size: 1.125rem;
    color: #ffeb39;
    padding-left: 6.75rem;
  }

  .content div {
    text-align: left;
  }

  .tip {
    position: relative;
    margin: 2.5rem auto 0;
    width: 36rem;
    top: 8rem;
    border: 1px solid #fbc27f;
  }

  .tip-title {
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 1rem;
    color: #fccc6e;
    background: rgb(243, 109, 86);
    padding: 0.3125rem 0.625rem;
  }

  .tip-content {
    padding: 1.5625rem 0.625rem;
    font-size: 0.875rem;
    color: #fff8c5;
    line-height: 1.5;
  }

  .toast-mask {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 10000;
    width: 100%;
    height: 100%;
  }

  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 20000;
    transform: translate(-50%, -50%);
    width: 15.4375rem;
    background: #fff;
    border-radius: 0.3125rem;
    padding: 0.3125rem;
    //background-color: rgb(252, 244, 224);
  }

  .toast-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px dotted #fccc6e;
  }

  .toast-picture {
    position: absolute;
    top: -6.5rem;
    left: -1.5rem;
    width: 18.75rem;
    height: 8.5625rem;
  }

  .toast-pictrue-change {
    position: absolute;
    top: -1.5rem;
    left: -1.375rem;
    width: 17.5rem;
    height: 3.125rem;
  }

  .toast-title {
    padding: 2.8125rem 0;
    font-size: 18px;
    color: #fc7939;
    text-align: center;
  }

  .toast-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.9375rem;
  }

  .toast-btn div {
    background-image: -moz-linear-gradient(
            -18deg,
            rgb(242, 148, 85) 0%,
            rgb(252, 124, 88) 51%,
            rgb(252, 124, 88) 99%
    );
    background-image: -ms-linear-gradient(
            -18deg,
            rgb(242, 148, 85) 0%,
            rgb(252, 124, 88) 51%,
            rgb(252, 124, 88) 99%
    );
    background-image: -webkit-linear-gradient(
            -18deg,
            rgb(242, 148, 85) 0%,
            rgb(252, 124, 88) 51%,
            rgb(252, 124, 88) 99%
    );
    box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
    width: 4.6875rem;
    height: 1.875rem;
    border-radius: 1.875rem;
    text-align: center;
    line-height: 1.875rem;
    color: #fff;
  }

  .close {
    position: absolute;
    top: -0.9375rem;
    right: -0.9375rem;
    width: 2rem;
    height: 2rem;
    background: url("./../../assets/img/close_store.png") no-repeat center top;
    background-size: 100%;
  }
</style>

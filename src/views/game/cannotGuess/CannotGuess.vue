<template>
  <div class="cannot-guess">
    <h3>猜不着 游戏</h3>
    <p> 1、用户消费100nuls参与游戏（获取0-9中的一个数字）</p>
    <p> 2、一局游戏共10人参与（参与人数达到10人就开奖）</p>
    <p> 3、游戏开奖：</p>
    <p> 未中奖：100nuls全部返还并补偿1-10nuls</p>
    <p> 中奖者：获取奖励商品实物价值高于100nuls（发送一个交易到指定地址并备注收货地址，后端发货以后也发送一个交易个中奖地址并备注快递信息）</p>
    <p> 备注：每个账户一轮只能参与一次</p>
  </div>
</template>

<script>
  export default {
    name: "cannot-guess"
  }
</script>

<style scoped lang="less">
  .cannot-guess {
    width: 1000px;
    font-size: 13px;
    margin: 5rem auto 0;
    line-height: 26px;
    h3 {
      font-size: 16px;
      font-weight: bold;
    }
  }
</style>

<template>
  <div class="home cb w1200">
    <div class="cb">
      <h6 class="title font18 fW600">NULS </h6>
      <ul class="dapp-list">
        <li @click="toUrl('luckyWheel')">
          <img src="./../assets/logo.png">
          <b class="font12">NULS Web钱包<br/>资产、共识、合约</b>
        </li>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">NULS 浏览器<br/>账户、节点、合约、轮次查询</b>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">Nabox<br/>NULS APP</b>
        </li>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">Githup<br/>NULS 开源代码</b>
        </li>
      </ul>
    </div>
    <div class="cb">
      <h6 class="title font18 fW600">生态</h6>
      <ul class="dapp-list">
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">pcom<br/>{{$t('tips.tips2')}}</b>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">usdi<br/>{{$t('tips.tips2')}}</b>
        </li>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">链工厂<br/>{{$t('tips.tips2')}}</b>
        </li>
      </ul>
    </div>
    <div class="cb">
      <h6 class="title font18 fW600">娱乐</h6>
      <ul class="dapp-list">
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">大转盘<br/>{{$t('tips.tips2')}}</b>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">快乐翻牌<br/>{{$t('tips.tips2')}}</b>
        </li>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">数字华容道<br/>{{$t('tips.tips2')}}</b>
        </li>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">猜数字<br/>{{$t('tips.tips2')}}</b>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {

      /**
       * 连接跳转
       * @param urlName
       */
      toUrl(urlName) {
        this.$router.push({
          name: urlName
        })
      },
    }
  }
</script>
<style lang="less">
  @import "./../assets/css/style";

  .home {
    min-height: 800px;
  }
</style>

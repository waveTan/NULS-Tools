<template>
  <div class="home cb w1200">
    <div class="nuls">
      <h6 class="title">NULS</h6>
      <ul class="dapp-list">
        <li @click="toUrl('luckyWheel')">
          <img src="./../assets/logo.png">
          <b class="font12">NULS Web钱包<br/>NULS的钱包</b>
        </li>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">nuls浏览器<br/>查询信息</b>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">naboxnulsapp<br/>{{$t('tips.tips2')}}</b>
        </li>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">Githup<br/>源码信息</b>
        </li>
      </ul>
    </div>
    <div class="cb">
      <h6 class="title">NUSL生态</h6>
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
      <h6 class="title">nuls小游戏</h6>
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
    name: 'home',
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

  }
</style>

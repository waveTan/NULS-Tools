<template>
  <div class="tool w1200">
    <div>
      <h6 class="title">文档</h6>
      <ul class="dapp-list">
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">{{$t('tips.tips1')}}<br/>{{$t('tips.tips2')}}</b>
        </li>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">{{$t('tips.tips1')}}<br/>{{$t('tips.tips2')}}</b>
        </li>
      </ul>
    </div>
    <div class="cb">
      <h6 class="title">工具</h6>
      <ul class="dapp-list">
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">反序列<br/>{{$t('tips.tips2')}}</b>
        </li>
        <li>
          <img src="./../assets/logo.png">
          <b class="font12">nuls-js-sdk<br/>{{$t('tips.tips2')}}</b>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tool"
  }
</script>

<style scoped>

</style>

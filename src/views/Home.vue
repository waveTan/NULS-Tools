<template>
  <div class="home cb w1200">
   <ul class="dapp-list">
     <li @click="toUrl('luckyWheel')">
       <img src="./../assets/logo.png">
       <b class="font12">{{$t('tips.tips1')}}<br/>{{$t('tips.tips2')}}</b>
     </li>
     <li>
       <img src="./../assets/logo.png">
       <b class="font12">{{$t('tips.tips1')}}<br/>{{$t('tips.tips2')}}</b>
     <li>
       <img src="./../assets/logo.png">
     <b class="font12">{{$t('tips.tips1')}}<br/>{{$t('tips.tips2')}}</b>
     </li>
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
  .home{

  }
</style>

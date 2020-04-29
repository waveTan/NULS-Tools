<template>
  <div class="guess w1200 cb">
    <h6 class="title font18 fW600">{{$t('public.zoology')}}</h6>
    <ul class="dapp-list">
      <li @click="toUrl('guessNumber','',0)">
        <img src="@/assets/logo.png">
        <b class="font12">猜数字<br/>基于NULS随机数的合约猜数游戏</b>
      </li>
      <!--<li @click="toUrl('lucky','',0)">-->
      <li>
        <img src="@/assets/logo.png">
        <!-- <b class="font12">大转盘<br/>玩转盘得NULS百分之百中奖</b>-->
        <b class="font12">大转盘<br/>{{$t('public.comingSoon')}}</b>
      </li>

      <li>
        <img src="@/assets/logo.png">
        <b class="font12">快乐翻牌<br/>{{$t('public.comingSoon')}}</b>
      </li>
      <li>
        <img src="@/assets/logo.png">
        <b class="font12">数字华容道<br/>{{$t('public.comingSoon')}}</b>
      </li>

    </ul>
  </div>
</template>

<script>
  export default {
    created() {

    },
    mounted() {
    },
    destroyed() {
    },
    components: {},
    computed: {},
    watch: {},
    methods: {

      /**
       * @disc: 连接跳转
       * @param urlName
       * @param parameter
       * @param type  0:路由跳转 1：外部链接
       */
      toUrl(urlName, parameter, type) {
        console.log(urlName, parameter, type);
        if (type === 0) {
          this.$router.push({
            name: urlName
          })
        } else {
          window.open(urlName)
        }
      },

    }
  }
</script>

<style lang="less">

</style>

<template>
  <div class="guess w1200 cb">
    <h6 class="title font18 fW600">{{$t('public.recreation')}}</h6>
    <ul class="dapp-list">
      <li @click="toUrl('goblin','',0)">
        <img src="@/assets/img/goblin-logo.png" width="50">
        <b class="font12">{{$t('goblin.goblin0')}}<br/>{{$t('goblin.goblin1')}}</b>
      </li>
      <!-- <li @click="toUrl('guessNumber','',0)">-->
      <li>
        <p>{{$t('home.home9')}}<span class="font12 fW400">({{$t('public.testing')}})</span></p>
        <b class="font12">{{$t('home.home10')}}</b>
      </li>
      <li>
        <p>{{$t('home.home28')}}<span class="font12 fW400">({{$t('public.design')}}...)</span></p>
        <b class="font12">{{$t('home.home29')}}</b>
      </li>
      <!-- <li>
         <img src="@/assets/logo.png">
         <b class="font12">快乐翻牌<br/>{{$t('public.comingSoon')}}</b>
       </li>
       <li>
         <img src="@/assets/logo.png">
         <b class="font12">数字华容道<br/>{{$t('public.comingSoon')}}</b>
       </li>-->
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
        //console.log(urlName, parameter, type);
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

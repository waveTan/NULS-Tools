<template>
  <div class="tool w1200">
    <div>
      <h6 class="title font18 fW600">{{$t('public.documents')}}</h6>
      <ul class="dapp-list">
        <li @click="toUrl('https://docs.nuls.io/zh/Guide/','',1)">
          <p>{{$t('home.home16')}}</p>
          <b class="font12">{{$t('home.home17')}}</b>
        </li>
        <li @click="toUrl('https://docs.nuls.io/zh/Docs/','',1)">
          <p>{{$t('home.home18')}}</p>
          <b class="font12">{{$t('home.home19')}}</b>
        </li>
      </ul>
    </div>
    <div class="cb">
      <h6 class="title font18 fW600">{{$t('nav.tool')}}</h6>
      <ul class="dapp-list">
        <li @click="toUrl('http://des.mimieye.net:81/','',1)">
          <p>NULS {{$t('home.home20')}}</p>
          <b class="font12">{{$t('home.home21')}}</b>
        </li>
        <li @click="toUrl('https://www.npmjs.com/package/nuls-sdk-js','',1)">
          <p>nuls-js-sdk</p>
          <b class="font12">{{$t('home.home22')}}</b>
        </li>
        <li @click="toUrl('toolNewAddress','',0)">
          <p>地址生成器</p>
          <b class="font12">
            可生成指定后缀的地址
          </b>
        </li>
      </ul>
    </div>
    <!--<div class="cb">
      <h6 class="title font18 fW600">{{$t('public.interflow')}}</h6>
      <ul class="dapp-list">
        <li>
          <p>{{$t('home.home23')}}</p>
          <b class="font12"></b>
        </li>
        <li>
          <p>{{$t('home.home24')}}</p>
          <b class="font12"></b>
        </li>
        <li>
          <p>{{$t('home.home25')}}</p>
          <b class="font12"></b>
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
  export default {
    methods: {

      /** 连接跳转
       * @param urlName
       * @param parameter
       * @param type  0:路由跳转 1：外部链接
       */
      toUrl(urlName, parameter, type) {
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

<style scoped>

</style>

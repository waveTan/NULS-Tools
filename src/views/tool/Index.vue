<template>
    <div class="tool w1200">
        <div style="display: none">
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
                <li @click="toUrl('toolNewAddress','',0)">
                    <p>{{$t('newAddress.newAddress10')}}</p>
                    <b class="font12">{{$t('newAddress.newAddress11')}}</b>
                </li>
                <!--<li @click="toUrl('lockedTransfer','',0)">
                  <p>{{$t('locking.locking0')}}</p>
                  <b class="font12">{{$t('locking.locking0')}}</b>
                </li>
                <li @click="toUrl('oneToMore','',0)">
                  <p>{{$t('oneTo.oneTo11')}}</p>
                  <b class="font12">{{$t('oneTo.oneTo12')}}</b>
                </li>-->
            </ul>
        </div>
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

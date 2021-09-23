<template>
    <div class="home cb w1200">
        <div class="cb" style="display: none">
            <h6 class="title font18 fW600">NULS </h6>
            <ul class="dapp-list">
                <li @click="toUrl('https://wallet.nuls.io/','',1)">
                    <p>{{$t('home.home0')}}</p>
                    <b class="font12">{{$t('home.home1')}}</b>
                </li>
                <li @click="toUrl('https://nulscan.io/','',1)">
                    <p>{{$t('home.home2')}}</p>
                    <b class="font12">{{$t('home.home3')}}</b>
                <li @click="toUrl('http://nabox.io/','',1)">
                    <p>NABOX</p>
                    <b class="font12">NULS APP</b>
                </li>
                <li @click="toUrl('https://github.com/nuls-io','',1)">
                    <p>Githup</p>
                    <b class="font12">{{$t('home.home4')}}</b>
                </li>
            </ul>
        </div>
        <div class="cb">
            <h6 class="title font18 fW600">{{$t('public.zoology')}}</h6>
            <ul class="dapp-list">
                <li @click="toUrl('tokenSwap','',0)">
                    <p>Token Push({{$t('public.testing')}}....)</p>
                    <b class="font12">{{$t('home.home30')}}</b>
                </li>
            </ul>
        </div>
        <div class="cb">
            <h6 class="title font18 fW600">{{$t('public.recreation')}}</h6>
            <ul class="dapp-list">
                <!--<li @click="toUrl('goblin','',0)">
                  <img src="@/assets/img/goblin-logo.png" width="50">
                  <b class="font12">{{$t('goblin.goblin0')}}<br/>{{$t('goblin.goblin1')}}</b>
                </li>-->
                <li @click="toUrl('guessNumber','',0)">
                    <p>{{$t('home.home9')}}</p>
                    <b class="font12">{{$t('home.home10')}}</b>
                </li>
                <li @click="toUrl('cannotGuess','',0)">
                    <p>{{$t('cannotGuess.cannotGuess0')}}<span class="font12 fW400">({{$t('public.design')}}...)</span>
                    </p>
                    <b class="font12">{{$t('cannotGuess.cannotGuess1')}}</b>
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
  import {openConnection} from '@/api/util'

  export default {
    data() {
      return {
      }
    },
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
        if (type === 0) {
          this.$router.push({
            name: urlName
          })
        } else {
          openConnection(urlName);
        }
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

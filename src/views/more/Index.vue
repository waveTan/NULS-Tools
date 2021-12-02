<template>
  <div class="more w1200">
    <h6 class="title font18 fW600">{{$t('home.home11')}}</h6>
    <ul class="dapp-list">
      <li @click="toUrl('https://my-beta.aleph.im/','',1)">
        <p>{{$t('home.home12')}}</p>
        <b class="font12">{{$t('home.home13')}}: Moshe</b>
      </li>
      <li @click="toUrl('https://trade.verihub.cn/','',1)">
        <p>{{$t('home.home14')}}</p>
        <b class="font12">{{$t('home.home13')}}: VeriHUB</b>
      </li>
      <li>
        <p>{{$t('home.home15')}}</p>
        <b class="font12">{{$t('home.home13')}}: *****</b>
      </li>
    </ul>
    <el-button @click="ts()">取 消</el-button>
    <el-button @click="addressList()">address list</el-button>
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

      async ts() {
        console.log("dfdf");
        const Binance = require('node-binance-api');
        const binance = new Binance().options({
          APIKEY: '51OR2tvSw9d6rmFNnUchN0WKuLokzAxg13k5bmc6jUZC5fOgWAxFHt9w1NKl93yT',
          APISECRET: 'NW8tbJNSFC3NG2P2TyY4GhHCoud8Bp9c1uEzayWZ0uohMLvnTyTLrH8n8VXD2ot8'
        });
        let ticker = await binance.prices();
        console.info(`Price of BNB: ${ticker.BNBUSDT}`);
      },

      async addressList() {
        const Binance = require('node-binance-api');
        const binance = new Binance().options({
          APIKEY: '51OR2tvSw9d6rmFNnUchN0WKuLokzAxg13k5bmc6jUZC5fOgWAxFHt9w1NKl93yT',
          APISECRET: 'NW8tbJNSFC3NG2P2TyY4GhHCoud8Bp9c1uEzayWZ0uohMLvnTyTLrH8n8VXD2ot8'
        });

        /*let balancesList = await binance.balance();
        console.info(balancesList);*/

        await binance.balance((error, balances) => {
          if (error) return console.error(error);
          console.info("balances()", balances);
          console.info("ETH balance: ", balances.ETH.available);
        });

        /* binance.bookTickers('BNBBTC', (error, ticker) => {
           console.info("bookTickers", ticker);
         });*/

      },

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

<template>
  <div class="backtop bg3">
    <i class="el-icon-back" @click="back" v-if="isBackIcon"></i>
    <span class="b-title" v-if="rightTitle">{{rightTitle}}</span>
    <span class="b-name" v-if="isName"
          @click="toUrl('mobileKLine','',0)">{{$store.getters.getDealData.tradingName}}</span>
    <font class="b-ud" v-if="isUpsDowns"
          :class="$store.getters.getDealData.upsDowns > 0 ? 'bg-green':'bg-red'">{{$store.getters.getDealData.upsDowns}}%</font>
    <i class="shoucang"
       :class="tradingInfo.isCollection ===0?'el-icon-star-off':'el-icon-star-on'"
       v-if="isColl" @click="isCollection"></i>
  </div>
</template>

<script>
  import {accountList} from '@/api/util.js'
  import {collection, cancelCollection, getMyCoinData} from '@/api/requestData'

  export default {
    props: {
      isBackIcon: {
        type: Boolean,
        default: () => false
      },
      rightTitle: {
        type: String,
        default: () => ''
      },
      isName: {
        type: Boolean,
        default: () => false
      },
      isUpsDowns: {
        type: Boolean,
        default: () => false
      },
      isColl: {
        type: Boolean,
        default: () => false
      },
    },
    data() {
      return {
        accountInfo: {},//地址信息
        tradingInfo: {},//交易对信息
      }
    },
    created() {
      this.accountInfo = accountList(1);
      this.tradingInfo = this.$store.getters.getDealData;
    },

    mounted() {
      this.init();
    },
    methods: {

      //初始化
      async init() {
        if (this.accountInfo && this.accountInfo.address) {
          let coinRes = await getMyCoinData(this.accountInfo.address);
          //console.log(coinRes);
          if (!coinRes.success) {
            console.log('获取自选交易对失败！');
            return;
          }
          for (let item of coinRes.result) {
            if (this.tradingInfo.tradingName === item.tradingName) {
              this.tradingInfo.isCollection = 1
            }
          }
        }
      },

      //返回
      back() {
        window.history.back();
      },

      //收藏与取消收藏
      async isCollection() {
        //console.log(this.tradingInfo);
        if (this.tradingInfo.isCollection === 1) {
          let resData = await cancelCollection(this.accountInfo.address, this.tradingInfo);
          if (!resData.success) {
            console.log('取消收藏失败！');
            return;
          }
          this.tradingInfo.isCollection = 0;
        } else {
          let resData = await collection(this.accountInfo.address, this.tradingInfo);
          if (!resData.success) {
            console.log('收藏失败！');
            return;
          }
          this.tradingInfo.isCollection = 1;
        }
      },

      /**
       * 连接跳转
       * @param name
       * @param parameter
       */
      async toUrl(name, parameter, type = 0) {
        if (type === 0) {
          let newQuery = {};
          this.$router.push({
            name: name,
            query: newQuery
          })
        }
      },

    }
  }
</script>

<style lang="less">
  .backtop {
    height: 3rem;
    line-height: 3rem;
    color: #F5F7FA;
    padding: 0 0.5rem;
    i, span, font {
      display: block;
      float: left;
    }
    .el-icon-back {
      margin: 1rem 0.5rem 0 0;
    }
    span {
      font-size: 0.8rem;
      margin: 0 0 0 0;
    }
    .b-title {

    }
    .b-name {
      font-size: 1.2rem;
    }
    .b-ud {
      height: 1.45rem;
      line-height: 1.1rem;
      border-radius: 0.2rem;
      text-align: center;
      margin: 0.8rem 0 0 1rem;
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
    }
    .shoucang {
      float: right;
      margin: 1rem 0 0 0;
    }
  }
</style>

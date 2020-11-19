<template>
  <el-row class="bottom cb">
    <el-row class="pc">
      <el-row class="w1200 font12 info">
        <el-col :span="22">
          <div>
            {{$t('public.developer')}}:
            <span class="click" @click="toUrl('dream','',0)">wave</span>
            <!--<span class="click" @click="toUrl('https://www.linkedin.com/in/wave98688/','',1)">wave</span>-->
          </div>
          <div>{{$t('public.address')}}: NULSd6HgbayXFPacp5zDWiCgs4goxFyy7WAVE</div>
        </el-col>
        <el-col :span="2" class="tr">
          <Height>
          </Height>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="mobile">
      <ul>
        <li @click="handleSelect('home')" :class="activeIndex ==='home' ? 'is_nav':''">
          <i class="iconfont icon-quanbu"></i>{{$t('nav.home')}}
        </li>
        <li @click="handleSelect('game')" :class="activeIndex ==='game' ? 'is_nav':''">
          <i class="iconfont icon-dazhuanpan"></i>{{$t('nav.game')}}
        </li>
        <li @click="handleSelect('tool')" :class="activeIndex ==='tool' ? 'is_nav':''">
          <i class="iconfont icon-gongju"></i>{{$t('nav.tool')}}
        </li>
        <li @click="handleSelect('more')" :class="activeIndex ==='more' ? 'is_nav':''">
          <i class="iconfont icon-gengduo"></i>{{$t('nav.more')}}
        </li>
      </ul>
    </el-row>
  </el-row>
</template>

<script>
  import Height from './Height.vue'
  import ElRow from "element-ui/packages/row/src/row";
  import {getAddressInfoByAddress} from '@/api/requestData'

  export default {
    data() {
      return {
        activeIndex: 'home',//导航选中项
        accountInfo: localStorage.hasOwnProperty('accountInfo') ? JSON.parse(localStorage.getItem('accountInfo')) : {}, //账户信息
        address: localStorage.hasOwnProperty('accountInfo') ? JSON.parse(localStorage.getItem('accountInfo')).address : '',
        bottomInterval: null,
      };
    },
    created() {
    },
    mounted() {
      this.bottomInterval = setInterval(() => {
        if (this.accountInfo.address && localStorage.hasOwnProperty('accountInfo')) {
          this.address = this.accountInfo.address;
          this.getAddressInfo(this.accountInfo.address);
        }
      }, 3000);

    },
    components: {
      ElRow,
      Height
    },
    destroyed() {
      clearInterval(this.bottomInterval);
    },
    watch: {
      "address": function (val, oldVal) {
        if (val && val !== oldVal) {
          clearInterval(this.bottomInterval);
          this.bottomInterval = setInterval(() => {
            if (this.accountInfo.address && localStorage.hasOwnProperty('accountInfo')) {
              this.address = this.accountInfo.address;
              this.getAddressInfo(this.accountInfo.address);
            }
          }, 5000);
        }
      }
    },
    methods: {

      /**
       * 获取最新高度
       */
      async getAddressInfo(address) {
        let addressInfo = await getAddressInfoByAddress(address);
        //console.log(addressInfo);
        if (addressInfo.success) {
          this.accountInfo.balance = addressInfo.data.balance;
          localStorage.setItem('accountInfo', JSON.stringify(this.accountInfo));
        }
      },

      /**
       * 导航跳转
       * @param key
       **/
      handleSelect(key) {
        this.activeIndex = key;
        this.$router.push({
          name: key
        })
      },

      /**
       * 语言切换
       */
      selectLanguage() {
        this.lang = this.lang === 'en' ? 'zh-cn' : 'en';
        this.$i18n.locale = this.lang;
      },

      /**
       * 退出
       */
      signOut() {
        this.$confirm('您确定已经备份完成并退出当前账户！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '去备份',
          type: 'warning'
        }).then(() => {
          localStorage.removeItem('accountInfo');
          this.toUrl('newAddress', '', 0)
        }).catch(() => {
          this.toUrl('backupsAddress', '', 0)
        });
      },

      /**
       * 连接跳转
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

<style lang="less">
  .bottom {
    background: #FFFFFF;
    z-index: 9999;
    .pc {
      border-top: 1px solid #c1c1c1;
      height: 40px;
      position: fixed;
      bottom: 0;
      background-color: #FFFFFF;
      width: 100%;
      .info {
        padding: 0;
        line-height: 20px;
      }
    }

    .mobile {
      position: fixed;
      bottom: 0;
      width: 100%;
      ul {
        width: 100%;
        background-color: #FFFFFF;
        li {
          background-color: #FFFFFF;
          float: left;
          width: 25%;
          text-align: center;
          line-height: 35px;
          border-top: 1px solid #c1c1c1;
          font-size: 0.8rem;
        }
        .is_nav {
          color: #7db46d;
        }
      }
    }
  }
</style>

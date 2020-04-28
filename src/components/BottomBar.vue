<template>
  <el-row class="bottom w1200 font12">
    <el-row class="pc info">
      <el-col class="fl">
        <el-col>开发者：wave</el-col>
        <el-col>地址：NULSd6HgaWymKrQ7NdtWossLFzunasJzdwave</el-col>
      </el-col>
      <el-col class="fr">
        <Height>
        </Height>
      </el-col>
    </el-row>
    <el-row class="mobile">
      <ul>
        <li @click="handleSelect('home')"><i class="iconfont icon-quanbu"></i>{{$t('nav.home')}}</li>
        <li @click="handleSelect('game')"><i class="iconfont icon-dazhuanpan"></i>{{$t('nav.game')}}</li>
        <li @click="handleSelect('tool')"><i class="iconfont icon-gongju"></i>{{$t('nav.tool')}}</li>
        <li @click="handleSelect('more')"><i class="iconfont icon-gengduo"></i>{{$t('nav.more')}}</li>
      </ul>
    </el-row>
  </el-row>
</template>

<script>
  import Height from './Height.vue'
  import ElRow from "element-ui/packages/row/src/row";

  export default {
    data() {
      return {
        activeIndex: 'home',//导航选中项
        accountInfo: localStorage.hasOwnProperty('accountInfo') ? JSON.parse(localStorage.getItem('accountInfo')) : {} //账户信息
      };
    },
    created() {
      /*setInterval(() => {
        this.accountInfo = localStorage.hasOwnProperty('accountInfo') ? JSON.parse(localStorage.getItem('accountInfo')) : {};
        this.accountInfo.addresss = superLong(this.accountInfo.address, 8);
        this.accountInfo.balance = divisionDecimals(this.accountInfo.balance, 8)
      }, 500)*/
    },
    mounted() {
    },
    components: {
      ElRow,
      Height
    },
    methods: {

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
    .info {
      position: fixed;
      bottom: 0;
      background-color: #FFFFFF;
      padding: 0;
      line-height: 20px;
      height: 40px;
      width: 1200px;
    }
    .mobile {
      position: fixed;
      bottom: 0;
      width: 100%;
      ul {
        width: 100%;
        li {
          float: left;
          width: 25%;
          text-align: center;
          line-height: 35px;
          border-top: 1px solid #c1c1c1;
          font-size: 0.8rem;
        }
      }
    }
  }
</style>

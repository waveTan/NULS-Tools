<template>
  <el-row class="header">
    <el-row class="pc w1200">
      <el-col class="logo fl">
        <img class="click" @click="toUrl('home','',0)" :src="logoSvg">
      </el-col>
      <el-col class="nav fl">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="nav fl">
          <el-menu-item index="home"><i class="iconfont icon-quanbu"></i>{{$t('nav.home')}}</el-menu-item>
          <el-menu-item index="game"><i class="iconfont icon-dazhuanpan"></i>{{$t('nav.game')}}</el-menu-item>
          <el-menu-item index="tool"><i class="iconfont icon-gongju"></i>{{$t('nav.tool')}}</el-menu-item>
          <el-menu-item index="more"><i class="iconfont icon-gengduo"></i>{{$t('nav.more')}}</el-menu-item>
        </el-menu>
      </el-col>
      <el-col class="user fr font14" :class="accountInfo.address ? '':''">
        <div class="language click fr" @click="selectLanguage">{{lang === 'en' ? '中文':'En' }}</div>
        <div class="user-info fr" v-show="accountInfo.address">
          <p class="font12">{{$t('public.address')}}：{{accountInfo.address}}</p>
          <p class="font12">{{$t('public.balance')}}：{{accountInfo.balance}} NULS
            <span class="click" @click="signOut">{{$t('public.signOut')}}</span>
          </p>
        </div>
        <div class="fr">
          <div class="click fl" style="width: 50px" @click="toUrl('newAddress','',0)" v-show="!accountInfo.address">
            {{$t('nav.login')}}
          </div>
        </div>

      </el-col>
    </el-row>
    <el-row class="mobile">
      <div class="fl header_height">
        <div class="fl">
          <Height>
          </Height>
        </div>
        <div class="language click fr" @click="selectLanguage">{{lang === 'en' ? '中文':'En' }}</div>
      </div>
      <div class="fr font12 user_info" v-show="accountInfo.address">
        <h6>{{$t('public.address')}}：{{accountInfo.addresss}}</h6>
        <p>
          {{$t('public.balance')}}：{{accountInfo.balance}}
          <span class="click fr" @click="signOut">{{$t('public.signOut')}}</span>
        </p>
      </div>
      <div class="fr font12 click user_login" @click="toUrl('newAddress','',0)" v-show="!accountInfo.address">
        {{$t('nav.login')}}
      </div>

    </el-row>
  </el-row>
</template>

<script>
  import logo from '@/assets/logo.svg'
  import logoBeta from '@/assets/logo-beta.svg'
  import Height from './Height.vue'
  import {divisionDecimals, superLong} from '@/api/util.js'

  export default {
    data() {
      return {
        logoSvg: logoBeta,
        activeIndex: '1',//导航选中项
        lang: 'en',  //语言
        accountInfo: localStorage.hasOwnProperty('accountInfo') ? JSON.parse(localStorage.getItem('accountInfo')) : {} //账户信息
      };
    },
    created() {
      setInterval(() => {
        this.accountInfo = localStorage.hasOwnProperty('accountInfo') ? JSON.parse(localStorage.getItem('accountInfo')) : {};
        this.accountInfo.addresss = superLong(this.accountInfo.address, 8);
        this.accountInfo.balance = Number(divisionDecimals(this.accountInfo.balance, 8)).toFixed(3)
      }, 500)
    },
    mounted() {
    },
    components: {
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
        this.$confirm(this.$t('tips.tips22'), this.$t('tips.tips23'), {
          confirmButtonText: this.$t('tips.tips24'),
          cancelButtonText: this.$t('tips.tips25'),
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
  @import "./../assets/css/el-index";

  .header {
    border-bottom: @BD1;
    .pc {
      .logo {
        width: 100px;
        height: auto;
        margin: 10px 0 0 20px;
        img {
          width: 85px;
        }
      }
      .nav {
        width: 580px;
      }
      .user {
        line-height: 60px;
        width: 500px;
        .user-info {
          margin: 16px 0 0 0;
          p {
            line-height: 16px;
          }
        }
        .language {
          margin: 0 0 0 10px;
        }
      }
    }
    .mobile {
      .header_height {
        margin: 0 0 0 5px;
      }
      .user_info {
        margin: 5px 5px 0 0;
        line-height: 14px;
      }
      .user_login, .language {
        margin: 0.95rem 0.25rem 0 0;
        font-size: 0.7rem;
        line-height: 0.7rem;
      }
    }

  }
</style>

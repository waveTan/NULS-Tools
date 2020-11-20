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
      <el-col class="user fr font14">
        <div class="language click fr" @click="selectLanguage">{{lang === 'en' ? '中文':'En' }}</div>
        <div class="fl">
          <el-menu :default-active="rightActiveIndex" mode="horizontal" class="fl right-menu" @select="handleSelect">
            <el-submenu index="userList">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="item of accountList" :key="item.address" :index="item.address">{{item.address}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="set">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
              </template>
              <el-menu-item-group>
                <el-menu-item index="user">账号管理</el-menu-item>
                <el-menu-item index="set">系统信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          <div v-show="accountList.length ===0" class="fr font12 click user_login" @click="toUrl('newAddress','',0)">
            {{$t('nav.login')}}
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- <el-row class="mobile">
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

     </el-row>-->
  </el-row>
</template>

<script>
  import logo from '@/assets/logo.png'
  import logoBeta from '@/assets/logo.png'
  import {accountList} from '@/api/util.js'
  import {IS_RUN} from '@/config.js'

  export default {
    data() {
      return {
        logoSvg: IS_RUN ? logo : logoBeta,
        activeIndex: '1',//导航选中项
        rightActiveIndex: 'userList',//右边菜单选择
        lang: 'en',  //语言
        accountList: [],//账户列表
        currentAccount: {},//当前账户信息

      };
    },
    created() {
      this.accountList = accountList(0);
      this.currentAccount = accountList(1);
      /*console.log(this.accountList);
      console.log(this.currentAccount);*/
    },
    mounted() {
    },
    components: {
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

      //获取地址组件选择的地址信息
      changeAccountInfo() {
        if (this.$refs.selectAccount.accountInfo) {
          this.selectAddressInfo = this.$refs.selectAccount.accountInfo;
        }
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
          width: 40px;
        }
      }
      .nav {
        width: 580px;
      }
      .user {
        line-height: 60px;
        width: 220px;
        float: right;
        .user-info {
          margin: 16px 0 0 0;
          p {
            line-height: 16px;
          }
        }
        .user_login {
          margin: 22px 30px 0 0;
        }
        .language {
          margin: 0 0 0 10px;
        }
        .right-menu {
          .el-menu--horizontal {
            .el-menu--popup {
              .el-menu-item {
                min-width: auto;
              }
            }
          }
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

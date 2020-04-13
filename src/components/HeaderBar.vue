<template>
  <el-row class="header">
    <el-col :span="4" class="logo">
      <img src="./../assets/logo.png">
    </el-col>
    <el-col :span="14" class="nav">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="nav fl">
        <el-menu-item index="home"><i class="iconfont icon-quanbu"></i>{{$t('nav.home')}}</el-menu-item>
        <el-menu-item index="game"><i class="iconfont icon-dazhuanpan"></i>{{$t('nav.game')}}</el-menu-item>
        <el-menu-item index="tool"><i class="iconfont icon-gongju"></i>{{$t('nav.tool')}}</el-menu-item>
        <el-menu-item index="more"><i class="iconfont icon-gengduo"></i>{{$t('nav.more')}}</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="6" class="user font14">
      <div class="click fl" @click="toUrl('newAddress','',0)" v-if="!accountInfo.address">
        {{$t('nav.login')}}
      </div>
      <div class="user-info fl" v-else>
        <p class="font12">{{$t('public.address')}}：{{accountInfo.address}}</p>
        <p class="font12">{{$t('public.balance')}}：{{accountInfo.balance}} NULS
          <span class="click" @click="signOut">{{$t('public.signOut')}}</span>
        </p>
      </div>
      <div class="language click fl" @click="selectLanguage">{{lang === 'en' ? 'English':'简体中文' }}</div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',//导航选中项
        lang: 'en',  //语言
        accountInfo: {},
      };
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
    .logo {
      width: 150px;
      height: auto;
      margin: 10px 0 0 20px;
    }
    .nav {

    }
    .user {
      line-height: 60px;
      .user-info {
        margin: 16px 0 0 0;
        p {
          line-height: 16px;
        }
      }
      .language {
        margin: 0 0 0 50px;
      }
    }
  }
</style>

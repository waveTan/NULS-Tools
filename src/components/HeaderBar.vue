<template>
  <el-row class="header">
    <el-col :span="4" class="logo">
      <img src="./../assets/logo.png">
    </el-col>
    <el-col :span="16" class="nav">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="nav fl">
        <el-menu-item index="home"><i class="iconfont icon-quanbu"></i>全部</el-menu-item>
        <el-menu-item index="roulette"><i class="iconfont icon-dazhuanpan"></i>轮盘</el-menu-item>
        <el-menu-item index="guess"><i class="iconfont icon-jingcai"></i>竞猜</el-menu-item>
        <el-menu-item index="tool"><i class="iconfont icon-gongju"></i>工具</el-menu-item>
        <el-menu-item index="more"><i class="iconfont icon-gengduo"></i>更多</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="4" class="user font14">
      <div class="click fl">登录</div>
      <div class="language click fl" @click="selectLanguage">{{lang === 'en' ? 'English':'简体中文' }}</div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        options: [
          {value: 'zh', label: '简体中文'},
          {value: 'en', label: 'English'}
          ],
        value: 'zh',
        //语言
        lang: 'en',
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
    }
  }
</script>

<style lang="less">
  @import "./../assets/css/el-index";
  .header{
    border-bottom: @BD1;
    .logo{
      width: 150px;
      height: auto;
      margin: 10px 0 0 20px;
    }
    .nav{

    }
    .user{
      line-height: 60px;
      .language{
        margin: 0 0 0 50px;
      }
    }
  }
</style>

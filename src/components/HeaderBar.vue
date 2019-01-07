<template>
  <el-row class="header">
    <el-col :span="4" class="logo">
      <img src="./../assets/logo.png">
    </el-col>
    <el-col :span="16" class="nav">
      <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="nav fl">
        <el-menu-item index="home"><i class="iconfont icon-quanbu"></i>{{$t('nav.whole')}}</el-menu-item>
        <el-menu-item index="roulette"><i class="iconfont icon-dazhuanpan"></i>{{$t('nav.roulette')}}</el-menu-item>
        <el-menu-item index="guess"><i class="iconfont icon-jingcai"></i>{{$t('nav.guess')}}</el-menu-item>
        <el-menu-item index="tool"><i class="iconfont icon-gongju"></i>{{$t('nav.tool')}}</el-menu-item>
        <el-menu-item index="more"><i class="iconfont icon-gengduo"></i>{{$t('nav.more')}}</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="4" class="user font14">
      <div class="click fl" @click="dialogKey = true">{{$t('nav.login')}}</div>
      <div class="language click fl" @click="selectLanguage">{{lang === 'en' ? 'English':'简体中文' }}</div>
    </el-col>
    <el-dialog title="" :visible.sync="dialogKey" center width="40%">
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm">
        <el-form-item label="请输入私钥" prop="key">
          <el-input v-model="loginForm.key" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitForm('loginForm')">确 定</el-button>
        <el-button @click="dialogKey = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  //import * from 'nulsworldjs'
  import {private_key_to_public_key} from 'nulsworldjs/src/model/data.js'
  export default {
    data() {
      return {
        //导航选中项
        activeIndex: '1',
        //语言
        lang: 'en',
        //登录弹框
        dialogKey: false,
        loginForm: {
          key: ''
        },
        loginRules: {
          key: [
            {required: true, message: '请输入私钥', trigger: 'blur'}
          ],
        },

        account:null,
      };
    },
    methods: {
      async login(key) {
        console.log(key);
        //key: 00c456b9e8c261ce358d65bd4bc8f211a372319b45c55442ce4a762e0da246a5f1
        let prvbuffer = Buffer.from(key, 'hex');
        let pub = private_key_to_public_key(prvbuffer);
        console.log(pub)
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

      //提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login(this.loginForm.key);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
      .language {
        margin: 0 0 0 50px;
      }
    }
  }
</style>

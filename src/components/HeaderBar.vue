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
      <div class="click fl" @click="dialogKey = true" v-show="account.address.length < 5 ? true:false">{{$t('nav.login')}}</div>
      <div class="user-info fl" v-show="account.address.length > 5 ? true:false">
        <p class="font12">{{$t('public.address')}}：{{this.account.address}}</p>
        <p class="font12">{{$t('public.balance')}}：{{this.account.balance}} NULS &nbsp;&nbsp;&nbsp;<span class="click" @click="signOut">{{$t('public.signOut')}}</span></p>
      </div>
      <div class="language click fl" @click="selectLanguage">{{lang === 'en' ? 'English':'简体中文' }}</div>
    </el-col>
    <el-dialog title="" :visible.sync="dialogKey" center width="35%" :close-on-click-modal="false"
               :close-on-press-escape="false" :show-close="false">
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm">
        <el-form-item :label="$t('tips.tips3')" prop="key">
          <el-input v-model="loginForm.key" autocomplete="off" @change="addressInfo('loginForm')"></el-input>
        </el-form-item>
        <div v-show="account.address.length > 5 ? true:false" class="font12">{{$t('public.address')}}:{{this.account.address}} &nbsp;&nbsp;&nbsp;
          NULS:{{this.account.balance}}
        </div>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitForm('loginForm')" :disabled="account.address.length < 5 ? true:false">{{$t('public.confirm')}}
        </el-button>
        <el-button @click="closeDialogKey('loginForm')">{{$t('public.cancel')}}</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import nulsJs from 'nuls-jssdk';
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
          key: '',
        },
        loginRules: {
          key: [
            {required: true, message: this.$t('tips.tips3'), trigger: 'blur' },
            {min: 60, max: 80, message:  this.$t('tips.tips4'), trigger: ['blur', 'change'] }
          ],
        },
        chain_id: 261,
        account: {
          address: '',
          private_key: '',
          public_key: '',
          balance: 0
        },
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
       * 获取账户地址
       * @param formName
       */
      addressInfo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.loginForm.key.slice(0, 2) === '00'){
              console.log(this.loginForm.key.slice(2, this.loginForm.key.length));
              this.login(this.loginForm.key.slice(2, this.loginForm.key.length));
            }else {
              this.login(this.loginForm.key);
            }
          } else {
            this.account.address= '';
            this.account.private_key= '';
            this.account.public_key= '';
            this.account.balance=0;
            return false;
          }
        });
      },

      /**
       * 导入私钥取消
       * @param formName
       */
      closeDialogKey(formName) {
        this.$refs[formName].resetFields();
        this.account.address= '';
        this.account.private_key= '';
        this.account.public_key= '';
        this.account.balance=0;
        this.dialogKey = false;
      },

      /**
       * 确定事件
       *
       **/
      submitForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogKey = false;
      },

      /**
       *根据私钥获取账户地址及公钥
       **/
      async login(key) {
        let prvbuffer = Buffer.from(key, 'hex');
        this.account.private_key = key;
        let pub = private_key_to_public_key(prvbuffer);
        let hash = public_key_to_hash(pub, {chain_id: this.chain_id});
        let address = address_from_hash(hash);
        this.account.address = address;
        this.getBalanceByAddress(address);
        let public_key = pub.toString('hex');
        this.account.public_key = public_key;
        //console.log(this.account)
      },

      /**
       * 获取账户余额
       * Get an alias
       **/
      getBalanceByAddress(address) {
        let _this = this;
        nulsJs.getAccountByAddress({"address": address}, function (data) {
          //console.log(data);
          if(data.success){
            _this.account.balance = data.data.usable/100000000;
          }else {
            _this.account.balance = 0;
          }
        });
      }
      ,

      /*async update (address) {
        let results = await axios.get(`${api_server}addresses/stats`, {
          params: {
            addresses: address
          }
        })
      },*/

      /**
       * 退出
       */
      signOut() {
        this.account.address= '';
        this.account.private_key= '';
        this.account.public_key= '';
        this.account.balance=0;
      }
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

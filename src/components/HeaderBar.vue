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
          <el-menu :default-active="rightActiveIndex" mode="horizontal" class="fl right-menu"
                   @select="handleSelect">
            <el-submenu index="userList" v-show="accountList.length !== 0" class="user-lists">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="item of accountList" :key="item.address" :index="item.address">
                  {{item.address}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="set">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
              </template>
              <el-menu-item-group>
                <el-menu-item index="user" v-show="currentAccount.address">账号管理</el-menu-item>
                <el-menu-item index="set">系统信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
          <div v-show="accountList.length ===0" class="fr font12 click user_login"
               @click="toUrl('newAddress','',0)">
            {{$t('nav.login')}}
          </div>
        </div>
      </el-col>

      <div class="address-info" v-show="currentAccount.address">
        <div class="ad tr">
          {{currentAccount.addresss}}{{currentAccount.node}}
          <span v-if="alias">({{alias}})</span>
          <span v-else-if="currentAccount.note">({{currentAccount.note}})</span>
        </div>
        <div class="yue tr">可用：
          <font v-if="!balanceLoading">{{balance}}</font>
          <i v-else class="el-icon-loading"></i>
          <span>NULS</span>
        </div>
      </div>
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
  import {accountList, superLong, divisionDecimals, tofix} from '@/api/util.js'
  import {IS_RUN} from '@/config.js'
  import {getAddressInfoByAddress} from '@/api/requestData'

  export default {
    data() {
      return {
        logoSvg: IS_RUN ? logo : logoBeta,
        activeIndex: '1',//导航选中项
        rightActiveIndex: 'userList',//右边菜单选择
        lang: 'en',  //语言
        accountList: [],//账户列表
        currentAccount: {},//当前账户信息
        balanceLoading: true,//余额加载
        balance: 0,
        alias: '',

      };
    },
    created() {
      this.accountList = accountList(0);
      this.currentAccount = accountList(1);
    },
    mounted() {
      setInterval(() => {
        this.accountList = accountList(0);
        this.currentAccount = accountList(1);
        if (this.currentAccount.address) {
          this.currentAccount.addresss = superLong(this.currentAccount.address, 6);
        }

      }, 1000)
    },
    components: {},
    watch: {
      "currentAccount.address": async function (val, oldVal) {
        //console.log(val, oldVal);
        if (val && val !== oldVal) {
          this.balanceLoading = true;
          let resData = await this.getAddressInfo(this.currentAccount.address);
          //console.log(resData);
          if (resData.success) {
            this.alias = resData.data.alias;
            this.balance = tofix(divisionDecimals(resData.data.balance), 3, -1);
            //console.log(this.balance);
            this.balanceLoading = false;
          }
        }
      }
    },
    methods: {

      /**
       * 导航跳转
       * @param key
       **/
      handleSelect(key) {
        //console.log(key.startsWith('NULS'));
        if (key.startsWith('NULS') || key.startsWith('tNULS')) {
          let newAccountList = this.accountList;
          for (let item of newAccountList) {
            if (item.address === key) {
              this.currentAccount = item;
              item.isCurrent = true;
              localStorage.setItem('accountInfo', JSON.stringify(item));
            } else {
              item.isCurrent = false;
            }

          }
          localStorage.setItem('addressData', JSON.stringify(newAccountList));
          return;
        }
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
       * 获取地址信息
       */
      async getAddressInfo(address) {
        let addressInfo = await getAddressInfoByAddress(address);
        //console.log(addressInfo);
        if (addressInfo.success) {
          return {success: true, data: addressInfo.data}
        } else {
          return {success: false, data: addressInfo}
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

          .user-lists {

          }

        }
      }

      .address-info {
        width: 200px;
        float: right;

        .ad {
          font-size: 14px;
          margin: 0.6rem 0 0 0;
        }

        .yue {
          line-height: 1rem;
          font-size: 12px;

          span {
            color: #0ede94;
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

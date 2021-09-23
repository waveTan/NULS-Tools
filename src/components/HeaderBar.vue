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
                <div class="fl" v-loading="userLoading" element-loading-text="loading..."
                     element-loading-spinner="el-icon-loading">
                    <div class="address-info" v-if="currentAccount.address">
                        <div class="ad tr click" @click="accountDialog=true">
                            {{currentAccount.addresss}}
                        </div>
                    </div>
                    <div class="font12 click user_login" v-else @click="connectPlugin">
                        连接插件
                    </div>
                </div>
                <div class="language click fr" @click="selectLanguage">{{lang === 'en' ? '中文':'En' }}</div>
            </el-col>

        </el-row>

        <el-dialog title="" :visible.sync="accountDialog" width="500px" class="account-dialog">
            <div class="address">{{currentAccount.address}}</div>
            <div class="btns">
                <el-button @click="toUrl(currentAccount.address,'url',1)">{{$t('header.header1')}}</el-button>
                <el-button @click="copy(currentAccount.address)">{{$t('header.header2')}}</el-button>
                <el-button @click="offLink(currentAccount.address)">{{$t('header.header3')}}</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
  import logo from '@/assets/logo.png'
  import logoBeta from '@/assets/logo.png'
  import {superLong, divisionDecimals, tofix, copys} from '@/api/util.js'
  import {IS_RUN} from '@/config.js'
  import {getAddressInfoByAddress} from '@/api/requestData'

  export default {
    data() {
      return {
        logoSvg: IS_RUN ? logo : logoBeta,
        activeIndex: '1',//导航选中项
        rightActiveIndex: 'userList',//右边菜单选择
        lang: 'en',  //语言
        currentAccount: {},//当前账户信息
        balanceLoading: true,//余额加载
        balance: 0,
        alias: '',
        userLoading: true,
        accountDialog: false
      };
    },
    created() {
      setTimeout(async () => {
        if (typeof window.nabox === "undefined") {
          this.$notify.error({title: '插件检查', message: '没有发现nabox插件，请先安装nabox插件'});
          return;
        }
        let naboxInfo = await window.nabox.createSession({chain: IS_RUN ? 'tNULS' : "NULS"});
        console.log(naboxInfo[0]);
        this.userLoading = false;
        if (naboxInfo[0].startsWith('NULS') || naboxInfo[0].startsWith('tNULS')) {
          if (IS_RUN && naboxInfo[0].startsWith('NULS')) {
            this.userLoading = true;
            this.currentAccount.address = naboxInfo[0];
            this.currentAccount.addresss = superLong(this.currentAccount.address, 6);
            this.userLoading = false;
            this.naboxAccount();
          } else if (!IS_RUN && naboxInfo[0].startsWith('tNULS')) {
            this.userLoading = true;
            this.currentAccount.address = naboxInfo[0];
            this.currentAccount.addresss = superLong(this.currentAccount.address, 6);
            this.userLoading = false;
            this.naboxAccount();
          } else {
            this.offLink(naboxInfo[0])
          }
        } else {
          this.userLoading = false;
          this.$notify.error({title: '网络切换', message: '请在Nabox插件切换到NULS网络'});
        }
        this.userLoading = false;
      }, 100)
    },
    mounted() {
      setTimeout(async () => {
        this.userLoading = false;
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

      //连接nabox 插件
      async connectPlugin() {
        if (typeof window.nabox === "undefined") {
          console.log("没有方法nabox插件，请先安装nabox插件");
          return;
        }
        let naboxInfo = await window.nabox.createSession({chain: IS_RUN ? 'tNULS' : "NULS"});
        console.log(naboxInfo);
        this.userLoading = true;
        this.currentAccount.address = naboxInfo[0];
        this.currentAccount.addresss = superLong(this.currentAccount.address, 6);
        this.userLoading = false;
        this.naboxAccount();
      },

      //监听插件账户变化
      naboxAccount() {
        if (!window.nabox) {
          this.currentAccount = {};
          return
        }
        window.nabox.on("accountsChanged", (payload) => {
          //console.log(payload);
          if (payload && payload.length) {
            if (payload[0].startsWith('tNULS') || payload[0].startsWith('NULS')) {
              this.userLoading = true;
              this.currentAccount.address = payload[0];
              this.currentAccount.addresss = superLong(this.currentAccount.address, 6);
              this.userLoading = false;
            }
          } else {
            this.currentAccount = {};
          }
        });

      },

      //断开连接钱包
      async offLink(address) {
        //console.log(address);
        this.currentAccount = {};
        this.accountDialog = false;
        let resData = await window.nabox.offLink({address: address, chain: "NULS"});
        console.log(resData);
      },

      /**
       * 复制方法
       * @param sting
       **/
      copy(sting) {
        copys(sting);
        this.$message({message: this.$t('public.copySuccess'), type: 'success', duration: 2000});
        this.accountDialog = false;
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
          let url = IS_RUN ? 'http://beta.nulscan.io/address/info?address=' : 'https://nulscan.io/address/info?address=';
          window.open(url + urlName)
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

                .address-info {
                    width: 150px;
                    .ad {
                        font-size: 14px;
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

        .account-dialog {
            .el-dialog {
                .el-dialog__header {
                    .el-dialog__headerbtn {
                        top: 5px;
                        right: 5px;
                    }
                }
                .el-dialog__body {
                    padding: 10px 5px;
                    .address {
                        padding: 10px 5px;
                        border-radius: 5px;
                        background-color: #f1f1f1;
                        margin: 0 0 20px 0;
                        font-size: 13px;
                        height: 80px;
                    }
                    .btns {
                        text-align: center;
                        padding: 0 0 20px 0;
                        .el-button {
                            width: 100px;
                            .span {
                                color: #000000 !important;
                            }
                        }
                    }
                }
            }

        }

    }
</style>

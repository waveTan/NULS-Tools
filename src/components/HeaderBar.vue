<template>
    <div class="header">
        <div class="pc w1200">
            <div class="logo fl">
                <img class="click" @click="toUrl('home','',0)" :src="logoSvg">
            </div>
            <div class="nav fl">
                <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="nav fl">
                    <el-menu-item index="home"><i class="iconfont icon-quanbu"></i>{{$t('nav.home')}}</el-menu-item>
                    <el-menu-item index="game"><i class="iconfont icon-dazhuanpan"></i>{{$t('nav.game')}}</el-menu-item>
                    <el-menu-item index="tool"><i class="iconfont icon-gongju"></i>{{$t('nav.tool')}}</el-menu-item>
                    <el-menu-item index="more"><i class="iconfont icon-gengduo"></i>{{$t('nav.more')}}</el-menu-item>
                </el-menu>
            </div>
            <div class="user fr font14">
                <div v-show="accountList.length ===0" class="fl font12 click user_login"
                     @click="toUrl('newAddress','',0)">
                    连接插件
                </div>
                <div class="language font12 click fl" @click="selectLanguage">{{lang === 'en' ? '中文':'En' }}</div>
            </div>

            <!--<div class="address-info" v-show="currentAccount.address">
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
            </div>-->
        </div>
        <div class="cb"></div>
    </div>
</template>

<script lang="ts">
    import {ref, defineComponent} from 'vue'
    import logo from './../assets/logo.png'

    export default defineComponent({
        name: 'HeaderBar',
        setup: () => {
            const logoSvg = logo;
            const activeIndex = '1';//导航选中项
            const rightActiveIndex = 'userList';//右边菜单选择
            const lang = 'en'; //语言
            const accountList = [];//账户列表
            const currentAccount = {};//当前账户信息

            return {logoSvg, activeIndex, rightActiveIndex, lang, accountList, currentAccount}
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
                this.lang = this.lang === 'en' ? 'cn' : 'en';
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
    })
</script>

<style lang="scss">
    .header {
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
    }
</style>
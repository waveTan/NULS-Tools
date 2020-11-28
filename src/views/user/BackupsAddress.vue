<template>
    <div class="backups-address bg-gray">
        <div class="bg-white">
            <h3 class="title tc">{{$t('backupsAddress.backupsAddress0')}}</h3>
        </div>
        <div class="bg-white w1200">
            <div class="address w630">
                <p class="info mt_20 mb_20 pt_20">
                    {{$t('backupsAddress.backupsAddress1')}}
                    <span class="yellow">{{accountAddress.address}}</span>
                    &nbsp;<i class="el-icon-document-copy click" @click="copy(accountAddress.address)"></i>
                </p>
            </div>
            <div class="tips w630">
                <p class="sub_info pl_20"><i></i> {{$t('backupsAddress.backupsAddress2')}}</p>
                <p class="sub_info pl_20"><i></i> {{$t('backupsAddress.backupsAddress3')}}</p>
            </div>

            <div class="w630 tc btn-next">
                <div class="btn">
                    <el-button type="success " @click="backupsKeyStore">{{$t('backupsAddress.backupsAddress41')}}
                    </el-button>
                </div>
                <div class="btn">
                    <el-button type="success" @click="backupsKey">{{$t('backupsAddress.backupsAddress4')}}</el-button>
                </div>
                <div class="btn">
                    <el-button @click="toUrl('user')"> {{$t('backupsAddress.backupsAddress5')}}</el-button>
                </div>
            </div>
        </div>
        <Password ref="password" @passwordSubmit="passSubmit">
        </Password>
        <el-dialog :title="$t('backupsAddress.backupsAddress6')" width="40%" class="backups-info"
                   :visible.sync="keyDialog"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
        >
            <span></span>
            <p class="bg-white">
                {{accountAddress.pri}}
            </p>
            <span slot="footer" class="dialog-footer tc">
        <el-button type="success" @click="copy(accountAddress.pri)">{{$t('public.copySuccess')}}</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    import Password from '@/components/PasswordBar'
    import {copys, accountList} from '@/api/util'
    import {passwordVerification} from '@/api/requestData'

    export default {
        components: {Password},
        data() {
            return {
                accountAddress: {},
                keyDialog: false, //key弹框
                backupsType: 0,// 备份类型 0:keystore 1:key
            };
        },
        created() {
            if (this.$route.query.address) {
                for (let item of accountList(0)) {
                    if (item.address === this.$route.query.address) {
                        this.accountAddress = item
                    }
                }
            } else {
                this.accountAddress = accountList(1);
            }
        },
        methods: {

            /**
             *  获取密码框的密码
             * @param password
             **/
            async passSubmit(password) {
                let isPassword = await passwordVerification(this.accountAddress, password);
                if (!isPassword.success) {
                    this.$message({message: this.$t('tips.tips4'), type: 'error', duration: 3000});
                    return;
                }
                if (this.backupsType === 0) {
                    let FileSaver = require('file-saver');
                    let fileInfo = {
                        address: isPassword.address,
                        encryptedPrivateKey: isPassword.aesPri,
                        pubKey: isPassword.pub,
                        priKey: null
                    };
                    let blob = new Blob([JSON.stringify(fileInfo)], {type: "text/plain;charset=utf-8"});
                    FileSaver.saveAs(blob, isPassword.address + ".keystore");
                } else {
                    this.keyDialog = true;
                    this.accountAddress.pri = isPassword.pri;
                }
            },

            /**
             *  备份私钥
             **/
            backupsKey() {
                this.backupsType = 1;
                this.$refs.password.showPassword(true);
            },

            /**
             * @disc: 备份keystore
             * @date: 2019-10-12 14:24
             * @author: Wave
             */
            backupsKeyStore() {
                try {
                    let isFileSaverSupported = !!new Blob;
                    if (isFileSaverSupported) {
                        this.backupsType = 0;
                        this.$refs.password.showPassword(true);
                    }
                } catch (e) {
                    this.$message({message: this.$t('tips.tips7'), type: 'error', duration: 3000});
                    console.log(e);
                }
            },

            /**
             * 连接跳转
             * @param name
             */
            toUrl(name) {
                this.$router.push({
                    name: name,
                })
            },

            /**
             * 复制方法
             * @param sting
             **/
            copy(sting) {
                copys(sting);
                this.$message({message: this.$t('public.copyComplete'), type: 'success', duration: 1000});
            },
        }
    }
</script>

<style lang="less">
    @import "./../../assets/css/style";

    .backups-address {
        background-color: #ffffff;

        .bg-white {
            .title {
                margin: 20px auto 10px;
                font-size: 30px;
                @media screen and (max-width: 1024px) {
                    margin: 0 auto;
                    line-height: 1.8rem;
                }
            }
        }

        .address {
            margin: 20px auto 0;
            font-size: 18px;
            @media screen and (max-width: 1024px) {
                margin: 1rem 0 0 0;
                font-size: 0.8rem;
            }
        }

        .tips {
            margin: 40px auto;
            padding: 20px 30px;
            background-color: #c0c4cc;
            @media screen and (max-width: 1024px) {
                padding: 1rem 0.8rem;
                width: 100%;
            }

            p {
                line-height: 24px;
                @media screen and (max-width: 1024px) {
                    font-size: 0.7rem;
                    word-wrap: break-word;
                }

                i {
                    width: 5px;
                    height: 5px;
                    display: block;
                    float: left;
                    margin: 9px 10px 0 0;
                    border-radius: 5px;
                    background: #000000;
                }
            }
        }

        .backups-info {
            .el-dialog {
                background-color: #F5F6F9 !important;

                .el-dialog__footer {
                    text-align: center;
                }
            }

            p {
                height: 5rem;
                font-size: 0.7rem;
            }
        }
    }

    .btn-next {
        .btn {
            margin: 20px 0 20px 0;

            .el-button {
                width: 280px;
            }
        }

        @media screen and (max-width: 1024px) {
            width: 100%;
            .btn {
                .el-button {
                    width: 14rem;
                }
            }
        }
    }

</style>

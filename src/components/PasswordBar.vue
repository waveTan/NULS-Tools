<template>
  <el-dialog :title="$t('tips.password0')" :visible.sync="passwordVisible" top="30vh" :width="width"
             class="password-dialog"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             @open="passwordShow"
             @close="passwordClose">
    <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" @submit.native.prevent>
      <el-form-item prop="password">
        <el-input v-model="passwordForm.password" type="password" :maxlength="22" ref="inpus"
                  @keyup.enter.native="enterSubmit('passwordForm')">
        </el-input>
      </el-form-item>
    </el-form>
    <el-checkbox v-if="isShowKeep" v-model="keepRadio">
      <span>记住密码</span>
    </el-checkbox>
    <div slot="footer" class="dialog-footer">
      <el-button @click="passwordClose">{{$t('public.cancel')}}</el-button>

      <el-button :type="isDisabled ? 'info': 'success'" @click="dialogSubmit('passwordForm')" :disabled="isDisabled"
                 id="passwordInfo">
        <span> {{disabledInfo}}</span>
      </el-button>
    </div>
  </el-dialog>
</template>

<script>

  import {IsPC, accountList} from '@/api/util'

  export default {
    props: {
      isTime: {
        type: Boolean,
        default: false
      },
    },
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('tips.password0')))
        } else {
          callback()
        }
      };
      return {
        addressList: [],//账户列表
        addressInfo: {},//账户信息
        passwordVisible: false,
        passwordForm: {
          password: '',
        },
        passwordRules: {
          password: [
            {validator: validatePass, trigger: ['blur', 'change']}
          ]
        },
        isShowKeep: false,//是否显示记住密码
        keepRadio: false,//是否记住密码
        timeLag: 300000,//时差
        width: IsPC() ? '35%' : '95%',
        isDisabled: false,
        disabledValue: 0,
        disabledInfo: '',
      }
    },
    created() {
      if (process.env.NODE_ENV !== 'production') {
        //this.passwordForm.password = 'nuls123456'
      }
    },
    mounted() {
    },
    watch: {
      passwordVisible(val) {
        if (val) {
          setTimeout(() => {
            this.$refs['inpus'].focus()
          }, 200)
        }
      }
    },
    methods: {

      /**
       * 回车提交
       * @param formName
       */
      enterSubmit(formName) {
        if (this.passwordForm.password) {
          this.dialogSubmit(formName);
        }
      },
      passwordClose() {
        this.$refs['passwordForm'].resetFields();
        this.passwordVisible = false;
        this.timeLag = 300000;
        this.keepRadio = false;
      },
      showPassword(boolean, address) {
        //console.log(address);
        this.addressList = accountList(0);
        if (address) {
          this.isShowKeep = true;
          this.addressInfo = this.addressList.filter(obj => obj.address === address)[0];
          if (this.addressInfo.password) {
            this.passwordForm.password = this.addressInfo.password;
            this.keepRadio = true;
            this.disabledValue = 3;
            this.isDisabled = true;
            this.disabledInfo = "合约参数验证中:" + this.disabledValue;
            let interval = setInterval(() => {
              this.disabledValue = this.disabledValue - 1;
              this.disabledInfo = "合约参数验证中:" + this.disabledValue;
              if (this.disabledValue === 0) {
                clearInterval(interval);
                this.isDisabled = false;
                this.disabledInfo = this.$t('public.confirm')
              }
            }, 1000);
          }else{
            this.isShowKeep = true;
            this.isDisabled = false;
            this.disabledInfo = this.$t('public.confirm')
          }
        } else {
          this.isShowKeep = false;
          this.isDisabled = false;
          this.disabledInfo = this.$t('public.confirm')
        }
        this.passwordVisible = boolean;

      },
      //弹出密码输入框
      dialogSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.keepRadio) {
              //if (this.keepRadio && !this.addressInfo.keepStart) {
              //let keepStart = new Date().getTime();
              for (let item of this.addressList) {
                if (item.address === this.addressInfo.address) {
                  //item.keepStart = keepStart;
                  item.password = this.passwordForm.password;
                }
              }
            } else {
              for (let item of this.addressList) {
                if (item.address === this.addressInfo.address) {
                  item.password = '';
                }
              }
            }
            //console.log(this.addressList);
            localStorage.setItem('addressData', JSON.stringify(this.addressList));
            this.$emit('passwordSubmit', this.passwordForm.password);
            this.passwordVisible = false;
          } else {
            return false
          }
        })
      },
    }
  }
</script>

<style lang="less">
  .password-dialog {
    .el-dialog {
      width: 370px;
      .el-dialog__header {
        padding: 10px;
        line-height: 26px;
        background-color: #F5F6F9 !important;
        border-color: #c8c7cc;
        .el-dialog__headerbtn {
          width: 20px;
          height: 20px;
          top: -10px;
          right: -10px;
          border-radius: 10px;
        }
      }
      .el-dialog__body {
        background-color: #F5F6F9 !important;
        padding: 30px 20px 30px 20px !important;
        .el-form {
          .el-form-item {
            .el-form-item__label {
              line-height: 0;
              padding: 28px 0 20px 0;
            }
          }
        }
      }
      .el-dialog__footer {
        text-align: center;
        background-color: #F5F6F9 !important;
        line-height: 30px;
        .dialog-footer {
          padding: 1rem 1rem 0.1rem;
          .el-button {
            width: 9.5rem;
          }
          .el-button--success {
            span {
              color: white;
            }
          }
        }
      }
    }
  }
</style>

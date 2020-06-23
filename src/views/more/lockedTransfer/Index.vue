<template>
  <div class="w630 transfer" v-loading="lockedLoading">
    <div class="title tc">{{$t('locking.locking0')}}</div>
    <el-form :model="transferForm" status-icon :rules="transferRules" ref="transferForm" class="transfer_form">
      <el-form-item :label="$t('locking.locking1')">
        <el-input v-model="transferForm.fromAddress" disabled="disabled">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('locking.locking2')">
        <el-input v-model="transferForm.assets" disabled="disabled">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('locking.locking3')" prop="toAddress">
        <el-input v-model="transferForm.toAddress">
        </el-input>
      </el-form-item>
      <div class="fyellow font12" style="margin: -18px 0 0 0" v-show="transferForm.time">
        {{$t('locking.locking4')}}
      </div>
      <el-form-item :label="$t('locking.locking5')" prop="amount">
        <el-input v-model="transferForm.amount">
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('locking.locking6')" prop="time" class="locked_time">
        <el-date-picker v-model="transferForm.time" type="datetime" :placeholder="$t('locking.locking7')"
                        value-format="timestamp"
                        :picker-options="expireTimeOption">>
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('locking.locking8')">
        <el-input type="textarea" v-model="transferForm.remarks" :rows="3" maxlength="200" show-word-limit>
        </el-input>
      </el-form-item>
      <div class="font14"><label>{{$t('locking.locking9')}}</label>{{transferForm.fee}} <span class="fCN">NULS</span>
      </div>
      <el-form-item class="tc">
        <el-button type="success" @click="submitForm('transferForm')">{{$t('locking.locking10')}}</el-button>
      </el-form-item>
    </el-form>

    <el-dialog :title="$t('locking.locking11')" center :width="dialogWidth" class="dialog"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :visible.sync="dialogVisible">
      <div class="info">
        <ul>
          <li><span>{{$t('locking.locking1')}}</span><font>{{transferForm.fromAddress}}</font></li>
          <li><span>{{$t('locking.locking3')}}</span><font>{{transferForm.toAddress}}</font></li>
          <li><span>{{$t('locking.locking5')}}</span><font class="fW600">{{transferForm.amount}}</font>&nbsp;<font
                  class="fCN">NULS</font></li>
          <li><span>{{$t('locking.locking9')}}</span><font>{{transferForm.fee}}</font>&nbsp;<font
                  class="fCN">NULS</font></li>
          <li v-show="transferForm.time"><span>{{$t('locking.locking6')}}</span><font class="fred">{{transferForm.times}}</font>
          </li>
          <li class="cb"><span>{{$t('locking.locking8')}}</span><font>{{transferForm.remarks}}</font></li>
        </ul>
      </div>
      <div slot="footer" class="dialog-footer cb">
        <el-button @click="cancelDialog">{{$t('public.cancel')}}</el-button>
        <el-button type="success" @click="confirmDialog">{{$t('public.confirm')}}</el-button>
      </div>
    </el-dialog>

    <Password ref="password" @passwordSubmit="lockedPassSubmit">
    </Password>
  </div>
</template>

<script>
  import nuls from 'nuls-sdk-js'
  import moment from 'moment'
  import {chainInfo} from '@/config'
  import {
    Plus,
    timesDecimals,
    getLocalTime,
    connectToExplorer,
    IsPC,
    htmlEncodeByRegExp
  } from '@/api/util'
  import {
    passwordVerification, getBalanceOrNonceByAddress, inputsOrOutputs, validateAndBroadcast
  } from '@/api/requestData'
  import Password from '@/components/PasswordBar'

  export default {
    data() {
      let validateToAddress = async (rule, value, callback) => {
        let addressInfo = {right: false};
        if (20 < value.length && value.length < 60) {
          addressInfo = await nuls.verifyAddress(value);
        }

        if (!value) {
          return callback(new Error(this.$t('locking.locking12')));
        } else if (!addressInfo.right && addressInfo.chainId !== chainInfo.chainId) {
          return callback(new Error(this.$t('locking.locking13')));
        } else {
          callback();
        }
      };
      let validateAmount = (rule, value, callback) => {
        let patrn = new RegExp("^([1-9][\\d]{0,20}|0)(\\.[\\d]{1,8})?$");
        if (value === '') {
          callback(new Error(this.$t('locking.locking14')));
        } else if (!patrn.exec(value)) {
          callback(new Error(this.$t('locking.locking15')))
        } else {
          callback();
        }
      };
      return {
        accontInfo: localStorage.hasOwnProperty('accountInfo') ? JSON.parse(localStorage.getItem('accountInfo')) : {}, //账户信息
        transferForm: {
          fromAddress: '',
          toAddress: '',
          assets: 'NULS',
          amount: '',
          time: '',
          remarks: '',
          fee: 0.001
        },
        transferRules: {
          toAddress: [
            {validator: validateToAddress, trigger: ['blur', 'change']}
          ],
          amount: [
            {validator: validateAmount, trigger: ['blur', 'change']}
          ]
        },
        //限制只能选取今天以后的时间
        expireTimeOption: {
          disabledDate(date) {
            return date.getTime() <= Date.now();
          }
        },
        dialogVisible: false,//确认框
        dialogWidth: '98%',//弹框宽度
        lockedLoading: false,//加载动画
      };
    },
    created() {
      this.transferForm.fromAddress = this.accontInfo.address;
      this.dialogWidth = IsPC() ? '35rem' : '98%'
    },
    mounted() {
    },
    components: {
      Password
    },
    methods: {

      /**
       * @disc: 下一步
       * @params: formName
       * @date: 2020-06-23 14:03
       * @author: Wave
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.transferForm.times = moment(getLocalTime(this.transferForm.time)).format('YYYY-MM-DD HH:mm:ss');
            this.dialogVisible = true;
          } else {
            return false;
          }
        });
      },

      /**
       * @disc: 取消转账 弹框
       * @date: 2020-06-23 14:05
       * @author: Wave
       */
      cancelDialog() {
        this.dialogVisible = false
      },

      /**
       * @disc: 确定转账 弹框
       * @date: 2020-06-23 14:06
       * @author: Wave
       */
      confirmDialog() {
        this.$refs.password.showPassword(true);
      },

      /**
       * @disc: 输入密码开始转账
       * @params: password
       * @date: 2019-09-02 10:49
       * @author: Wave
       */
      async lockedPassSubmit(password) {
        let newAccountInfo = await passwordVerification(this.accontInfo, password);
        if (!newAccountInfo.success) {
          this.$message({message: this.$t('tips.tips4'), type: 'error', duration: 3000});
          return;
        }
        this.dialogVisible = false;
        this.lockedLoading = true;

        let transferInfo = this.transferForm;
        transferInfo.amount = Number(timesDecimals(transferInfo.amount, 8));
        transferInfo.fee = Number(timesDecimals(transferInfo.fee, 8));
        transferInfo.assetsChainId = chainInfo.chainId;
        transferInfo.assetsId = chainInfo.assetsId;

        let balanceInfo = await getBalanceOrNonceByAddress(newAccountInfo.address, chainInfo.chainId, chainInfo.assetsId);
        //console.log(balanceInfo);
        let minValue = Number(Plus(transferInfo.amount, transferInfo.fee));
        transferInfo.minValue = minValue;
        if (balanceInfo.success && balanceInfo.data.balance < minValue) {
          this.$message({message: this.$t('tips.tips20'), type: 'error'});
          return {success: false}
        }

        //交易组装
        let inOrOutputs = await inputsOrOutputs(transferInfo, balanceInfo, 2);
        //console.log(inOrOutputs);

        let tAssemble = await nuls.transactionAssemble(inOrOutputs.data.inputs, inOrOutputs.data.outputs, htmlEncodeByRegExp(transferInfo.remarks), 2);
        //console.log(tAssemble);
        let txhex = await nuls.transactionSerialize(newAccountInfo.pri, newAccountInfo.pub, tAssemble);
        //console.log(txhex);
        //验证并广播交易
        let validateTxhex = await validateAndBroadcast(txhex);
        //console.log(validateTxhex);
        if (!validateTxhex.success) {
          this.$message({
            message: this.$t('tips.tips14') + JSON.stringify(validateTxhex.data),
            type: 'error',
            duration: '3000'
          });
        } else {
          this.$refs.transferForm.resetFields();
          this.transferForm.remarks = '';
          this.lockedLoading = false;
          this.$message({
            dangerouslyUseHTMLString: true,
            message: this.$t('tips.tips15') + " txHash:<a class='fyellow'>" + validateTxhex.hash + "</a>",
            type: 'success',
            duration: '2000'
          });
          //this.$message({message: this.$t('tips.tips15'), type: 'success', duration: '2000'});
        }
      },

      /**
       * @disc: 连接跳转
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
          let newUrl = connectToExplorer(urlName, parameter);
          window.open(newUrl)
        }
      },
    }
  }
</script>

<style lang="less">
  .transfer {
    @media screen and (max-width: 1000px) {
      width: 95%;
    }
    .title {
      font-size: 20px;
      @media screen and (max-width: 1000px) {
        font-size: 1rem;
        padding: 0.5rem 1rem 0;
        line-height: 2rem;
        height: 3rem;
      }
    }
    .transfer_form {
      margin: 2rem 0 0 0;
      @media screen and (max-width: 1000px) {
        margin: 1rem 0 0 0;
      }
      .el-form-item {
        margin: 0 0 1.2rem 0;
        .el-form-item__label {
          line-height: 1.4rem;
        }
        .el-form-item__content {
          line-height: 1.8rem;
          .el-input {
            .el-input__inner {
              height: 1.8rem;
              line-height: 1.8rem;
            }
            .el-input__suffix {
              .el-input__icon {
                line-height: 1.8rem;
              }
            }
          }
          .el-form-item__error {
            padding: 1px 0 0 0;
          }
          .el-button {
            width: 20rem;
            margin: 2rem auto 0;
          }
        }
      }
      .locked_time {
        .el-date-editor {
          width: 630px;
          @media screen and (max-width: 1000px) {
            width: 100%;
          }
          .el-input__prefix {
            .el-input__icon {
              line-height: 1.8rem;
            }
          }
        }
      }
    }
    .dialog {
      .el-dialog {
        .el-dialog__header {
          border-bottom: 1px solid #c1c1c1;
          text-align: left;
          .el-dialog__headerbtn {
            top: -10px;
            right: -10px;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background-color: #ffffff;
          }
        }
        .el-dialog__body {
          .info {
            ul {
              li {
                line-height: 30px;
                font-size: 14px;
                span {
                  display: block;
                  float: left;
                  width: 130px;
                  text-align: right;
                  @media screen and (max-width: 1000px) {
                    width: 5rem;
                    font-size: 0.6rem;
                  }
                }
                font {
                  @media screen and (max-width: 1000px) {
                    font-size: 0.6rem;
                  }
                }
              ;
              }
            }
          }
        }
        .el-dialog__footer {
          .dialog-footer {
            .el-button--success {
              margin-left: 5rem;
              @media screen and (max-width: 1000px) {
                margin-left: 0.5rem;
              }
            }
          }
        }
      }
    }
  }
</style>

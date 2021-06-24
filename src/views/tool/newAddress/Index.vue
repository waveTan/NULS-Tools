<template>
  <div class="w1200 new_address">
    <div class="title tc">可定义后缀的地址生成器</div>
    <div class="fyellow font12" style="line-height: 20px">
      注意：1、后缀地址越长生成时间越久。2、生成的私钥保存在当前页面离开当前页面就会清空。3、此工具可以断网操作。
    </div>
    <div class="fl new">
      <el-form :model="addressForm" status-icon :rules="addressRules" ref="addressForm">
        <el-form-item label="地址类型">
          <el-select v-model="addressForm.type">
            <el-option label="NULS" value=1>
            </el-option>
            <el-option label="NVT" value=9>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生成数量">
          <el-select v-model="addressForm.number">
            <el-option v-for="item in 10" :key="item" :label=item :value=item>
            </el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="addressForm.pass" placeholder="用于生成后的私钥" autocomplete="off">
          </el-input>
        </el-form-item>-->
        <el-form-item
                v-for="(domain, index) in addressForm.postfixList"
                :label="'后缀' + index"
                :key="domain.key"
                :prop="'postfixList.' + index + '.value'"
                :rules="{required: true, message: '后缀不能为空', trigger: 'blur'}"
        >
          <el-input v-model="domain.value" placeholder="后缀1-5位最好生成，超过5位就看人品了">
          </el-input>
          <div class="fr icon">
            <i class="el-icon-circle-plus-outline click" @click="addDomain" v-show="index.toString()==='0'"></i>
            <i class="el-icon-remove-outline click" @click.prevent="removeDomain(domain)"
               v-show="index.toString()!=='0'"></i>
          </div>
        </el-form-item>
        <el-form-item class="tc">
          <el-button type="success" @click="submitForm('addressForm')">开始生成地址</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="fr addressInfo">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="'匹配地址'+okNewList.length" name="first">
          <div class="scroll">
            <div class="info" v-for="(item,index) in okNewList" :key="index">
              <p>编号:{{index}}</p>
              <p>地址:<span>{{item.address}}</span></p>
              <p v-show="addressForm.pass ===''">私钥:<span class="click" @click="copy(item.pri)">{{item.pri}}</span></p>
              <p v-show="addressForm.pass !==''">加密私钥:<span class="click"
                                                            @click="copy(item.aesPri)">{{item.aesPri}}</span></p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'不匹配地址'+newList.length" name="second">
          <div class="scroll">
            <div class="info" v-for="(item,index) in newList" :key="index">
              <p>编号:{{index}}</p>
              <p>地址:{{item.address}}</p>
              <p v-show="addressForm.pass ===''">私钥:<span>{{item.pri}}</span></p>
              <p v-show="addressForm.pass !==''">加密私钥:<span>{{item.aesPri}}</span></p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
  import nuls from 'nuls-sdk-js'
  import {copys} from './../../../api/util'

  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        callback();
      };
      return {
        addressForm: {
          type: '1',
          number: 1,
          pass: '',
          postfixList: [
            {value: ''}
          ],
        },
        addressRules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
        },
        activeName: 'first',

        newList: [],//不匹配的地址列表
        okNewList: [],//匹配的地址列表
        newSetTimeout: null,

      };
    },
    //离开当前页面后执行
    destroyed() {
      clearInterval(this.newSetTimeout);
    },
    methods: {

      /**
       * @disc:减少后缀
       * @params:
       * @date: 2020-07-13 14:10
       * @author: Wave
       */
      removeDomain(item) {
        let index = this.addressForm.postfixList.indexOf(item);
        if (index !== -1) {
          this.addressForm.postfixList.splice(index, 1)
        }
      },

      /**
       * @disc: 添加后缀
       * @params:
       * @date: 2020-07-13 14:11
       * @author: Wave
       */
      addDomain() {
        this.addressForm.postfixList.push({
          value: '',
          key: Date.now()
        });
      },

      /**
       * @disc: 开始生成地址
       * @params:
       * @date: 2020-07-13 14:11
       * @author: Wave
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.newList = [];
            this.okNewList = [];
            clearInterval(this.newSetTimeout);
            this.newAddress(this.addressForm.type, this.addressForm.pass, this.addressForm.postfixList, this.addressForm.number)
          } else {
            return false;
          }
        });
      },

      /**
       * @disc: 生成地址方法
       * @params: type 类型（1：nuls 9 nvt）
       * @params: passWord 密码
       * @params: postfixList 后缀列表
       * @params: number 生成数量
       * @date: 2020-07-13 14:19
       * @author: Wave
       */
      newAddress(type, passWord, postfixList, number) {
        const newAddress = nuls.newAddress(Number(type), passWord, type === '1' ? 'NULS' : "NERVE");
        //console.log(newAddress);
        this.newList.push(newAddress);
        //console.log(postfixList);
        for (let item of postfixList) {
          if (item.value) {
            let lans = newAddress.address.slice(-item.value.length).toLowerCase();
            if (lans === item.value) {
              this.okNewList.push(newAddress);
            }
          } else {
            this.okNewList.push(newAddress);
          }
        }
        if (this.okNewList.length < number) {
          this.newSetTimeout = setTimeout(() => {
            this.newAddress(type, passWord, postfixList, number)
          }, 1000);
        }
      },

      /**
       * 复制方法
       * @param sting
       **/
      copy(sting) {
        copys(sting);
        this.$message({message: this.$t('public.copySuccess'), type: 'success', duration: 1000});
      },
    }
  }
</script>

<style lang="scss">
  .new_address {
    .new {
      width: 35%;
      margin: 40px 0 0 0;
      .el-form {
        width: 90%;
        .el-form-item {
          margin: 0 0 20px 0;
          .el-form-item__label {
            line-height: 20px;
          }
          .el-form-item__content {
            .el-select {
              .el-input {
                width: 378px;
                .el-input__inner {
                }
              }
            }
            .el-input {
              .el-input__inner {
                border-radius: 2px;
                line-height: 30px;
                height: 30px;
              }
            }
            .icon {
              position: absolute;
              i {
                font-size: 20px;
              }
            }
          }
        }
      }
    }
    .addressInfo {
      width: 65%;
      margin: 40px 0 0 0;
      .scroll {
        max-height: 500px;
        overflow-x: auto;
        .info {
          font-size: 12px;
          margin: 5px 0;
          p {
            span {
              font-size: 13px;
            }
          }
        }
      }

    }
  }
</style>

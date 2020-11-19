<template>
  <div class="bg-gray cb user-list">
    <div class="pc w1200">
      <h3 class="title tc">账户管理</h3>
      <div class="w1400">
        <div class="top_ico">
          <i class="el-icon-plus click" @click="toUrl('newAddress')"></i>
        </div>
        <el-table :data="addressList" stripe border>
          <el-table-column prop="address" label="地址" align="center" min-width="335">
          </el-table-column>
          <el-table-column :label="$t('public.alias')" align="center" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.total }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="balance" label="可用余额" align="center" width="150">
          </el-table-column>
          <!-- <el-table-column prop="consensusLock" :label="$t('tab.tab3')" align="center" width="140">
           </el-table-column>-->
          <!-- <el-table-column label="别名" align="center">
             <template slot-scope="scope">
               <span v-show="scope.row.alias">{{scope.row.alias}}</span>
               <span v-show="!scope.row.alias" @click="addAlias(scope.row)">
                 <i class="el-icon-edit-outline click"></i>
               </span>
             </template>
           </el-table-column>
           <el-table-column label="备注" align="center">
             <template slot-scope="scope">
               <span v-show="scope.row.remark !=='' " @click="editRemark(scope.row)"
                     class="click">{{scope.row.remark}}</span>
               <span v-show="scope.row.remark ==='' " @click="editRemark(scope.row)">
                 <i class="el-icon-edit-outline click"></i>
               </span>
             </template>
           </el-table-column>-->
          <el-table-column label="操作" align="center" width="370">
            <template slot-scope="scope">
              <label class="click tab_bn" @click="editPassword(scope.row)">修改密码</label>
              <span class="tab_line">|</span>
              <label class="click tab_bn" @click="backAddress(scope.row)">备份</label>
              <span class="tab_line">|</span>
              <label class="click tab_bn" @click="deleteAddress(scope.row)">移除</label>
              <span class="tab_line">|</span>
              <el-link disabled v-if="scope.row.isItem">进入</el-link>
              <label class="click tab_bn" @click="selectionAddress(scope.row)" v-else>进入</label>
            </template>
          </el-table-column>
        </el-table>
        <div class="pages">
          <div class="page-total">共 {{addressList.length}}</div>
        </div>
      </div>
    </div>

    <!-- <div class="mobile bg">
       <div class="bg3">
         <BackBar :isBackIcon="isBackIcon" :rightTitle="rightTitle">
         </BackBar>

         <div class="addrss-list">
           <SelectAddress :shortAddress="isShort" ref="selectAccount">
           </SelectAddress>
         </div>

         <ul class="lis">
           <li @click="toUrl('newAddress','')">{{$t('newAddress.newAddress2')}} <i class="el-icon-arrow-right"></i></li>
           <li @click="toUrl('newAddress','')">{{$t('address.address14')}} <i class="el-icon-arrow-right"></i></li>
           <li @click="toUrl('backupsAddress','')">{{$t('address.address15')}} <i class="el-icon-arrow-right"></i></li>
           <li @click="toUrl('backupsAddress','')" class="last">{{$t('address.address16')}} <i
                   class="el-icon-arrow-right"></i></li>
           <li @click="deleteAddress" class="remove">{{$t('address.address17')}} <i class="el-icon-arrow-right"></i></li>
           <li @click="cleanAll" class="remove">{{$t('address.address18')}} <i class="el-icon-arrow-right"></i></li>
         </ul>
       </div>

     </div>-->

    <Password ref="password" @passwordSubmit="passSubmit">
    </Password>
  </div>
</template>

<script>
  import nuls from 'nuls-sdk-js'
  import Password from '@/components/PasswordBar'
  import {timesDecimals, Plus, accountList, passwordVerification} from '@/api/util'
  import SelectAddress from '@/components/mobile/SelectAddress'
  import BackBar from '@/components/mobile/BackBar'

  export default {
    data() {
      return {
        isBackIcon: true,//back 返回icon显示
        rightTitle: this.$t('address.address13'),//back title
        addressList: [],//地址列表
        selectAddressInfo: '', //操作的地址信息
        remarkDialog: false,//备注弹框
        remarkInfo: '',//备注信息
        prefix: 'TNVT',//地址前缀
        isShort: false,
      };
    },
    components: {
      Password, SelectAddress, BackBar
    },
    created() {
      this.addressList = accountList(0);
      this.selectAddressInfo = accountList(1);
    },
    mounted() {
      setTimeout(() => {
        this.getAddressList();
        this.getAddressLists(this.addressList);
      }, 600);
    },
    methods: {

      //获取地址组件选择的地址信息
      changeAccountInfo() {
        if (this.$refs.selectAccount.accountInfo) {
          this.selectAddressInfo = this.$refs.selectAccount.accountInfo;
        }
      },

      /**
       * 获取账户列表
       */
      getAddressList() {
        for (let item in this.addressList) {
          this.addressList[item].total = Number(Plus(Number(this.addressList[item].balance), Number(this.addressList[item].consensusLock)));
          if (this.addressList[item].total.toString() === 'NaN') {
            this.addressList[item].total = 0
          }
        }
        //如果没有账户跳转到创建地址界面
        if (this.addressList.length === 0) {
          this.$router.push({
            name: "newAddress",
            query: {'address': ''}
          })
        }
      },

      /**
       * 获取地址网络信息
       * @param addressInfo
       **/
      async getAddressInfoByNode(addressInfo) {
        await this.$post('/', 'getAccount', [addressInfo.address])
          .then((response) => {
            //console.log(response);
            if (response.hasOwnProperty("result")) {
              for (let item of this.addressList) {
                if (item.address === addressInfo.address) {
                  addressInfo.alias = response.result.alias;
                  addressInfo.balance = timesDecimals(response.result.balance);
                  addressInfo.consensusLock = timesDecimals(response.result.consensusLock);
                  addressInfo.totalReward = timesDecimals(response.result.totalReward);
                  addressInfo.tokens = [];
                  addressInfo.chainId = nuls.verifyAddress(item.address).chainId;
                }
              }
              //localStorage.setItem(chainIdNumber(), JSON.stringify(this.addressList))
            }
          })
          .catch((error) => {
            console.log("getAccount:" + error);
          });
      },

      /**
       * 循环获取账户余额及别名
       * @param addressList
       **/
      getAddressLists(addressList) {
        for (let item of addressList) {
          setTimeout(() => {
            this.getAddressInfoByNode(item);
          }, 500);
        }
      },

      /**
       * 设置别名
       * @param rowInfo
       **/
      addAlias(rowInfo) {
        if (rowInfo.balance === 0) {
          this.$message({message: this.$t('address.address12'), type: 'error', duration: 1000});
        } else {
          this.toUrl('setAlias', rowInfo.address)
        }
      },

      /**
       *  修改密码
       * @param rowInfo
       **/
      editPassword(rowInfo) {
        this.toUrl('editPassword', rowInfo.address)
      },

      /**
       *  备份账户
       * @param rowInfo
       **/
      backAddress(rowInfo) {
        this.selectAddressInfo = rowInfo;
        this.$router.push({
          name: "backupsAddress",
          query: {}
        })
      },

      /**
       *  移除账户
       **/
      deleteAddress() {
        this.$confirm(this.$t('tab.tab29'), this.$t('tab.tab32'), {
          confirmButtonText: this.$t('tab.tab30'),
          cancelButtonText: this.$t('address.address3'),
          type: 'warning',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          center: true
        }).then(() => {
          this.backAddress(this.addressList);
        }).catch(() => {
          this.selectAddressInfo = this.addressList;
          this.$refs.password.showPassword(true)
        });

      },

      /**
       * 进入账户（使用账户）
       * @param rowInfo
       **/
      selectionAddress(rowInfo) {
        //console.log(rowInfo);
        for (let item  of this.addressList) {
          //清除选中
          if (item.isItem) {
            item.isItem = false;
          }
          //添加选中
          if (item.address === rowInfo.address) {
            item.isItem = true;
            localStorage.setItem('accountInfo', JSON.stringify(item));
          }
        }
        localStorage.setItem("addressData", JSON.stringify(this.addressList));
        this.$router.push({
          name: 'home',
        })
      },

      /**
       *  获取密码框的密码
       * @param password
       **/
      async passSubmit(password) {
        let accountInfo = accountList(1);

        let passwordInfo = await passwordVerification(accountInfo, password);
        if (!passwordInfo.success) {
          this.$message({message: this.$t('tips.tips18'), type: 'error', duration: 3000});
          return;
        }

        let newAddressInfo = this.addressList;
        //console.log(newAddressInfo);

        if (accountInfo.address === passwordInfo.address) {
          newAddressInfo.splice(newAddressInfo.findIndex(item => item.address === accountInfo.address), 1);

          if (newAddressInfo.length === 0) {
            this.toUrl('newAddress', '');
            localStorage.removeItem('accountInfo');
          } else {
            newAddressInfo[0].isItem = true;
            localStorage.setItem('accountInfo', JSON.stringify(newAddressInfo[0]));
          }
          this.addressList = newAddressInfo;
          //console.log(this.addressList);
          this.selectAddressInfo = newAddressInfo[0];

          localStorage.setItem('addressData', JSON.stringify(newAddressInfo));
          this.$refs.selectAccount.init();
        } else {
          this.$message({message: this.$t('address.address13'), type: 'error', duration: 1000});
        }
      },

      /**
       *  编辑账户备注弹框
       * @param rowInfo
       */
      editRemark(rowInfo) {
        this.selectAddressInfo = rowInfo;
        this.remarkInfo = this.selectAddressInfo.remark;
        this.remarkDialog = true
      },

      /**
       * 账户备注提交
       */
      addRemark() {
        let newAddressInfo = accountList(0);
        for (let item of newAddressInfo) {
          if (item.address === this.selectAddressInfo.address) {
            this.selectAddressInfo.remark = this.remarkInfo;
            item.remark = this.remarkInfo;
          }
        }
        //localStorage.setItem(chainIdNumber(), JSON.stringify(newAddressInfo));
        this.remarkDialog = false;
        this.selectAddressInfo = '';
      },

      /**
       * 连接跳转
       * @param name
       * @param param
       */
      toUrl(name) {
        console.log(name)
        this.$router.push({
          name: name,
          query: {}
        })
      },

      //清除所有
      cleanAll() {
        localStorage.clear();
        sessionStorage.clear();
        this.$router.push({
          name: 'home',
        });
        window.location.reload();
        //window.open('')
      }
    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .user-list {

    .pc {
      height: 800px;
      background-color: #F9FAFD;
      .title {
        font-size: 20px;
        padding: 20px auto 0;
        line-height: 20px;
      }
      .w1400 {
        .top_ico {
          float: right;
          font-size: 26px;
        }
        .el-table {
          .el-table__body-wrapper {
            .el-table__body {
              .el-table__row {
                .cell {
                  .tab_bn, .tab_line {
                    padding: 0 5px;
                  }
                }
              }
            }
          }
        }
      }
      .el-dialog__body {
        background-color: @Bcolour;
        padding: 0 20px 50px 20px;
        .address-remark {
          margin: 50px auto 0;
          .btn-next {
            margin: 40px auto 0;
            text-align: center;
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

    .mobile {
      height: 100%;
      .addrss-list {
        height: 3.4rem;
        margin: 0.5rem 0.5rem 0;
        .el-select {
          width: 100%;
          .el-input {
            .el-input__inner {
              @media screen and (max-width: 1000px) {
                background: #1a1c2e;
                border: 1px solid #333651;
              }
            }
          }
        }
      }
      .lis {
        margin: 0 0 0 0;
        border-top: 0.2rem solid #0A0B18;
        height: 36rem;
        padding: 0 0;
        li {
          color: #F5F7FA;
          border-bottom: 0.1rem solid #333651;
          padding: 0 0.5rem;
          line-height: 2.6rem;
          height: 2.6rem;
          font-size: 0.8rem;
          i {
            display: block;
            float: right;
            font-size: 1.2rem;
            margin: 0.8rem 0 0 0;
          }
        }
        .last {
          border-bottom: 0;
        }
        .remove {
          color: #dd6161;
          border-top: 0.3rem solid #0A0B18;
          line-height: 2.9rem;
          height: 2.9rem;
          border-bottom: 0;
          i {
            color: #F5F7FA;
          }
        }
      }
    }
  }

  .el-message-box__wrapper {
    @media screen and (max-width: 1000px) {
      margin: 0 0.5rem 0;
      width: 96%;
    }
    .el-message-box {
      @media screen and (max-width: 1000px) {
        width: 100%;
      }
      .el-message-box__message {
        p {
          color: red;
        }
      }
    }
  }

</style>

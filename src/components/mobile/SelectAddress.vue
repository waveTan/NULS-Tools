<template>
  <div class="address-select">
    <el-select v-model="accountInfo.address" placeholder="" @change="selectAddress">
      <el-option v-for="(item,index) in accountList"
                 :key="index" :label="shortAddress ? item.addresss:item.address" :value="item.address">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import {superLong, accountList} from '@/api/util.js'

  export default {
    props: {
      shortAddress: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        accountInfo: {},//账户信息
        accountList: [],//账号列表
      }
    },
    created() {
      this.init();
    },
    methods: {

      //初始方法
      init() {
        this.accountInfo = accountList(1);
        this.accountList = accountList(0);
        for (let item of this.accountList) {
          item.addresss = superLong(item.address, 10)
        }
      },

      //选择地址
      selectAddress(e) {
        for (let item of this.accountList) {
          item.isItem = false;
          if (e === item.address) {
            item.isItem = true;
            localStorage.setItem('accountInfo', JSON.stringify(item))
          }
        }
        //this.$parent.changeAccountInfo();
      },

    }
  }
</script>

<style lang="less">
  .address-select {
    width: 450px;
    .el-select {
      width: 100%;
      .el-input {
        width: 100%;
        .el-input__inner {
          @media screen and (max-width: 1000px) {
          }
        }
      }
    }
  }

</style>

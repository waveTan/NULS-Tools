<template>
  <div class="fl search" :class="type ==='buy' ? 'buy':'sell'">
    <el-autocomplete :placeholder="$t('pm.pm1')" v-model="searchValue" popper-class="my-autocomplete"
                     :fetch-suggestions="querySearch" @select="handleSelect">
      <i class="el-icon-search" v-if="!searchValue" slot="suffix"></i>
      <i class="el-icon-close click" v-else slot="suffix" @click="removeSearch"></i>
      <template slot-scope="{ item }">
        <div class="name">{{ item.value }}</div>
        <span class="address">{{ item.contractAddress }}</span>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
  export default {
    props: {
      allData: {
        type: Array
      },
      type: {
        type: String,
        default: 'buy'
      }
    },
    data() {
      return {
        searchValue: '',//搜索内容
      }
    },
    components: {},
    created() {
    },
    mounted() {
      //console.log(this.type);
    },
    watch: {},
    beforeDestroy() {
    },
    methods: {

      querySearch(queryString, cb) {
        let restaurants = this.allData;
        if (restaurants[0].value !== 'All') {
          restaurants.unshift({value: 'All', contractAddress: ''});
        }
        if (queryString === 'All') {
          queryString = '';
        }
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        //console.log(item);
        //console.log(this.type);
        if (this.type === 'buy') {
          this.$parent.getBuyOrdersList(item.contractAddress, 1);
        } else {
          this.$parent.getSaleOrdersList(item.contractAddress, 1);
        }
      },

      removeSearch() {
        this.searchValue = '';
        if (this.type === 'buy') {
          this.$parent.getBuyOrdersList('', 1);
        } else {
          this.$parent.getSaleOrdersList('', 1);
        }
      },
    }

  }
</script>

<style lang="less">
  .search {
    width: 20rem;
    margin: 0 0 0 3rem;
    .el-autocomplete {
      width: 20rem;
      .el-input {
        .el-input__inner {
          border: 0;
          border-bottom: 1px solid rgb(14, 222, 148);
          border-radius: 0;
          height: 27px;
          line-height: 27px;
          padding: 0 2px;
        }
        .el-input__suffix {
          .el-input__icon {
            line-height: 25px;
          }
        }
      }
    }
  }

  .sell {
    .el-autocomplete {
      width: 20rem;
      .el-input {
        .el-input__inner {
          border-bottom: 1px solid #FF3300;
        }
      }
    }
  }

  .my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .address {
        font-size: 11px;
        color: #b4b4b4;
      }

      .highlighted .address {
        color: #ddd;
      }
    }
  }
</style>

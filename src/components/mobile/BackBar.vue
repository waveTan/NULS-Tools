<template>
  <div class="backtop bg3">
    <i class="el-icon-back" @click="back" v-if="isBackIcon"></i>
    <span class="b-title" v-if="rightTitle">{{rightTitle}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      isBackIcon: {
        type: Boolean,
        default: () => false
      },
      rightTitle: {
        type: String,
        default: () => ''
      },
      isName: {
        type: Boolean,
        default: () => false
      },
      isUpsDowns: {
        type: Boolean,
        default: () => false
      },
      isColl: {
        type: Boolean,
        default: () => false
      },
    },
    data() {
      return {}
    },
    created() {

    },

    mounted() {

    },
    methods: {

      //返回
      back() {
        window.history.back();
      },

      /**
       * 连接跳转
       * @param name
       * @param parameter
       */
      async toUrl(name, parameter, type = 0) {
        if (type === 0) {
          let newQuery = {};
          this.$router.push({
            name: name,
            query: newQuery
          })
        }
      },

    }
  }
</script>

<style lang="less">
  .backtop {
    height: 3rem;
    line-height: 3rem;
    color: #F5F7FA;
    padding: 0 0.5rem;
    i, span, font {
      display: block;
      float: left;
    }
    .el-icon-back {
      margin: 1rem 0.5rem 0 0;
    }
    span {
      font-size: 0.8rem;
      margin: 0 0 0 0;
    }
    .b-title {

    }
    .b-name {
      font-size: 1.2rem;
    }
    .b-ud {
      height: 1.45rem;
      line-height: 1.1rem;
      border-radius: 0.2rem;
      text-align: center;
      margin: 0.8rem 0 0 1rem;
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
    }
    .shoucang {
      float: right;
      margin: 1rem 0 0 0;
    }
  }
</style>

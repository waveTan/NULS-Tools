<template>
  <div class="account">

  </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },
    created() {

    },
    mounted() {

    },
    destroyed() {

    },
    components: {

    },
    methods: {

    },
  }
</script>

<style lang="less">
  .account {
    margin: 0 auto;

    .user_tabs {
      .el-tabs__header {
        margin: 0;

        .el-tabs__nav-wrap {
          height: 60px;
          line-height: 50px;

          &:after {
            background: linear-gradient(to bottom, #ffffff, #E4E7ED);
            height: 10px;
          }

          .el-tabs__nav-scroll {
            width: 1400px;
            margin: 0 auto;

            .el-tabs__active-bar {
              background-color: transparent;
            }

            .el-tabs__item {
              font-size: 18px;
            }
          }
        }
      }
    }

    .address {
      span {
        color: #17202e;
        @media screen and (max-width: 1024px) {
          font-size: 0.8rem;
          display: block;
          margin: 0.5rem 0 0 0.5rem;
        }
      }

      font {
        @media screen and (max-width: 1024px) {
          font-size: 0.8rem;
          display: block;
          float: none;
          margin: 0.5rem 0 0 0.5rem;
        }
      }
    }
  }


</style>

<template>
    <div class="block_height">
        <i class="el-icon-s-grid fCN"></i>
        <!--<span> {{height}} </span>-->
        <template>
            <countTo :startVal='startHeight' :endVal='endHeight' :separator=separator :duration='500'></countTo>
        </template>
    </div>
</template>

<script>
  import countTo from 'vue-count-to';

  export default {
    data() {
      return {
        //height: 0,//最新高度
        startHeight: 0,
        endHeight: 888,
        separator: '',
      }
        ;
    },
    components: {countTo},
    created() {
      this.getBestBlockHeader();
    },
    mounted() {
      /*setInterval(() => {
        this.getBestBlockHeader()
      }, 10000)*/
    },
    methods: {

      /**
       * 获取最新高度
       */
      getBestBlockHeader() {
        this.startHeight = this.endHeight - 50;
        this.$post('/', 'getBestBlockHeader', [])
          .then((response) => {
            //console.log(response)
            if (response.hasOwnProperty("result")) {
              this.endHeight = response.result.height;
              this.$store.commit('setHeight', this.endHeight);
            } else {
              this.endHeight = 0;
              this.startHeight = 0;
            }
          }).catch((error) => {
          this.endHeight = 0;
          this.startHeight = 0;
          console.log(error);
        })
      },
    }
  }
</script>

<style lang="less" type="text/less">
    .block_height {
        width: 120px;
        line-height: 40px;
        @media screen and (max-width: 1000px) {
            width: auto;
            margin: 0 0.5rem 0 0;
        }
    }
</style>

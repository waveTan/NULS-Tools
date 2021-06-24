<template>
    <div class="block_height">
        <i class="el-icon-s-grid fCN"></i>
        <span> {{endVal}} </span>
        <!--<countTo :startVal='startVal' :endVal='endVal' :duration='3000'></countTo>-->
    </div>
</template>

<script lang="ts">
    import {ref, defineComponent, onMounted} from 'vue'
    import {nulsPost} from './../api/NulsApi'
    import countTo from 'vue-count-to';

    export default defineComponent({
        name: 'Height',
        components: {countTo},
        data() {
            return {
                startVal: 0,
                endVal: 5000,//最新高度
            };
        },

        mounted() {
            this.getBestBlockHeader();
            setInterval(() => {
                this.getBestBlockHeader()
            }, 10000)
        },
        beforeDestroy() {
            //离开界面清除定时器
            //clearInterval(this.goblinSetInterval);
        },
        methods: {

            /**
             * 获取最新高度
             */
            async getBestBlockHeader() {
                try {
                    let resData = await nulsPost('/', 'getBestBlockHeader', []);
                    this.endVal = resData.result.height;
                    setTimeout(() => {
                        this.startVal = this.endVal
                    }, 5000)
                } catch (err) {
                    console.log(err)
                }
            },

        }
    })
</script>


<style lang="scss" type="text/less">
    .block_height {
        width: 120px;
        line-height: 40px;
        @media screen and (max-width: 1000px) {
            width: auto;
            margin: 0 0.5rem 0 0;
        }
    }
</style>

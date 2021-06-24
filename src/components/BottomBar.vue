<template>
    <div class="bottom cb">
        <div class="pc">
            <div class="w1200 font12 info">
                <div class="fl">
                    <div>
                        {{$t('public.developer')}}:
                        <!-- <span class="click" @click="toUrl('dream','',0)">wave</span>-->
                        <span>NULS 社区</span>
                    </div>
                    <!--<div>{{$t('public.address')}}: <span @click="toCopys('NULSd6HgbayXFPacp5zDWiCgs4goxFyy7WAVE')">NULSd6HgbayXFPacp5zDWiCgs4goxFyy7WAVE</span>-->
                    <div>{{$t('public.address')}}: <span>NULSd6HgbayXFPacp5zDWiCgs4goxFyy7WAVE</span>
                    </div>
                </div>
                <div class="fr">
                    <Height>
                    </Height>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {ref, defineComponent} from 'vue'
    //import {copys} from "@/api/util"
    import Height from './Height.vue'

    export default defineComponent({
        name: 'BottomBar',
        setup: () => {
            return {}
        },
        components: {
            Height
        },
        methods: {
            /**
             * @disc: 复制地址
             * @params:
             * @date: 2020-12-01 18:05
             * @author: Wave
             */
            /*toCopys(info) {
                copys(info);
                this.$message({
                    message: '地址已复制，感谢您的支持!',
                    type: 'success'
                });
            }*/
        }
    })
</script>

<style lang="scss">
    .bottom {
        background: #FFFFFF;
        z-index: 9999;
        .pc {
            border-top: 1px solid #c1c1c1;
            height: 40px;
            position: fixed;
            bottom: 0;
            background-color: #FFFFFF;
            width: 100%;

            .info {
                padding: 0;
                line-height: 20px;
            }
        }
    }
</style>
<template>
    <div class="set w1200">
        <p>当前版本:<span class="fW600">V{{version}}</span></p>
        <p>GitHub: <span class="click" @click="toUrl('','https://github.com/waveTan/NULS-Tools',1)">https://github.com/waveTan/NULS-Tools</span>
        </p>
        <p class="fred">代码全部开源，强烈建议自己拉取打包</p>
        <p>检查更新:<span class="click" @click="toUrl('','https://github.com/waveTan/NULS-Tools',1)">https://pan.baidu.com/s/1ncbwpzfKmlIa5Rhb70Al3Q</span>
            提取码：lwdg</p>
        <p>开发者:NULS 社区</p>
        <p>赞助地址:<span
                @click="toCopys('NULSd6HgbayXFPacp5zDWiCgs4goxFyy7WAVE')">NULSd6HgbayXFPacp5zDWiCgs4goxFyy7WAVE</span>
        </p>

    </div>
</template>

<script>
    import {copys, openConnection} from "@/api/util"
    import config from './../../../package.json'

    export default {
        name: "set",
        data() {
            return {
                version: '1.0.0',//版本信息
            }
        },

        created() {

        },
        mounted() {
            this.version = config.version
        },

        methods: {

            /**
             * @disc: 复制地址
             * @params:
             * @date: 2020-12-01 18:05
             * @author: Wave
             */
            toCopys(info) {
                copys(info);
                this.$message({
                    message: '地址已复制，感谢您的支持!',
                    type: 'success'
                });
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
                    //let newUrl = parameter
                    openConnection(parameter);
                }
            },
        }
    }
</script>

<style lang="less">
    .set {
        margin: 2rem auto 0;
        width: 800px;

        p {
            font-size: 1rem;
            line-height: 1.2rem;
            height: 2rem;
        }
    }
</style>

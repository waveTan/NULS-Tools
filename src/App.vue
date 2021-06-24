<template>
    <div class="app">
        <HeaderBar></HeaderBar>
        <router-view>
        </router-view>
        <BottomBar></BottomBar>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import HeaderBar from './components/HeaderBar.vue'
    import BottomBar from './components/BottomBar.vue'

    export default defineComponent({
        name: 'App',
        components: {
            HeaderBar, BottomBar
        }
    })
</script>
<style lang="scss">
    @import 'assets/css/base';
    @import 'assets/css/el-index';
    .app {
        width: 100%;
        height: 100%;
    }
</style>

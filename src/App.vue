<template>
  <div id="app">
    <HeaderBar></HeaderBar>
    <router-view></router-view>
  </div>
</template>

<script>
  import HeaderBar from './components/HeaderBar'
  export default {
    components: {
      HeaderBar
    }
  }
</script>

<style lang="less">
  @import "assets/css/base.less";
</style>


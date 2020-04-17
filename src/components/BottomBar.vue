<template>
  <div class="bottom w1200 font12">
    <div class="info">
      <div class="fl">
        <div>开发者：wave</div>
        <div>地址：NULSd6HgaWymKrQ7NdtWossLFzunasJzdwave</div>
      </div>
      <div class="fr">
        <Height>
        </Height>
      </div>
    </div>
  </div>
</template>

<script>
  import Height from './Height.vue'

  export default {
    components: {
      Height
    }
  }
</script>

<style lang="less">
  .bottom {
    .info {
      position: fixed;
      bottom: 0;
      background-color: #FFFFFF;
      padding: 0;
      line-height: 20px;
      height: 40px;
      width: 1200px;
    }
  }
</style>

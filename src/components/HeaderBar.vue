<template>
  <el-col :span="24">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">全部</el-menu-item>
      <el-menu-item index="2">轮盘</el-menu-item>
      <el-menu-item index="3">竞猜</el-menu-item>
      <el-menu-item index="4">更多</el-menu-item>
      <el-select v-model="value" placeholder="请选择" class="fr">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-menu>
  </el-col>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        options: [{
          value: 'zh',
          label: '简体中文'
        }, {
          value: 'en',
          label: 'English'
        }],
        value: 'zh'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="less">

</style>

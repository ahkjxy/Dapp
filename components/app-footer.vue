<template>
  <el-footer class="app-footer">
    <!-- {{date}} -->
  </el-footer>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear(),
    }
  }
}
</script>
<style lang="less">
.app-footer {
  width: 100%;
  text-align: center;
}
</style>

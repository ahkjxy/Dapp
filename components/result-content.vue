<template>
  <div class="empty-result">
    <el-empty :description="description" :image-size="140"></el-empty>
  </div>
</template>
<script>
export default {
  props: {
    description: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>
<style lang="less">
.empty-result {
  padding: 120px 0;
  text-align: center;
  flex: 1;
  .el-empty__image {
    display: inline-block;
  }
}
</style>
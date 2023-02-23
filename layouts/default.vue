<template>
  <el-container direction="vertical">
  <AppHeader />
  <el-container>
    <AppSidebar />
    <el-container direction="vertical">
      <el-main>
        <nuxt />
      </el-main>
      <AppFooter />
    </el-container>
  </el-container>
</el-container>
</template>
<script>
import AppHeader from '~/components/app-header';
import AppFooter from '~/components/app-footer';
import AppSidebar from '~/components/app-sidebar';

export default {
  middleware: 'auth',
  components: {
    AppHeader,
    AppFooter,
    AppSidebar,
  },
  methods: {
    
  }
}
</script>
<style lang="less">
.app-container {
  display: block!important;
}
</style>
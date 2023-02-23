<template>
  <el-aside :width="$store.state.isCollapse ? '' : '200px'" class="aside">
    <el-menu
      background-color="#2b2b2b"
      text-color="#fff"
      active-text-color="#067a53"
      :default-active="$route.path"
      router
      unique-opened
      :collapse="$store.state.isCollapse"
      @select="handleSelect"
    >
      <el-submenu index="/account">
        <template slot="title">
          <i class="el-icon-s-tools"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/account/add">创建账号</el-menu-item>
          <el-menu-item index="/account/query">账号信息查询</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/connect">
        <template slot="title">
          <i class="el-icon-milk-tea"></i>
          <span>连接钱包</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/connect/metamask">MetaMask</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  methods: {
    handleSelect(key, keyPath) {
      console.log( keyPath);
    }
  }
}
</script>

<style lang="less">
.aside {
  height: calc(100vh - 60px);
  background-color: #2b2b2b;
  position: sticky;
  top: 60px;
  .el-menu-item-group {
    .el-menu-item {
      padding-left: 52px!important;
      .el-badge {
        position: relative;
        top: -3px;
        left: 4px;
      }
      &.is-active {
        background-color: rgba(34, 34, 34, 1)!important;
      }
    }
  }
}
</style>
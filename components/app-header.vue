<template>
  <el-header class="app-header" height="60px">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="logo">
          <span style="display: inline-block; width: 180px;">Wallet</span>
          <span class="toggle">
            <i :class="$store.state.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="onMenuToggle"></i>
          </span>
        </div>
      </el-col>
      <el-col :span="6" :offset="12">
        <div class="user">
          <span><i class="el-icon-user-solid"></i>您好，Admin</span>|<span @click="userLogout"></span>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>
<script>

export default {
  methods: {
    onMenuToggle() {
      this.$store.commit('setMenuToggle')
    },
    handleSelect(key, keyPath) {
      this.$router.push({
        path: key,
      })
    },
    userLogout() {
    }
  }
}
</script>
<style lang="less">
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  line-height: 60px;
  background-color: #067a53;
  color: #fff;
  overflow: hidden;
  .toggle {
    i {
      cursor: pointer;
      font-size: 24px;
      position: relative;
      top: 4px;
    }
  }
  .user {
    text-align: right;
    span {
      padding: 0 10px;
      cursor: pointer;
    }
  }
}
</style>
<template>
  <div>
    <el-container class="main-body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>连接Metamask</span>
        </div>
        <div class="card-body">
          <el-button type="primary" @click="onSubmit">连接</el-button>
          <div>
            <h5>查询结果:</h5>
            <p>账户: {{account}}</p>
            <p>账户余额: {{account}}</p>
            <p>链ID: {{account}}</p>
          </div>
        </div>
      </el-card>
    </el-container>
  </div>
</template>
<script>
import { ethers } from "ethers";

export default {
  layout: 'authCenter',
  async asyncData(context) {},
  data() {
    return {
      account: ''
    }
  },
  methods: {
    async onSubmit() {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('accounts:', accounts);
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== this.accounts){
        this.account = accounts[0];
      }
    },
  }
}
</script>

<style lang="less">
</style>
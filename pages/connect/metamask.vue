<template>
  <div>
    <el-container class="main-body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>连接Metamask</span>
        </div>
        <div class="card-body">
          <el-button type="primary" @click="onSubmit" v-if="isOnline">连接(online)</el-button>
          <el-button type="primary" @click="onSubmit" v-else>连接(offline)</el-button>
          <div>
            <h5>查询结果:</h5>
            <p>账户: {{account}}</p>
            <p>账户余额: {{balance}} ETH</p>
            <p>链ID: {{net.chainId}}</p>
            <p>ensAddress: {{net.ensAddress}}</p>
            <p>Name: {{net.name}}</p>
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
      account: '',
      balance: 0,
      net: {},
      isOnline: false,
    }
  },
  mounted() {
    this.onlineCheck();
  },
  methods: {
    async onlineCheck() {
      this.isOnline = await ethereum.isConnected();
    },
    async onSubmit() {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const provider = ethers.getDefaultProvider('goerli');
      const net = await provider.getNetwork();
      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== this.accounts){
        this.account = accounts[0];
        this.net = net;
        provider.getBalance(accounts[0]).then((balance) => {
          // convert a currency unit from wei to ether
          const balanceInEth = ethers.utils.formatEther(balance);
          this.balance = balanceInEth;
        })
      }
    },
  }
}
</script>

<style lang="less">
</style>
<template>
  <div>
    <el-container class="main-body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>账号信息查询</span>
        </div>
        <div class="card-body">
          <div>
            <el-input type="textarea" v-model="address" placeholder="address"></el-input>
          </div>
          <br>
          <el-button type="primary" @click="onQuery">立即查询</el-button>
          <div>
            <h5>查询结果:</h5>
            <p>账户余额: {{balanceInEth}} ETH</p>
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
      balanceInEth: '',
      address: '0x92AD632485c7d3F6921c1b9Db419273c1D75e9cC',
    }
  },
  methods: {
    async onQuery() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log('provider', provider)
      provider.getBalance(this.address).then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance)
        this.balanceInEth = balanceInEth;
      })
    },
  }
}
</script>

<style lang="less">
</style>
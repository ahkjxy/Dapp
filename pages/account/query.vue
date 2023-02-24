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
          
          <el-table
            :data="list"
            style="width: 100%">
            <el-table-column
              prop="blockHash"
              label="blockHash"
              min-width="200">
            </el-table-column>
            <el-table-column
              prop="blockNumber"
              label="blockNumber"
              min-width="160">
            </el-table-column>
            <el-table-column
              prop="gasPrice"
              label="gasPrice"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="from"
              label="from"
              min-width="300">
            </el-table-column>
            <el-table-column
              prop="to"
              label="to"
              min-width="300"
              fixed="right">
            </el-table-column>
          </el-table>
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
      address: '0x92AD632485c7d3F6921c1b9Db419273c1D75e9cC',
      list: []
    }
  },
  methods: {
    async onQuery() {
      /** METHOD 1 */
      const { address } = this;
      const provider = new ethers.providers.EtherscanProvider('homestead', 'B1P528Y66Z7NAKMH1FACDSCNX27RW2D341'); // main -> homestead
      const result = await provider.getHistory(address);
      this.list = result;
    },
  }
}
</script>

<style lang="less">
</style>
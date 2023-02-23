<template>
  <div>
    <el-container class="main-body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>批量创建账号</span>
        </div>
        <div class="card-body">
          <div style="margin-bottom: 25px;"><el-input v-model="number" placeholder="生成钱包数量"></el-input></div>
          <el-button type="primary" @click="onRandomCreate" :loading="loading">创建</el-button>
          <div v-loading="loading">
            <el-table
              :data="list"
              style="width: 100%">
              <el-table-column
                prop="address"
                label="地址"
                min-width="200">
              </el-table-column>
              <el-table-column
                prop="mnemonic"
                label="助记词"
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="privateKey"
                label="私钥"
                min-width="300">
              </el-table-column>
              <el-table-column
                prop="publicKey"
                label="公钥"
                min-width="300"
                fixed="right">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-card>

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>助记词解析匹配</span>
        </div>
        <div class="card-body">
          <div>
            <div>
              <el-input type="textarea" placeholder="mnemonic" v-model="userMNE"></el-input>
            </div>
            <br>
            <el-input placeholder="path" v-model="userPath"></el-input>
          </div>
          <br>
          <el-button type="primary" @click="onMNECheck">立即解析</el-button>
          <div>
            <h5>查询结果:</h5>
            <p>地址: {{addressU}}</p>
            <p>助记词: {{mnemonicU}}</p>
            <p>私钥: {{privateKeyU}}</p>
          </div>
        </div>
      </el-card>
    </el-container>
  </div>
</template>
<script>
import { ethers } from "ethers";
const { Wallet } = require('ethers');

export default {
  layout: 'authCenter',
  async asyncData(context) {},
  data() {
    return {
      userMNE: '',
      userPath: "m/44'/60'/0'/0/0",
      addressU: '',
      mnemonicU: '',
      privateKeyU: '',
      loading: false,
      number: 100,
      list: []
    }
  },
  methods: {
    onRandomCreate() {
      if (this.loading) return;
      this.loading = true;
      // 生成随机助记词
      const numWallet = +this.number;
      // 派生路径：m / purpose' / coin_type' / account' / change / address_index
      // 我们只需要切换最后一位address_index，就可以从hdNode派生出新钱包
      let basePath = "m/44'/60'/0'/0";
      for (let i = 0; i < numWallet; i++) {
        let mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(32))
      // 创建HD钱包
        let hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic)
        let hdNodeNew = hdNode.derivePath(basePath + "/" + i);
        let walletNew = new ethers.Wallet(hdNodeNew.privateKey);
        this.list.push({
          address: walletNew.address,
          mnemonic: mnemonic,
          privateKey: walletNew.privateKey,
          publicKey: walletNew.publicKey,
        });
      }
      this.loading = false;
    },
    onMNECheck() {
      try {
        const wallet = Wallet.fromMnemonic(this.userMNE, this.userPath);
        this.addressU = wallet.address;
        this.mnemonicU = wallet.mnemonic.phrase;
        this.privateKeyU = wallet.privateKey;
      } catch(e) {
        alert(e)
      }
    }
  }
}
</script>

<style lang="less">
</style>
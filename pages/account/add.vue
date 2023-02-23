<template>
  <div>
    <el-container class="main-body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>创建账号</span>
        </div>
        <div class="card-body">
          <el-button type="primary" @click="onRandomCreate">随机创建</el-button>
          <div>
            <h5>创建结果:</h5>
            <p>地址: {{address}}</p>
            <p>助记词: {{mnemonic}}</p>
            <p>私钥: {{privateKey}}</p>
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
      address: '',
      mnemonic: '',
      privateKey: '',
      userMNE: '',
      userPath: "m/44'/60'/0'/0/0",
      addressU: '',
      mnemonicU: '',
      privateKeyU: '',
    }
  },
  methods: {
    onRandomCreate() {
      const wallet = ethers.Wallet.createRandom();
      console.log('address:', wallet.address);
      console.log('mnemonic:', wallet.mnemonic.phrase);
      console.log('privateKey:', wallet.privateKey);
      this.address = wallet.address;
      this.mnemonic = wallet.mnemonic.phrase;
      this.privateKey = wallet.privateKey;
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
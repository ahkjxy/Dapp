<template>
  <div>
    <el-container class="main-body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>转账</span>
        </div>
        <div class="card-body">
          <el-row>
            <el-col span="8">
              <el-input></el-input>
            </el-col>
            <el-col span="2">TO</el-col>
            <el-col span="8">
              <el-input></el-input>
            </el-col>
            <el-col span="6">
              <el-button type="primary" @click="onPay">Transfer</el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-container>
  </div>
</template>
<script>
import { ethers } from "ethers";

export default {
  layout: "authCenter",
  async asyncData(context) {},
  data() {
    return {
      address: "0x92AD632485c7d3F6921c1b9Db419273c1D75e9cC"
    };
  },
  methods: {
    async send_token(
      contract_address,
      send_token_amount,
      to_address,
      send_account,
      private_key
    ) {
      let wallet = new ethers.Wallet(private_key);
      let walletSigner = wallet.connect(window.ethersProvider);

      window.ethersProvider.getGasPrice().then(currentGasPrice => {
        let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));
        console.log(`gas_price: ${gas_price}`);

        if (contract_address) {
          // general token send
          let contract = new ethers.Contract(
            contract_address,
            send_abi,
            walletSigner
          );

          // How many tokens?
          let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18);
          console.log(`numberOfTokens: ${numberOfTokens}`);

          // Send tokens
          contract.transfer(to_address, numberOfTokens).then(transferResult => {
            console.dir(transferResult);
            alert("sent token");
          });
        } // ether send
        else {
          const tx = {
            from: send_account,
            to: to_address,
            value: ethers.utils.parseEther(send_token_amount),
            nonce: window.ethersProvider.getTransactionCount(
              send_account,
              "latest"
            ),
            gasLimit: ethers.utils.hexlify('0x100000'), // 100000
            gasPrice: gas_price
          };
          console.dir(tx);
          try {
            walletSigner.sendTransaction(tx).then(transaction => {
              console.dir(transaction);
              alert("Send finished!");
            });
          } catch (error) {
            alert("failed to send!!");
          }
        }
      });
    },
    async onPay() {
      let private_key =
        "41559d28e936dc92104ff30691519693fc753ffbee6251a611b9aa1878f12a4d";
      let send_token_amount = "1";
      let to_address = "0x4c10D2734Fb76D3236E522509181CC3Ba8DE0e80";
      let send_address = "0xda27a282B5B6c5229699891CfA6b900A716539E6";
      let gas_limit = "0x100000";
      let wallet = new ethers.Wallet(private_key);
      let walletSigner = wallet.connect(window.ethersProvider);
      let contract_address = "";
      window.ethersProvider = new ethers.providers.InfuraProvider(
        "arbitrum-goerli"
      );

      this.send_token(
        contract_address,
        send_token_amount,
        to_address,
        send_address,
        private_key
      );
    }
  }
};
</script>

<style lang="less"></style>

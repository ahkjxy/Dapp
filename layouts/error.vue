<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="bullshit">
        <div class="bullshit__oops">{{error.statusCode== 404 ? 404 : 'Oops~'}}<span>{{error.statusCode}}</span></div>
        <div class="bullshit__headline">{{ error.statusCode == 404 ? '没有这个页面~' : error.message }}</div>
        <nuxt-link :to="error.statusCode == 404 ? '#' : '/account/login'"><el-button type="primary">{{error.statusCode == 404 ? '知道了' : '重新登录'}}</el-button></nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'authCenter',
  props: ["error"],
  mounted() {
    console.error("error-----", this.error);
  },
  methods: {
    reload() {
      location.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.wscn-http404-container{
}
.wscn-http404 {
  position: relative;
  padding: 50px 0;
  overflow: hidden;
  .bullshit {
    position: relative;
    float: left;
    padding: 12px 0;
    overflow: hidden;
    margin-left: 6%;
    &__oops {
      margin-bottom: 24px;
      color: #515a6e;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      span {
        display: none;
      }
    }
    &__headline {
      margin-bottom: 16px;
      color: #808695;
      font-size: 20px;
      line-height: 28px;
      opacity: 0;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      font-size: 13px;
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      width: 110px;
      height: 36px;
      background: #1482f0;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      opacity: 0;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
}
</style>

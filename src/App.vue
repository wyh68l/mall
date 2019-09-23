<template>
  <div id="app">

    <!--主页面-->
    <!-- keep-alive要使用exclude排除里面的商品详情页面，否则不会刷新商品详情的id-->
    <!--exclude排除的是组件的name值-->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    <footerBar></footerBar>
  </div>
</template>

<script>
    import footerBar from "components/commons/footerBar";
    import router from "./router";

    export default {
        name: 'app',
        components: {
            footerBar
        },
        router
    }
</script>

<style scoped lang="less">
  @import "assets/style/base.less";
  #app{
  }
</style>

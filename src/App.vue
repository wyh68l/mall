<template>
  <div id="app">

    <!--主页面-->
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
    .value_pt(80vw);
    .value_mb(100vw);
  }
</style>

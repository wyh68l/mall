<template>
    <div class="backTop">
    <i class="iconfont iconfanhui"></i>
    </div>
</template>

<script>
    export default {
        name: "backTop"
    }
</script>

<style scoped lang="less">
    @import "~assets/style/base.less";
  .backTop{
    position: fixed;
    bottom:25vw;
    right: 6vw;
    z-index: 10;
    text-align: center;
    .value_el(width,90vw);
    .value_el(height,90vw);
    .value_pt(25vw);
    border-radius: 50%;
    background-color: rgba(0,0,0,0.3);
    color: #fff;

    i{
      display: block;
      .value_fs(35vw);
    }
  }

</style>

<template>
  <div class="headerBar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
    export default {
        name: "headerBar"
    }
</script>

<style scoped lang="less">
  @import "~assets/style/base.less";
  .headerBar{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    z-index: 10;
    .value_el(height,80vw);
    justify-content: space-around;
    box-shadow:0 1px 1px rgba(100,100,100,0.1);
    background-color: rgba(0,0,0,0.4);

    .left,.right,.center{
      flex: 2;
      height: 100%;
      text-align: center;
      div{
        .value_el(height,80vw);
        .value_lh(80vw);
        color: #fff;
        .value_fs(32vw);
      }
    }
    .center{
      flex: 6;
      display: flex;
      justify-content: space-around;
    }
  }


</style>

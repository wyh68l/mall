<template>
    <div class="bottomShopCar">
      <div class="item_left">
        <ul>
          <li><i class="iconfont iconyonghuxinxi"></i><br>客服</li>
          <li><i class="iconfont iconshangdian"></i><br>店铺</li>
          <li><i class="iconfont iconshoucang"></i><br>收藏</li>
        </ul>
      </div>
      <div class="item_right">
        <ul>
          <li @click="addCar">加入购物车</li>
          <li>购买</li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
        name: "bottomShopCar",
        methods:{
            addCar() {
                this.$emit('addCar');
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~assets/style/base.less";

  .bottomShopCar{
    .value_el(height,100vw);
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: left;

    .item_left{
      flex: 1;
      ul{
        display: flex;
        justify-content: space-around;

        li{
          text-align: center;
          .value_fs(25vw);
          margin-top: 1vw;
          color: #666666;

          i{
            font-size: 6vw;
            color: #00A1D6;
          }

          &:nth-of-type(3){
            i{
              color: #FE5455;
            }
          }
        }
      }
    }
    .item_right{
      flex: 1;
      ul{
        display: flex;
        justify-content: space-between;
        .value_el(height,100vw);

        li{
          flex: 1;
          .value_fs(30vw);
          .value_el(height,100vw);
          .value_lh(100vw);
          text-align: center;
          background-color: #FFB37C;
          color: #fff;

          &:last-of-type{
            background-color: #f4a7b9;
          }
        }
      }
    }
  }

</style>

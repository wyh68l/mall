<template>
    <div class="goodList">
      <ul v-for="(item1,index1) in goodsList?goodsList:[]" :key="index1">
        <li v-for="(item,index) in item1?item1.img:[]" :key="index">
          <img :src="item" alt="">
          <a href="">{{item1.goodsInfo[index]}}</a>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "goodList",
        data(){
            return {
            }
        },
        props:{
            goodsList:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~assets/style/base.less";
.goodList{
  ul{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .value_mt(15vw);

    li{
      .value_el(width,330vw);
      .value_el(height,500vw);
      .value_mb(40vw);

      img{
        width: 100%;
        .value_el(height,440vw);
        border-radius: 2%;
        .value_mb(10vw);
      }
      a{
        display: block;
        .value_el(width,330vw);
        .value_fs(23vw);
        .value_el(height,30vw);
        .value_lh(30vw);
        color: @font-color;
      }
    }
  }
}

</style>

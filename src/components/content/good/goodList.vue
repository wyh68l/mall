<template>
    <div class="goodList">
      <ul v-for="(item1,index1) in goodsList?goodsList:[]" :key="index1">
        <li v-for="(item,index) in item1?item1.img:[]" :key="index" @click="goTo(item1.id[index],item1.goodsInfo[index])">
          <a><img :src="item" alt="" @load="imgLoad"><p>{{item1.goodsInfo[index]}}</p></a>
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
        },
        methods:{
            //vue的@load就是原生js的onload方法监听img的src的加载，每当src有值且加载完毕后就会触发这个事件
            imgLoad(){
                this.$bus.$emit('loadImg');
            },
            goTo(id,title){
                this.$router.push({name:'GoodsInfo',params:{id:id,title:title}})
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~assets/style/base.less";
.goodList{
  padding-bottom: 3vw;
  ul{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    background-color: #F4F4F4;

    &:first-of-type{
      //.value_mt(15vw);
    }

    li{
      .value_el(width,340vw);
      background-color: #fff;
      .value_el(height,500vw);
      .value_mt(40vw);
      border-radius: 1vw;

      img{
        width: 100%;
        .value_el(height,440vw);
        .value_mb(10vw);
      }
      a{
        display: block;

        p{
          .value_fs(23vw);
          .value_el(height,30vw);
          .value_lh(30vw);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          text-align: center;
        }
      }
    }
  }
}

</style>

<template>
  <div class="footerBar">
    <ul class="footList">
      <li v-for="(item,index) in barList" :key="index" @click="goto(item.path,index)" class="footItem" :class="item.active?'active':''">
        <i :class="item.img"></i>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "footerBar",
        data(){
            return {
                barList:[
                    {
                        name:'首页',
                        img:'iconfont iconshouye2',
                        path:'Main',
                        active:true
                    },
                    {
                        name:'分类',
                        img:'iconfont iconfenlei',
                        path:'Category',
                        active:false
                    },
                    {
                        name:'购物车',
                        img:'iconfont icongouwu',
                        path:'ShopCar',
                        active:false
                    },
                    {
                        name:'我的',
                        img:'iconfont iconwode',
                        path:'Mine',
                        active:false
                    }
                ],
            }
        },
        methods:{
            goto(path,index){
                this.$router.replace({name:path})//跳转

                //控制图标样式
                this.barList.forEach(item=>{item.active = false})
                this.barList[index].active = true
            }
        }
    }
</script>

<style scoped lang="less">
  @import "~assets/style/base.less";

  .footerBar{
    position: fixed;
    width: 100%;
    .value_el(height,100vw);
    background-color: #F4F4F4;
    box-shadow:0 -1px 1px rgba(0,0,0,0.08);
    bottom: 0;
    left: 0;
    /*z-index: 10;*/

    .footList{
      display: flex;
      justify-content: space-around;
      .value_el(height,100vw);

      .footItem{
        text-align: center;
        flex: 1;
        .value_el(height,100vw);
        .value_pt(15vw);

        i{
          display: block;
          .value_pb(5vw);
          .value_fs(30vw);
        }
        span{
          .value_fs(16vw);
        }
      }
      .active{
        color: #00A1D6;
      }
    }
  }

</style>

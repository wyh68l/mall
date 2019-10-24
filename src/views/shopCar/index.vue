<template>
  <div class="page">
    <!--导航栏-->
    <headerBar class="headerMain">
      <div slot="center">购物车({{goodsLength}})</div>
    </headerBar>

    <scroll class="scrollContent" ref="scroll" :probeType="3">
      <!--商品列表-->
      <productsList :goodsList="goodsList"></productsList>
    </scroll>

    <!--结算栏-->
    <productsSum :goodsList="goodsList"></productsSum>
  </div>
</template>

<script>
    import productsList from "./productsList";
    import headerBar from "components/commons/headerBar";
    import productsSum from "./productsSum";
    import scroll from "components/commons/scroll/scroll";
    import {back} from "../../commons/mixin";
    import {mapGetters} from 'vuex'

    export default {
        name: "index",
        data(){
            return {
                goodsList:[],
                isShow:false,
            }
        },
        mixins:[back],
        created(){
            this.getGoodsList();
        },
        //在刚进入此路由的时候，调用这个钩子函数，解决添加商品后滚动高度的问题
        beforeRouteEnter (to, from, next) {
            next(vm => {
                // 在此钩子函数中，vue十里还未被创建，所以要通过 `vm` 访问组件实例，代替this
                vm.$refs.scroll.imgRefresh();//更新滚动高度
            })
        },
        methods:{
            //获取vuex的购物车数据
            getGoodsList() {
                this.goodsList = this.$store.state.carList;
            },

            //判断返回按钮是否显示
            // showStatus(position) {
            //     if ((position.y ? position.y : 0) <= -200) {
            //         this.isShow = true
            //     } else {
            //         this.isShow = false
            //     }
            // },
        },
        computed:{
            //通过...mapGetters解构vuex中的getters来直接调用computed的计算属性
            ...mapGetters(['goodsLength'])//数组的解构
            //...mapGetters({length:'goodsLength'})//对象的解构，可以取别名
        },
        components:{
            productsList,
            headerBar,
            scroll,
            productsSum
        }
    }
</script>

<style scoped lang="less">
  @import "~assets/style/base.less";

  .page{
    background-color: #f6f6f6;

    //滚动区域
    .scrollContent {
      height: calc(100vh - 38vw);
      overflow: hidden;
    }

    .headerMain{
      position: relative;
      background-color: #00A1D6;
    }
  }
</style>

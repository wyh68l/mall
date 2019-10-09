<template>
  <div class="page">
    <div class="productsList" v-if="goodsList.length !== 0">
      <ul>
        <li class="clearfix" v-for="(item,index) in goodsList" :key="index">
          <input type="checkbox" class="check" :checked="isCheck(index)" @click="check(index)">
          <img class="item_left" :src="item.img" alt="">
          <div class="item_right">
            <p>{{item.mes}}</p>
            <p>{{item.author}}</p>
            <div>
              <span>￥{{item.price}}</span>
              <span>x{{item.sum}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="empty" v-else>
      <p>购物车空空如也哦~</p>
    </div>
  </div>
</template>

<script>

    export default {
        name: "productsList",
        props:{
            goodsList:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return {

            }
        },
        methods:{
            //改变vuex中购物车选中状态
            check(index){
                this.$store.commit('setCheckState',index);
            },
            //获取vuex中购物车选中状态
            isCheck(index) {
                return this.$store.state.carList[index].isCheck;
            }
        },
        computed:{

        }
    }
</script>

<style scoped lang="less">
  @import "~assets/style/base.less";

  .page{
    .productsList{
        ul{
          padding: 2vw;
          padding-bottom: 1vw;
          li{
            border-bottom: 0.1vw solid #e5e9ef;
            padding: 1vw;
            border-radius: 1vw;
            position: relative;
            padding-left: 7vw;
            margin-bottom: 2vw;
            background-color: #fff;

            &:last-of-type{
              margin-bottom: 0;
            }

            .check{
              position: absolute;
              left: 1vw;
              top: 50%;
              transform: translate(0,-70%);
              .value_el(width,40vw);
              .value_el(height,40vw);
            }

            .item_left{
              .value_el(width,150vw);
              .value_el(height,225vw);
              float: left;
              .value_mr(30vw);
              border-radius: 1vw;
            }

            .item_right{
              padding-top: 4vw;

              p{
                .value_fs(30vw);
                color: #666666;
                padding-top: 1vw;
                padding-bottom: 1vw;

                &:last-of-type{
                    .value_fs(23vw);
                    color: #666666;
                    padding-top: 1vw;
                    padding-bottom: 1vw;
                }
              }

              >div{
                position: relative;
                bottom: -8vw;
                left: 0;
                right: 0;

                span{
                  .value_fs(25vw);
                  color: #666666;
                }
                span:first-of-type{
                  float: left;
                  .value_fs(30vw);
                  color: #FE5455;
                }
                span:last-of-type{
                  float: right;
                  .value_fs(30vw);
                  color: #ff9600;
                }
              }
            }
          }
        }
    }

    .empty{
      text-align: center;
      margin-top: 50%;

      p{
        color: #ff9600;
        .value_fs(35vw);
      }
    }
  }

</style>

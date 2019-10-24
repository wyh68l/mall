<template>
  <div class="productsSum">
    <ul>
      <li>
        <div><input type="checkbox" :checked="getAllCheckState" @click="checked">全选</div>
        <div class="price">合计:<span>￥{{getPriceSum}}</span></div>
      </li>
      <li><p @click="buy(getGoodsSum)">去结算({{getGoodsSum}})</p></li>
    </ul>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "productsSum",
        props: {
            goodsList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
            }
        },
        methods: {
            checked() {
                for (let i = 0; i < this.goodsList.length; i++) {
                    this.$store.commit('setCheckAllState', i);
                }
            },
            buy(sum){
                if(this.goodsList.length === 0){
                    this.$toast.show('购物车没有商品哦~',2000)
                }else if(this.goodsList.length !== 0 && sum === 0){
                    this.$toast.show('还没有选择商品哦~',2000)
                }else{
                    this.$toast.show('没钱买个鬼~',2000)
                }
            }
        },
        computed: {
            ...mapGetters(['getPriceSum','getAllCheckState','getGoodsSum']),
        }
    }
</script>

<style scoped lang="less">
  @import "~assets/style/base.less";

  .productsSum {
    .value_el(height, 100vw);
    background-color: #fff;

    ul {
      display: flex;
      justify-content: space-between;

      li {
        .value_el(height, 100vw);
        .value_lh(100vw);
        display: flex;
        justify-content: space-between;

        > div {
          margin-left: 2vw;
          .value_fs(28vw);
          color: #666666;
          margin-right: 3vw;

          input {
            .value_el(width, 30vw);
            .value_el(height, 30vw);
            transform: translate(0, 0.5vw);
            margin-right: 1vw;
          }
        }

        .price {
          color: #FE5455;
        }

        &:last-of-type {
          .value_el(width, 200vw);
          background-color: #ff9600;

          p {
            color: #fff;
            .value_fs(28vw);
            margin: 0 auto;
          }
        }
      }
    }
  }

</style>

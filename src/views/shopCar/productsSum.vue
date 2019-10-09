<template>
  <div class="productsSum">
    <ul>
      <li>
        <div><input type="checkbox" :checked="getAllCheckState" @click="checked">全选</div>
        <div class="price">合计:<span>￥{{getPriceSum}}</span></div>
      </li>
      <li><p>去结算({{goodsList.length}})</p></li>
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
            }
        },
        computed: {
            ...mapGetters(['getPriceSum','getAllCheckState']),
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

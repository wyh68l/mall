<template>
  <div class="reviews">
    <ul>
      <li v-for="(item,index) in reviewsList?reviewsList.img:[]" :key="index">
        <img :src="item" alt="">
        <div>{{reviewsList.type[index]}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "reviews",
        props: {
            reviewsList: {
                type: Object,
                default() {
                    return [];
                }
            }
        },
        methods:{
        }
    }
</script>

<style scoped lang="less">
  @import "~assets/style/base.less";

  .reviews {
    ul {
      display: flex;
      width: 100%;
      justify-content: space-around;
      .value_pb(25vw);
      background-color: #fff;
      border-bottom: 3vw solid #F4F4F4;

      li {
        .value_mt(30vw);
        .value_el(width, 130vw);
        text-align: center;

        img {
          .value_el(height, 100vw);
          .value_el(width, 100vw);
          border-radius: 50%;
          .value_mb(10vw);
        }
        div{
          .value_fs(24vw);
          color: @font-color;
        }
      }
    }
  }


</style>

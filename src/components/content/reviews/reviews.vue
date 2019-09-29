<template>
  <div class="reviews">
    <label for="goodsReviews" class="send">
      <input type="text" v-model="review" name="goodsReviews" id="goodsReviews">
      <input type="button" value="发表评论">
    </label>
    <div class="list">
      <ul>
        <li v-for="(item,index) in reviewsList[arrIndex]" :key="index">
          <h3><span>{{item}}</span></h3>
          <p><span>{{}}</span></p>
          <span class="date">{{index}}</span>
        </li>
      </ul>
      <span>{{reviewsList[arrIndex]}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "reviews",
        data(){
            return {
                review:'',
            }
        },
        props:{
            reviewsList:{
                type:Array,
                default(){
                    return []
                }
            },
            arrIndex:{
                default() {
                    return null;
                }
            }
        },
        created(){
            this.getReviewsList();
        },
        methods:{
            getReviewsList() {
                //console.log(this.reviewsList);
                //console.log(this.arrIndex);
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~assets/style/base.less";
    .reviews{
      width: 100%;
      padding: 2vw;

      .send{
        width: 100%;
        margin: 0 auto;

        input:first-of-type{
          width: 80%;
          .value_el(height,80vw);
          border: 0.1vw solid #c3c3c3;
          .value_pl(20vw);
          .value_fs(26vw);
          color: #666666;
        }
        input:last-of-type{
          width: 20%;
          .value_el(height,80vw);
          border: none;
          background-color: #f4a7b9;
          color: #fff;
          vertical-align: bottom;
        }
      }

      .list{
        width: 100%;

        ul{
          width: 100%;

          li{
            .value_el(height,120vw);
            margin: 2vw 0;
            border-bottom: 0.1vw solid #e5e9ef;

            h3{
              .value_fs(28vw);
              color: #666666;
            }
            p{
              color: #222;
              .value_fs(26vw);
              line-height: 6vw;
              width: 70%;
            }
            .date{
              color: #99a2aa;
              .value_fs(22vw);
            }
          }
        }
      }
    }

</style>

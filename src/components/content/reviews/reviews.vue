<template>
  <div class="reviews">
    <label class="send">
      <input type="text" v-model="review"  @keyup.enter="sendReview" placeholder="请文明评论呦~">
      <input type="button" value="发表评论" @click="sendReview">
    </label>
    <div class="list">
      <ul ref="list">
        <li v-for="(item,index) in reviewsList" :key="index">
          <h3><span>{{item.user}}</span></h3>
          <p><span>{{item.content}}</span></p>
          <span class="date">{{item.date}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    import format from "commons/utils";

    export default {
        name: "reviews",
        data(){
            return {
                review:'',
                isShow:false,
                userName:'匿名用户'
            }
        },
        props:{
            reviewsList:{
                type:Array,
                default(){
                    return []
                }
            },
        },
        methods:{
            /*发送评论*/
            sendReview(){
                let mes = this.review.trim();
                if(mes !== null && mes.length !== 0){
                    let reviewItem = {
                        user:this.userName,
                        content:mes,
                        date:new Date().format("yyyy-MM-dd HH:mm")
                    }
                    this.reviewsList.push(reviewItem);
                    this.saveReviews();
                    this.review = '';
                }else{
                    console.log('请输入评论内容');
                }
            },
            //保存评论
            saveReviews(){
                this.$emit('newReviews',this.reviewsList);
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

<template>
  <div class="page">
    <headerBar class="headerMain">
      <div slot="center">首页</div>
    </headerBar>

    <swiper :bannerList="bannerList"></swiper>
    <reviews :reviewsList="reviewsList"></reviews>
    <div class="fake">
      <a href=""><img src="~assets/images/main_fake2.png" alt=""></a>
    </div>
    <tabControl :titleList="titleList" class="tabControl" :goodsType="goodsType"></tabControl>
    <goodList :goodsList="goods['pop'].list"></goodList>

  </div>
</template>

<script>
    import headerBar from "components/commons/headerBar";
    import swiper from './mainChildren/mainSwiper'
    import reviews from "./mainChildren/reviews";
    import tabControl from "components/content/TabControl/TabControl";
    import goodList from "components/content/good/goodList";

    import {getMainData, getMainGoods} from "serves/main";

    export default {
        name: "index",
        data() {
            return {
                bannerList: [],
                reviewsList: [],
                titleList: ['流行', '新款', '精选'],
                goodsType:null,
                goods: {
                    'pop':{page: 0, list: []},
                    'news':{page: 0, list: []},
                    'sell':{page: 0, list: []},
                }
            }
        },
        created() {
            this.getBannerList();
            this.getreviewsList();
            this.getMainGoods('pop');//获取商品列表--流行
            this.getMainGoods('news');//获取商品列表--最新
            this.getMainGoods('sell');//获取商品列表--精选
        },
        methods: {
            //获取轮播图
            getBannerList() {
                getMainData().then(res => {
                    this.bannerList = res.data.banner;
                })
            },

            //获取分类列表
            getreviewsList() {
                getMainData().then(res => {
                    this.reviewsList = res.data.reviews;
                })
            },

            //获取商品列表
            getMainGoods(type) {
                let page = this.goods[type].page+1;
                getMainGoods(type,page).then(res => {
                    if(!res.data.list.mes){
                        this.goods[type].list = this.goods[type].list.concat(res.data.list||[]);
                        //console.log(this.goods[type].list);
                        this.goods[type].page++;
                    }else{
                        console.log(res.data.list.mes);
                    }
                })
            },
        },
        components: {
            goodList,
            headerBar,
            swiper,
            reviews,
            tabControl
        }
    }
</script>

<style lang="less" scoped>
  @import "~assets/style/base.less";

  .page {

    //分类列表
    .fake {
      width: 100%;

      a {
        img {
          border-bottom: 3vw solid #F4F4F4;
        }
      }
    }

    //副标题
    .tabControl {
      position: sticky; //自动检测高度，变为固定
      .value_el(top, 80vw);
    }
  }


</style>

<template>
  <div class="page">
    <!--  导航栏-->
    <headerBar>
      <div slot="left" @click="$router.go(-1)" class="back"><i class="iconfont iconfanhui1"></i></div>
      <div slot="center">商品详情</div>
    </headerBar>

    <!--  商品详情轮播图-->
    <swiper :options="swiperOption" class="swiper-wrap mainSwiper" v-if="bannerList.length!==0">
      <swiper-slide v-for="(item,index) in bannerList[id]" :key="index+'img'">
        <img :src="item" class="title-img" @load="swiperLoad"/>
      </swiper-slide>
      <!-- 常见的小圆点 -->
      <div class="swiper-pagination" v-for="index in bannerList[id]" :key="index" slot="pagination"></div>
    </swiper>


  </div>
</template>

<script>
    import headerBar from "../../commons/headerBar";
    import {mainGoodsInfo} from "serves/main";

    import "swiper/dist/css/swiper.css"; //引入swiper.css
    import {swiper, swiperSlide} from "vue-awesome-swiper";

    export default {
        name: "goodsInfo",
        data() {
            return {
                swiperOption: {
                    autoplay: {
                        delay: 2500,
                        /* 触摸滑动后是否继续轮播 */
                        disableOnInteraction: false
                    },
                    // loop: true,
                    //分页器设置
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                        type: "bullets",
                    }
                },
                bannerList: [],
                id: 0,
                idArr: []
            }
        },
        created() {
            this.getGoodsInfoList();
        },
        /*
        * 原理：
        * 由于接口不能根据id来返回相应的数据，所以通过本地保存每次请求的随机数据，来达到商品的缓存效果
        * */
        methods: {
            getGoodsInfoList() {
                this.id = this.$route.params.id;
                this.initSessionBanner()//初始化banner数组
                this.initSessionId();//初始化id数组
                this.initSessionPage();//设置不同的页面缓存
            },
            //第一次进入页面存储初始化id
            initSessionId() {
                if (!JSON.parse(sessionStorage.getItem("IdArr"))) {
                    sessionStorage.setItem("IdArr", JSON.stringify(this.idArr));
                }
            },
            //第一次进入页面存储初始化banner图片src
            initSessionBanner() {
                if (!JSON.parse(sessionStorage.getItem("bannerArr"))) {
                    sessionStorage.setItem("bannerArr", JSON.stringify(this.bannerList));
                }
            },
            //设置每次进入详情页的内容
            initSessionPage() {
                //判断如果曾经进入过的页面，就不发送请求接口，直接读取本地缓存的数据
                if (sessionStorage.getItem("bannerArr") && JSON.parse(sessionStorage.getItem("IdArr")).includes(this.id)) {
                    this.bannerList = JSON.parse(sessionStorage.getItem("bannerArr"));

                    console.log(JSON.parse(sessionStorage.getItem("IdArr")).includes(this.id));
                } else {
                    //如果第一次或者每次进入新的页面
                    mainGoodsInfo(this.id).then(res => {
                        //先将本地存储的id取出，push到idArr数组，再存储到本地数据
                        this.idArr = JSON.parse(sessionStorage.getItem("IdArr"));
                        this.idArr.push(this.id);
                        sessionStorage.setItem("IdArr", JSON.stringify(this.idArr));

                        //先将本地存储的bannerSrc取出，push到bannerList数组，再存储到本地数据
                        this.bannerList = JSON.parse(sessionStorage.getItem("bannerArr"));
                        this.bannerList.push(res.data.list.goodsInfo.banner.img);
                        sessionStorage.setItem("bannerArr", JSON.stringify(this.bannerList));

                        console.log(JSON.parse(sessionStorage.getItem("IdArr")));
                        console.log(JSON.parse(sessionStorage.getItem("bannerArr")));
                    })
                }
            },
            swiperLoad() {

            }
        },
        components: {
            headerBar,
            swiper,
            swiperSlide
        }
    }
</script>

<style scoped lang="less">
  @import "~assets/style/base.less";

  .back {
    i {
      .value_fs(40vw);
    }
  }

  .mainSwiper {
    .value_el(height, 350vw);

    .title-img {
      .value_el(height, 350vw);
    }

    /*设置小圆点样式*/

    .swiper-pagination-bullet {
      background: rgba(0, 0, 0, 0.5) !important;
    }

    .swiper-pagination-bullet-active {
      background: #f6f6f6 !important;
    }
  }

</style>

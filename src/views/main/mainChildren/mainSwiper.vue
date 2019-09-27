<template>
  <swiper :options="swiperOption" class="swiper-wrap Swiper" v-if="bannerList.img.length !== 0">
    <swiper-slide v-for="(item,index) in bannerList.img" :key="index+'img'">
      <img :src="item" class="title-img" @load="swiperLoad"/>
    </swiper-slide>
    <!-- 常见的小圆点 -->
    <div class="swiper-pagination" v-for="index in bannerList.img" :key="index" slot="pagination"></div>
  </swiper>
</template>

<script>
    import "swiper/dist/css/swiper.css"; //引入swiper.css
    import {swiper, swiperSlide} from "vue-awesome-swiper";

    export default {
        name: "mainSwiper",
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
                        // type: "bullets",
                    }
                },
                bannerImgList: []
            }
        },
        props: {
            bannerList: {
                type:Object,
                default() {
                    return {}
                }
            }
        },
        methods:{
            swiperLoad(){
                this.$emit('swiperLoad')
            }
        },
        components: {
            swiper,
            swiperSlide
        }
    }
</script>

<style lang="less">
  @import "~assets/style/base.less";

  .Swiper {
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

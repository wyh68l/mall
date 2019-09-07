<template>
  <swiper :options="swiperOption" class="swiper-wrap mainSwiper" v-if="bannerList.length!=0">
    <swiper-slide v-for="(item,index) in bannerList" :key="index+'img'">
      <img :src="item.imgNav" class="title-img" @load="swiperLoad"/>
    </swiper-slide>
    <!-- 常见的小圆点 -->
    <div class="swiper-pagination" v-for="(item,index) in bannerList" :key="index" slot="pagination"></div>
  </swiper>
</template>

<script>
    import {swiper, swiperSlide} from "vue-awesome-swiper";
    require("swiper/dist/css/swiper.css"); //引入swiper.css

    export default {
        name: "mainSwiper",
        data() {
            return {
                swiperOption: {
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        stopOnLastSlide: false,
                        /* 触摸滑动后是否继续轮播 */
                        disableOnInteraction: false
                    },
                    //分页器设置
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                        type: "bullets",
                    }
                }
            }
        },
        props: {
            bannerList: {
                type: Array,
                default() {
                    return []
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

  .mainSwiper {
    .value_el(height, 200vw);

    .title-img {
      .value_el(height, 200vw);
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

<template>
  <div class="page">
    <headerBar class="headerMain">
      <div slot="center">首页</div>
    </headerBar>

    <!--伪造标题栏吸顶的假象-->
    <tabControl :titleList="titleList" v-show="!scrollTitleShow" @tabClick="changeTab" ref="tabControl1"
                class="tabControl"></tabControl>

    <scroll class="scrollContent" ref="scroll"
            :probeType="3"
            @showStatus="showStatus"
            :pullType="true"
            @pullMore="pullMore"
    >
      <swiper :bannerList="bannerList" @swiperLoad="swiperLoad"></swiper>
      <category :reviewsList="reviewsList"></category>
      <div class="fake">
        <a href=""><img src="~assets/images/main_fake3.png" alt=""></a>
      </div>
      <tabControl :titleList="titleList" @tabClick="changeTab" ref="tabControl2"></tabControl>

      <goodList :goodsList="goods[goodsType].list" id="goodsList"></goodList>

    </scroll>

    <!--在给组件添加点击事件的时候，要使用@click.native才会有效果-->
    <backTop @click.native="backTop" v-show="isShow"></backTop>

  </div>
</template>

<script>
    import headerBar from "components/commons/headerBar";
    import swiper from './mainChildren/mainSwiper'
    import category from "./mainChildren/category";
    import tabControl from "components/content/TabControl/TabControl";
    import goodList from "components/content/good/goodList";
    import scroll from "components/commons/scroll/scroll";
    import backTop from "components/commons/backTop";

    import {mainGoods, mainBanner, mainReviews} from "serves/main";
    import {debounce} from "commons/utils";


    export default {
        name: "index",
        data() {
            return {
                bannerList: {img:[]},
                reviewsList: {},
                scroll: null,
                titleList: ['推荐', '唯美', '可爱'],
                goodsType: 'pop',
                goods: {
                    'pop': {page: 0, list: []},
                    'news': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                isShow: false,
                scrollTop: 0,
                scrollTitleShow: true,
                flag: true,
            }
        },
        created() {
            this.getBannerList();
            this.getreviewsList();
            this.getMainGoods_pro();
            // sessionStorage.clear()
        },
        mounted() {
            this.imgLoad();
            this.swiperLoad();
        },
        methods: {
            //获取轮播图
            getBannerList() {
                mainBanner().then(res => {
                    if(res.data.list.img.length !== 0){
                        this.bannerList = res.data.list;
                    }
                })
            },

            //获取分类列表
            getreviewsList() {
                mainReviews().then(res => {
                    this.reviewsList = res.data.reviews;
                })
            },

            //获取商品列表
            getMainGoods(type, resolve) {
                let page = this.goods[type].page + 1;
                mainGoods(type, page, resolve).then(res => {
                    if (res.data.list.mes) {
                        //没有更多数据了
                        console.log(res.data.list.mes);
                        this.$refs.scroll.finishPull();//每拉一次调用一次完成事件
                    }else{
                        this.goods[type].list = this.goods[type].list.concat(res.data.list || []);
                        this.goods[type].page++;
                        // console.log(res.data.list);
                        this.$refs.scroll.finishPull();//每拉一次调用一次完成事件
                        if (resolve !== undefined) resolve();
                    }
                })
            },

            //异步解决获取首页商品数据
            getMainGoods_pro() {
                //通过promise来解决异步问题----我特么就是天才
                //通过将resolve对象暴露出去，再用函数回调实现多重异步处理
                new Promise((resolve) => {
                    this.getMainGoods('pop', resolve);//获取商品列表--流行
                }).then(res => {
                    return new Promise((resolve) => {
                        this.getMainGoods('news', resolve);//获取商品列表--最新
                    })
                }).then(res => {
                    return new Promise((resolve) => {
                        this.getMainGoods('sell', resolve);//获取商品列表--精选
                    })
                })
            },

            //切換导航标题
            changeTab(index) {
                switch (index) {
                    case 0:
                        this.goodsType = "pop"
                        break;
                    case 1:
                        this.goodsType = "news"
                        break;
                    case 2:
                        this.goodsType = "sell"
                        break;
                }
                this.$refs.tabControl1.currentIndex = index;
                this.$refs.tabControl2.currentIndex = index;
            },

            //回到顶部
            backTop() {
                this.$refs.scroll.backTop(0, 0, 800);//通过#refs.属性名.可以获取到组件的属性和方法
            },

            //判断返回按钮是否显示
            showStatus(position) {
                if ((position.y ? position.y : 0) <= -200) {
                    this.isShow = true
                } else {
                    this.isShow = false
                }
                //解决副标题栏吸顶问题
                if ((position.y ? position.y : 0) <= -this.scrollTop) {
                    this.scrollTitleShow = false
                } else {
                    this.scrollTitleShow = true
                }
            },

            //下拉加载更多
            pullMore() {
                this.getMainGoods(this.goodsType);
            },

            //解决scroll下滑卡顿的bug--每次获取到图片数据，都刷新scrol的滑动高度
            imgLoad() {
                const refresh = debounce(this.$refs.scroll.imgRefresh, 200);
                this.$bus.$on('loadImg', () => {
                    refresh();
                })
            },

            //解决副标题栏吸顶问题
            swiperLoad() {
                //console.log(this.$refs.tabControl2.$el.offsetTop);
                this.scrollTop = this.$refs.tabControl2.$el.offsetTop;
            }

        },
        components: {
            goodList,
            headerBar,
            swiper,
            category,
            tabControl,
            scroll,
            backTop
        }
    }
</script>

<style lang="less" scoped>
  @import "~assets/style/base.less";

  .page {
    background-color: #F4F4F4;

    //分类列表
    .fake {
      width: 100%;

      a {
        img {
          border-bottom: 3vw solid #F4F4F4;
          padding: 0 1vw;
        }
      }
    }

    //副标题
    .tabControl {
      position: absolute;
      width: 100%;
      z-index: 10;
    }

    //滚动区域
    .scrollContent {
      .value_el(height, 1230vw);
      overflow: hidden;
    }
  }


</style>

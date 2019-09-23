<template>
  <div class="page">
    <headerBar class="headerMain">
      <div slot="center">首页</div>
    </headerBar>

    <!--伪造标题栏吸顶的假象-->
    <tabControl :titleList="titleList" v-show="!scrollTitleShow" @tabClick="changeTab" ref="tabControl1" class="tabControl"></tabControl>

    <scroll class="scrollContent" ref="scroll"
            :probeType="3"
            @showStatus="showStatus"
            :pullType="true"
            @pullMore="pullMore"
    >
      <swiper :bannerList="bannerList" @swiperLoad="swiperLoad"></swiper>
      <reviews :reviewsList="reviewsList"></reviews>
      <div class="fake">
        <a href=""><img src="~assets/images/main_fake2.png" alt=""></a>
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
    import reviews from "./mainChildren/reviews";
    import tabControl from "components/content/TabControl/TabControl";
    import goodList from "components/content/good/goodList";
    import scroll from "components/commons/scroll/scroll";
    import backTop from "components/commons/backTop";

    import {getMainData, getMainGoods,mainGoodsTest2} from "serves/main";
    import {debounce} from "commons/utils";
    import {getUserList,mainGoodsTest} from "../../mock";
    import Mock from 'mockjs'

    export default {
        name: "index",
        data() {
            return {
                bannerList: [],
                reviewsList: [],
                scroll: null,
                titleList: ['流行', '新款', '精选'],
                goodsType: 'pop',
                goods: {
                    'pop': {page: 0, list: []},
                    'news': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                isShow: false,
                scrollTop: 0,
                scrollTitleShow: true,
                flag:true
            }
        },
        created() {
            this.getBannerList();
            this.getreviewsList();
            this.getMainGoods('pop');//获取商品列表--流行
            this.getMainGoods('news');//获取商品列表--最新
            this.getMainGoods('sell');//获取商品列表--精选
            //this.getMock();//获取模拟数据
        },
        mounted() {
            this.imgLoad();
            this.swiperLoad();
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

                // getMainGoods(type, page).then(res => {
                //     console.log(res);
                //     if (res.data.list.mes) {
                //         //没有更多数据了
                //         console.log(res.data.list.mes);
                //     }
                //     this.goods[type].list = this.goods[type].list.concat(res.data.list || []);
                //     //console.log(this.goods['pop'].list);
                //     this.goods[type].page++;
                //     this.$refs.scroll.finishPull();//每拉一次调用一次完成事件
                // })

                let page = this.goods[type].page + 1;
                if(this.flag){
                    Mock.mock(RegExp(`/mock` + ".*"), 'get', mainGoodsTest(type,page)) //模拟分页查询用户信息接口
                    this.flag = false
                    console.log('sas');
                }
                mainGoodsTest2().then(res =>{
                    if (res.data.list.mes) {
                        //没有更多数据了
                        console.log(res.data.list.mes);
                    }
                    this.goods[type].list = this.goods[type].list.concat(res.data.list || []);
                    this.goods[type].page++;
                    this.$refs.scroll.finishPull();//每拉一次调用一次完成事件
                    console.log(res);
                    console.log(type);
                    Mock.mock(RegExp(`/mock` + ".*"), 'get', mainGoodsTest(type,page)) //模拟分页查询用户信息接口
                })

                new Promise((resolve, reject) => {

                    resolve({type,page})
                }).then((obj)=>{

                })

            },

            //获取模拟数据mock
            getMock(){
                // Mock.mock(RegExp(`/mock` + ".*"), 'get', mainGoodsTest(this.goodsType,1)) //模拟分页查询用户信息接口
                //
                // mainGoodsTest2().then(res =>{
                //     console.log(res);
                // })
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
                console.log(this.$refs.tabControl2.$el.offsetTop);
                this.scrollTop = this.$refs.tabControl2.$el.offsetTop;
            }

        },
        components: {
            goodList,
            headerBar,
            swiper,
            reviews,
            tabControl,
            scroll,
            backTop
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
      position: absolute;
      width: 100%;
      z-index: 10;
    }

    //滚动区域
    .scrollContent {
      .value_el(height, 1150vw);
      overflow: hidden;
    }
  }


</style>

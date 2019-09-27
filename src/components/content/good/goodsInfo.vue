<template>
  <div class="page">
    <!--  导航栏-->
    <headerBar class="header">
      <div slot="left" @click="$router.go(-1)" class="back"><i class="iconfont iconfanhui1"></i></div>
      <div slot="center" class="active">壁纸</div><div slot="center">详情</div><div slot="center">更多</div>
    </headerBar>

    <scroll class="scrollContent" ref="scroll">
    <div class="img_list">
      <ul v-if="goodInfoList.bannerList.length!==0">
        <li v-for="(item,index) in goodInfoList.bannerList[id]" :key="index+'img'">
          <img :src="item" class="img_item"/>
        </li>
      </ul>
    </div>

    <!--详情信息-->
    <div class="title">
      <h3>{{$route.params.title}}</h3>
      <p>作者：<span>{{getMesList().author}}</span></p>
      <ul>
        <li>热度：<span>{{getMesList().hot}}</span></li>
        <li>下载数：<span>{{getMesList().down}}</span></li>
        <li>发布时间：<span>{{getMesList().date}}</span></li>
      </ul>
    </div>
    </scroll>

  </div>
</template>

<script>
    import headerBar from "components/commons/headerBar";
    import {mainGoodsInfo} from "serves/main";
    import scroll from "components/commons/scroll/scroll";

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
                goodInfoList:{
                    idArr:[],
                    bannerList:[],
                    mesList:[]
                },
                id: 0,
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
                this.id = parseInt(this.$route.params.id);

                this.initGoodInfoList();//初始化商品详情数组
                this.initSessionPage();//设置不同的页面缓存
            },
            //获取商品详情
            getMesList() {
                if(this.goodInfoList.mesList[this.id] === undefined){
                    console.log('sasa');
                    return "获取失败"
                }else{
                    return this.goodInfoList.mesList[this.id]
                }
            },
            //第一次进入页面存储初始化商品详情
            initGoodInfoList() {
                if (!JSON.parse(sessionStorage.getItem("goodInfoList"))) {
                    sessionStorage.setItem("goodInfoList", JSON.stringify(this.goodInfoList));
                }
            },
            //设置每次进入详情页的内容
            initSessionPage() {
                //判断如果曾经进入过的页面，就不发送请求接口，直接读取本地缓存的数据
                if (sessionStorage.getItem("goodInfoList") && JSON.parse(sessionStorage.getItem("goodInfoList")).idArr.includes(this.id)) {
                    this.goodInfoList = JSON.parse(sessionStorage.getItem("goodInfoList"));

                    console.log(JSON.parse(sessionStorage.getItem("goodInfoList")).idArr.includes(this.id));
                } else {
                    //如果每次进入新的页面
                    mainGoodsInfo(this.id).then(res => {
                        //先将本地存储的id取出，push到idArr数组，再存储到本地数据
                        this.goodInfoList = JSON.parse(sessionStorage.getItem("goodInfoList"));

                        //获取接口数据添加到本地
                        this.goodInfoList.idArr.push(this.id);
                        this.goodInfoList.bannerList.push(res.data.list.goodsInfo.banner.img);
                        this.goodInfoList.mesList.push(res.data.list.goodsInfo.mes);

                        //存储到本地数据
                        sessionStorage.setItem("goodInfoList", JSON.stringify(this.goodInfoList));

                        console.log(JSON.parse(sessionStorage.getItem("goodInfoList")));
                        console.log(this.goodInfoList.mesList);
                    })
                }
            },


            swiperLoad() {

            }
        },
        components: {
            headerBar,
            swiper,
            swiperSlide,
            scroll
        }
    }
</script>

<style scoped lang="less">
  @import "~assets/style/base.less";

  .page{
    position: relative;
    z-index: 5;
    background-color: #fff;

    //导航栏
    .back {
      i {
        .value_fs(40vw);
      }
    }
    .headerBar{
      position: absolute;
      background-color: rgba(0,0,0,0.4);
    }
    .active{
      color: #f4a7b9!important;
    }

    //轮播图
    .goodSwiper {
      .value_el(height, 1000vw);

      .title-img {
        .value_el(height, 1000vw);
      }
    }

    //壁纸列表
    .img_list{
      .img_item {
        .value_el(height, 1000vw);
      }
    }

    //商品标题
    .title {
      margin-top: 1vw;
      padding: 2vw;
      border-bottom: 1vw solid #F4F4F4;

      h3 {
        .value_fs(35vw);
        color: @font-color;
        .value_mb(20vw);
        float: left;
      }

      ul {
        display: flex;
        justify-content: space-between;
        .value_mb(20vw);
        clear: both;

        li {
          .value_fs(24vw);
          color: #666666;
          span {
            .value_fs(26vw);
          }

          &:first-of-type {
            span {
              color: #FE5455;
            }
          }
          &:nth-of-type(2) {
            span {
              color: #00A1D6;
            }
          }
          &:nth-of-type(3) {
            span {
              color: #54D7C9;
            }
          }
        }
      }
      p{
        float: right;
        .value_fs(24vw);
        color: #666666;
        line-height: 7.5vw;
      }
    }

    //滚动区域
    .scrollContent {
      height: 177vw;
      overflow: hidden;
    }
  }



</style>

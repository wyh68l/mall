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
        <li v-for="(item,index) in goodInfoList.bannerList[arrIndex]" :key="index+'img'">
          <img :src="item" class="img_item"/>
        </li>
      </ul>
    </div>

    <!--详情信息-->
    <div class="title" v-if="goodInfoList.bannerList.length!==0">
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
                arrIndex:null
            }
        },
        created() {
            this.getGoodsInfoList();
        },
        /*
        * 原理：
        * 由于接口不能根据id来返回相应的数据，且每次进入都会刷新页面数据，所以通过本地保存每次请求的随机数据，来达到商品的缓存效果
        * 分为首次进入，每次新进入，曾经进入页面来判断
        * 首次进入先初始化，将空的goodInfoList存入本地
        *
        * 每次新进入，都先将本地旧的数据取出，再获取当前页面的接口数据（图片，id，信息），push子数组进去，形成二维数组，再保存到本地
        * 其中页面数据应该显示为二维数组的最后一个子数组的数据，所以将arrIndex为二维数组length-1
        *
        * 曾经进入过的页面，首先通过include遍历查找子数组是否有保存过id，有的话，就是曾经进入过的页面
        * 这时候就直接将本地保存的数据传入goodInfoList二维数组中，注意的是：
        * 由于每次保存的id数组和img数组的长度总是相对应的，所以要通过查找到id子数组的下标来对应img子数组的下标
        * 所以idArr就应该赋值为对应的id子数组对应的下标
        * */
        methods: {
            getGoodsInfoList() {
                this.id = parseInt(this.$route.params.id);

                this.initGoodInfoList();//初始化商品详情数组
                this.initSessionPage();//设置不同的页面缓存
            },
            //获取商品详情
            getMesList() {
                // console.log(this.goodInfoList.mesList);
                if(this.goodInfoList.mesList[this.arrIndex] === undefined){
                    console.log("信息获取失败");
                }else{
                    return this.goodInfoList.mesList[this.arrIndex]
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
                let getItem = JSON.parse(sessionStorage.getItem("goodInfoList"));
                //判断如果曾经进入过的页面，就不发送请求接口，直接读取本地缓存的数据
                if (sessionStorage.getItem("goodInfoList") && getItem.idArr.includes(this.id)) {
                    this.arrIndex = getItem.idArr.indexOf(this.id);
                    this.goodInfoList = getItem;

                    this.arrIndex = getItem.idArr.indexOf(this.id);

                    console.log(this.arrIndex);
                    console.log(getItem.idArr.includes(this.id));
                    console.log(this.goodInfoList);
                } else {
                    //如果每次进入新的页面
                    mainGoodsInfo(this.id).then(res => {
                        let getItem = JSON.parse(sessionStorage.getItem("goodInfoList"));
                        //先将本地存储的id取出，push到idArr数组，再存储到本地数据
                        this.goodInfoList = getItem;

                        //获取接口数据添加到本地
                        this.goodInfoList.idArr.push(this.id);
                        this.goodInfoList.bannerList.push(res.data.list.goodsInfo.banner.img);
                        this.goodInfoList.mesList.push(res.data.list.goodsInfo.mes);

                        //存储到本地数据
                        sessionStorage.setItem("goodInfoList", JSON.stringify(this.goodInfoList));

                        //将新添加的下标赋值給arrIndex
                        this.arrIndex = this.goodInfoList.bannerList.length - 1;

                        console.log(getItem);
                        console.log(this.goodInfoList.mesList);
                        console.log(this.arrIndex);
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

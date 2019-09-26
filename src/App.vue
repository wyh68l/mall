<template>
  <div id="app">
    <!--主页面-->
    <!-- keep-alive要使用exclude排除里面的商品详情页面，否则不会刷新商品详情的id-->
    <!--exclude排除的是组件的name值-->
      <keep-alive exclude="goodsInfo">
        <router-view></router-view>
      </keep-alive>
    <footerBar></footerBar>
  </div>
</template>


<script>
    import footerBar from "components/commons/footerBar";
    import router from "./router";
    import $ from 'jquery'

    export default {
        name: 'app',
        components: {
            footerBar
        },
        created(){
            this.clickStyle();
        },
        methods:{
            //鼠标点击效果
            clickStyle(){
                /* 鼠标点击特效 */
                var a_idx = 0;
                $().ready(function($) {
                    $("body").click(function(e) {
                        var a = [
                            "2333~", "爱我别走", "哼哼", "点我干嘛", "啦啦啦~", "吼吼~", "发现一个bug",
                            "rap", "篮球", "跳", "开炮~", "唱"
                        ];
                        var $i = $("<span/>").text(a[a_idx]);
                        a_idx = (a_idx + 1) % a.length;
                        var x = e.pageX,
                            y = e.pageY;
                        $i.css({
                            "z-index": 100000000,
                            "top": y - 20,
                            "left": x,
                            "position": "absolute",
                            "font-weight": "bold",
                            "color": "#ff6651"
                        });
                        $("body").append($i);
                        $i.animate({
                                "top": y - 180,
                                "opacity": 0
                            },
                            1500,
                            function() {
                                $i.remove();
                            });
                    });
                });
            }
        },
        router
    }
</script>

<style scoped lang="less">
  @import "assets/style/base.less";
  #app{
  }
</style>

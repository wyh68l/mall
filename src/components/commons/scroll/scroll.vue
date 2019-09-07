<template>
  <div class="wrapper" ref="content">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "scroll",
        data() {
            return {
                scroll: null,
                Show: false
            }
        },
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullType: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.scrollCreate();
        },
        methods: {
            //返回顶部----scrollTop是插件的方法
            backTop(x, y, time) {
                this.scroll.scrollTo(x, y, time);
            },
            scrollCreate() {
                /*默认情况下BScroll不可以实时监听滚动 probeType
                * 0,1都是不监听
                * 2是只监听手指滑动的时候滚动，惯性滑动监听
                * 3监听所有滑动滚动
                *
                * 默认情况下在BScroll包裹的范围内，会阻止点击事件
                * 所以要开启click：true
                *
                *pullUpload为监听上拉底部事件，默认只能拉一次，要多次监听，必须拉完后执行一次finishPullUp方法
                * */
                this.scroll = new BScroll(this.$refs.content, {
                    click: true,
                    probeType: this.probeType,//根据不同的需求判断是否要监听滚动事件，默认为0
                    pullUpLoad: this.pullType
                })

                //监听滚动事件
                this.scroll.on('scroll', (position) => {
                    this.$emit('showStatus', position)
                })

                //监听上拉事件
                this.scroll.on('pullingUp', () => {
                    this.$emit('pullMore')
                })
            },
            //完成上拉
            finishPull() {
                this.scroll.finishPullUp()
            },

            //解决卡顿问题
            imgRefresh() {
                this.scroll.refresh();
            }

        }
    }
</script>

<style scoped lang="less">
  @import "~assets/style/base.less";

</style>

<template>
  <div class="TabControl">
    <ul>
      <li v-for="(item,index) in titleList" :key="index" @click="isActice(index)" :class="currentIndex === index?'active':''">
        {{item}}<span></span>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "TabControl",
        data(){
            return {
                currentIndex:0
            }
        },
        props: {
            titleList: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        methods:{
            isActice(index){
                this.currentIndex = index;
                this.$emit('tabClick',index);
            }
        }
    }
</script>

<style scoped lang="less">
  @import "~assets/style/base.less";

  .TabControl {
    background-color: #fff;
    .value_el(height, 80vw);
    ul {
      display: flex;
      justify-content: space-around;
      .value_el(height, 80vw);
      align-items: center;

      li {
        .value_fs(30vw);
        position: relative;
        text-align: center;
        color: @font-color;

        span {
          position: absolute;
          display: block;
          border-radius: 20%;
          .value_el(width, 60vw);
          .value_el(height, 3vw);
          .value_mt(5vw);
        }
      }
      .active{
        color: @bg-pink;
        span{
          background-color: @bg-pink;
        }
      }
    }
  }


</style>

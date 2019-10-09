<template>
    <div class="Toast" v-show="isShow">
        <p>{{mes}}</p>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        data(){
            return {
                mes:'',
                isShow:false
            }
        },
        methods:{
            show(res='哈哈哈',delay=2000){
                this.mes = res
                this.isShow = true
                setTimeout(()=>{
                    this.isShow = false;
                },delay)
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~assets/style/base.less";
  .Toast{
    padding: 2vw;
    position: fixed;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,0.5);
    border-radius: 3vw;

    p{
      color: #fff;
      .value_fs(30vw);
    }
  }

</style>

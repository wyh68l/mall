/*
* mixins混入--vue高级用法
* 通过vue的mixins混入属性，可以提取不同组件的中相同的功能，提高代码的复用性
*就像是额外创建组件一样，将重复的功能提取出来，再通过在不同的组件中引用
* 再在vue实例中引入mixins:[引入的功能名如：back]就可以实现功能的复用了
*
* 不管是data，methods，created，components等等都可以进行混入，
* 就像额外写一个新组件一样
* */

export const back = {
  methods:{
    //回到顶部
    backTop(){
      this.$refs.scroll.backTop(0, 0, 800);//通过#refs.属性名.可以获取到组件的属性和方法
    }
  }
}

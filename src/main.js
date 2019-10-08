import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from "./router";


Vue.config.productionTip = false

//注册事件总线
//在一些不大的项目中，非父子组件之间的传信，用vuex过于麻烦，所以可以引入事件总线来进行组件的传信
Vue.prototype.$bus = new Vue();

/*
* Vue.prototype.$bus = new Vue();//先注册$bus
*
// A组件通过$emit触发当前实例上的事件
this.$bus.$emit('myChange');
*
// B组件通过$on监听当前实例上的自定义事件
this.$bus.$on('myChange', () => {
    // 拿到传过来的数据进行你的操作
});
* */


new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

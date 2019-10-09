import Vue from 'vue'
import vuex from 'vuex'
import getters from "./getters";
import mutations from "./mutations";
Vue.use(vuex)

//创建状态管理
const store = new vuex.Store({
  state:{
    carList:[],//购物车
    priceSum:0,//购物车总价格
    isAllChecked:true,//默认全选
  },
  mutations,
  getters
});


//导出
export default store;


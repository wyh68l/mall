import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/*定义阻止重复点击相同路由报错方法*/
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}


//主页面
const Main = () => import ("views/main/index")
const Category = () => import ("views/category/index")
const Mine = () => import ("views/mine/index")
const ShopCar = () => import ("views/shopCar/index")

//商品详情页
const GoodsInfo = () => import ("components/content/good/goodsInfo")



const routes = [

  /*主页面*/
  {
    path: '/',
    redirect:{name:'Main'}
  },
  {
    path:'/main',
    name:'Main',
    component:Main,
  },
  {
    path:'/category',
    name:'Category',
    component:Category
  },
  {
    path:'/mine',
    name:'Mine',
    component:Mine
  },
  {
    path:'/shopCar',
    name:'ShopCar',
    component:ShopCar
  },
  {
    path:'/main/goodsInfo/id=:id',
    name: 'GoodsInfo',
    component:GoodsInfo
  }
]


//初始化导出
const router = new Router({
  routes,
  mode:'history'
});

export default router;

import {request} from './serves'

//首页基础数据的接口
export function getMainData() {
  return request({
    url:'/example/mainData'
  })
}

//首页商品的接口
export function getMainGoods(type,page) {
  return request( {
    url:'/example/mainGoods',
    params:{type, page}
  })
}

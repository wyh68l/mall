import {request,requestMock} from './serves'

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

//首页mock模拟的接口
export function getMainMock(type) {
  return requestMock( {
    url:'/mock',
    params: {type}
  })
}

//首页mock模拟的接口2.0
export function mainGoodsTest2(type) {
  return requestMock( {
    url:'/mock',
    params: {type}
  })
}

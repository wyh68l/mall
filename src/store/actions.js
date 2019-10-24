export default {
  //添加不同的商品
  addCar(context,payload){
    return new Promise((resolve) => {
      context.state.carList.push(payload)
      resolve('已添加到购物车哦~')
    })

  },

  //将相同的商品数量加一
  addCarSum(context, payload) {
    return new Promise(resolve => {
      context.state.carList[payload].sum++;
      resolve('商品数量加一哦~')
    })
  },
}

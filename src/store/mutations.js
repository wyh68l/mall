export default {
  //添加不同的商品
  addCar(state,payload){
    state.carList.push(payload)
  },

  //将相同的商品数量加一
  addCarSum(state, payload) {
    state.carList[payload].sum++;
  },

  //获取购物车总价格
  getPriceSum(state) {
    state.priceSum = 0;
    state.carList.forEach((item) => {
      state.priceSum += item.price * item.sum;
    })
  }
}

export default {
  //获取购物车总种类
  goodsLength(state){
    return state.carList.length;
  },

  //获取购物车总价格
  getPriceSum(state) {
    state.priceSum = 0;
    state.carList.forEach((item) => {
      if(item.isCheck){
        state.priceSum += item.price * item.sum;
      }
    })
    return state.priceSum;
  },

  //判断购物车是否全选---根据单选框的数量来决定全选框的状态
  getAllCheckState(state){
    let index = 0;
    state.carList.forEach((item) => {
      if(item.isCheck){
        index++;
      }
    })
    if(index < state.carList.length){
        return state.isAllChecked = false
    }else{
        return state.isAllChecked = true
    }
  }

}

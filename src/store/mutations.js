export default {
  // //添加不同的商品
  // addCar(state,payload){
  //   state.carList.push(payload)
  // },
  //
  // //将相同的商品数量加一
  // addCarSum(state, payload) {
  //   state.carList[payload].sum++;
  // },

  //改变购物车单选框选中状态
  setCheckState(state,payload) {
    return state.carList[payload].isCheck = !state.carList[payload].isCheck;
  },

  //改变全选购物车选中状态---根据全选框来改变单选框
  setCheckAllState(state,payload) {
    if(state.isAllChecked){
      if(state.carList.length-1 === payload){
        state.isAllChecked = false
      }
      return state.carList[payload].isCheck = false;
    }else{
      if(state.carList.length-1 === payload){
        state.isAllChecked = true
      }
      return state.carList[payload].isCheck = true;
    }
  }

}

import Toast from "./Toast";

const obj = {}

obj.install = function (vue) {
  console.log('hhhhh');
  //创建组件构造器
  const toastContrustor= vue.extend(Toast)

  //使用new的方式，创建组件对象
  const toast = new toastContrustor()

  //将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  //toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  vue.prototype.$toast = toast;

}

export default obj


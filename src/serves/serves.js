import axios from 'axios'

export function request(config) {
  //创建axios的实例
  const Instance= axios.create({
    baseURL:'https://www.easy-mock.com/mock/5d5f811e065c2c2355c8ee03',
    timeOut:5000
  })

  //创建拦截器
  Instance.interceptors.request.use(config =>{
    return config
  },err =>{
    console.log(err);
  })

  //获取响应体中的data部分
  Instance.interceptors.response.use(res =>{
    return res.data
  },err =>{
    console.log(err);
  })

  //返回请求结果
  return Instance(config)
}

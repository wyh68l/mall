//防抖函数---如果每次获取图片数据都刷新scroll高度，就会执行imgRefresh多次，影响性能
//所以定义防抖函数，可以设置在一定时间内，函数只能执行一次
/*原理：
* 每一次执行函数都会设置延迟时间，但由于执行函数的次数很多
* 所以在每次函数被延迟后，还没执行，就会被下一次函数进来取消掉前次函数的执行的定时器
* 依次类推，在最后一次函数执行后，没有函数进来取消掉定时器，所以只会进行很少次数（最少一次，取决于延迟时间）
* */
export function debounce(func,delay){
  let time = null;
  return function(){
    if(time) clearTimeout(time);
    time = setTimeout(()=> {
      func.apply(this)
    },delay)
  }

}

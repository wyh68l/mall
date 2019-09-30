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


//格式化时间
export default Date.prototype.format = function(formatStr){
  var str = formatStr;
  str=str.replace(/yyyy|YYYY/,this.getFullYear());
  str=str.replace(/MM/,(this.getMonth()+1)>9?(this.getMonth()+1).toString():'0' + (this.getMonth()+1));
  str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
  str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
  str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
  str=str.replace(/ss/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
  return str;
} 

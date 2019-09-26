import Mock from 'mockjs'

//图片接口
/*
*  https://api.ixiaowai.cn/api/api.php
*  https://api.ixiaowai.cn/mcapi/mcapi.php
*  https://api.ixiaowai.cn/gqapi/gqapi.php
*  https://acg.sx/images
*  http://lorempixel.com/1600/900
   https://unsplash.it/1600/900?random（国内加载略慢）
   https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture【返回必应图片】​
   https://uploadbeta.com/api/pictures/random/?key=%E6%8E%A8%E5%A5%B3%E9%83%8E【随机美女图片】
   https（推荐）：
   https://img.xjh.me/random_img.php?type=bg&ctype=acg&return=302
   http（更快，快一点点，不安全，可能会被劫持）：
   http://img.xjh.me/random_img.php?type=bg&ctype=acg&return=302
* */

//随机循环图片地址
let sum = 12;
function randomImgSrc(num = 11) {
  let randomId = null;
  let img = {
    imgSrcMob:[],//移动端
    imgSrcPc:[]//PC端
  };
  for(let i=0;i<=num;i++){
    randomId = parseInt(Math.random()*1000);
    img.imgSrcMob[i] = "https://img.xjh.me/random_img.php?type=bg&ctype=acg&return=302&device=mobile&timestamp="+randomId;
    img.imgSrcPc[i] = "https://img.xjh.me/random_img.php?type=bg&ctype=acg&return=302&timestamp="+randomId;
  }
  return img
}

//模拟首页商品数据
export function mainGoodsMock(type,page) {
  return {
    success: true,
    "data": {
      list: function () {
        if (type === 'pop') {
          if (parseInt(page) === 1) {
            return Mock.mock({
              "type|12":["pop"],
              // "img": randomImgSrc().imgSrcMob,
               "img|12": ["https://dummyimage.com/200x300.png/00A1D6/ffffff&text=商品"],
              "goodsInfo|3": [
                // "狼爪T恤男短袖夏宽松圆领快干吸湿透气休闲",
                // "骆驼户外冲锋衣男加绒加厚三合一防寒登山服",
                // "百搭打底衫男士弹力修身厚高领纯色长袖T恤",
                // "CANADA GOOSE / 加拿大鹅 Kent夹克 2412M"
                "唯美意境动漫美女图片桌面壁纸",
                "唯美动漫美女插画桌面壁纸",
                "迷人动漫美女图片桌面壁纸",
                "动画电影《罗小黑战记》桌面壁纸"
              ]
            })
          } else if (parseInt(page) === 2) {
            return Mock.mock({
              "type|12":["pop"],
              "img": randomImgSrc().imgSrcMob,
              // "img|20": ["https://dummyimage.com/200x300.png/FB7299/ffffff&text=商品"],
              "goodsInfo|3": [
                // "旅行包时尚潮流手提包运动健身包男士",
                // "Nike 耐克官方NIKE AIR MAX 270 REACT男子运动鞋",
                // "Nike耐克鞋男鞋2019春秋轻便透气网面缓震跑步鞋",
                // "耐克Nike Mid Blazer开拓者男女复古休闲鞋"
                "性感动漫美女插画桌面壁纸",
                "甜美动漫美女插画桌面壁纸",
                "甜美二次元美女高清桌面壁纸",
                "精选唯美初音未来桌面壁纸"
              ],
            })
          } else {
            return {
              mes: "没有更多了"
            }
          }
        } else if (type === 'news') {
          if (parseInt(page) === 1) {
            return Mock.mock({
              "type|12":["news"],
              "img": randomImgSrc().imgSrcMob,
              // "img|20": ["https://dummyimage.com/200x300.png/FB7299/ffffff&text=商品"],
              "goodsInfo|3": [
                "精美二次元动漫插画桌面壁纸",
                "精美动漫萝莉美女图片桌面壁纸",
                "二次元美女高清桌面壁纸",
                "软萌可爱的康娜桌面壁纸"
              ]
            })
          } else if (parseInt(page) === 2) {
            return Mock.mock({
              "type|12":["news"],
              "img": randomImgSrc().imgSrcMob,
              // "img|20": ["https://dummyimage.com/200x300.png/00A1D6/ffffff&text=商品"],
              "goodsInfo|3": [
                // "狼爪T恤男短袖夏宽松圆领快干吸湿透气休闲",
                // "骆驼户外冲锋衣男加绒加厚三合一防寒登山服",
                // "百搭打底衫男士弹力修身厚高领纯色长袖T恤",
                // "CANADA GOOSE / 加拿大鹅 Kent夹克 2412M"
                "唯美意境动漫美女图片桌面壁纸",
                "唯美动漫美女插画桌面壁纸",
                "迷人动漫美女图片桌面壁纸",
                "动画电影《罗小黑战记》桌面壁纸"
              ]
            })
          } else {
            return {
              mes: "没有更多了"
            }
          }
        } else if (type === 'sell') {
          if (parseInt(page) === 1) {
            return Mock.mock({
              "type|12":["sell"],
               "img": randomImgSrc().imgSrcMob,
              //"img|20": ["https://dummyimage.com/200x300.png/F98148/ffffff&text=商品"],
              "goodsInfo|3": [
                // "李宁跑步鞋女2019新款减震耐磨防滑情侣鞋",
                // "李宁休闲鞋男鞋行云网面一脚蹬袜子鞋",
                // "李宁篮球鞋男鞋韦德之道7飒缪空袭4悟道2.3",
                // "李宁泳衣女遮肚显瘦性感2019新款游泳衣"
                "性感动漫美女插画桌面壁纸",
                "甜美动漫美女插画桌面壁纸",
                "甜美二次元美女高清桌面壁纸",
                "精选唯美初音未来桌面壁纸"
              ]
            })
          } else if (parseInt(page) === 2) {
            return Mock.mock({
              "type|12":["sell"],
              "img": randomImgSrc().imgSrcMob,
              //"img|20": ["https://dummyimage.com/200x300.png/FB7299/ffffff&text=商品"],
              "goodsInfo|3": [
                // "旅行包时尚潮流手提包运动健身包男士",
                // "Nike 耐克官方NIKE AIR MAX 270 REACT男子运动鞋",
                // "Nike耐克鞋男鞋2019春秋轻便透气网面缓震跑步鞋",
                // "耐克Nike Mid Blazer开拓者男女复古休闲鞋"
                "精美二次元动漫插画桌面壁纸",
                "精美动漫萝莉美女图片桌面壁纸",
                "二次元美女高清桌面壁纸",
                "软萌可爱的康娜桌面壁纸"
              ]
            })
          } else {
            return {
              mes: "没有更多了"
            }
          }
        } else {
          return 'fail'
        }
      }
    }
  }
}

//模拟首页banner
export function mainBannerMock(){
  return {
    success: true,
    "data": {
      list: function () {
        return Mock.mock({
          "type":["banner"],
          "img": randomImgSrc(3).imgSrcPc
        })
      }
    }
  }
}

//模拟首页商品详情
export function goodsInfoMock(id){
  return {
    success: true,
    "data": {
      list: function () {
        return Mock.mock({
          "goodsInfo":{
            "id":id,
            banner:{
              "img": randomImgSrc(3).imgSrcPc
            },
            mes:{
              "sellSum":(id+1)*125,
              "price":(id+1)*15
            }
          }
        })
      }
    }
  }
}

//模拟首页分栏
export function mainReviewsMock(){
  return {
    success: true,
    "data": {
      'reviews': function () {
        return Mock.mock({
          "type":["cosplay","日漫","国漫","排行",],
          "img": [
            "https://dummyimage.com/200x300.png/00A1D6/ffffff&text=cosplay",
            "https://dummyimage.com/200x300.png/00A1D6/ffffff&text=日漫",
            "https://dummyimage.com/200x300.png/00A1D6/ffffff&text=国漫",
            "https://dummyimage.com/200x300.png/00A1D6/ffffff&text=排行",
          ]
        })
      }
    }
  }
}







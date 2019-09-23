import Mock from 'mockjs'

export function mainGoodsTest(type,page) {
  return {
    success: true,
    "data": {
      list: function () {
        if (type === 'pop') {
          if (parseInt(page) === 1) {
            return Mock.mock({
              "type|20":["pop"],
              "img|20": ["https://dummyimage.com/200x300.png/00A1D6/ffffff&text=商品"],
              "goodsInfo|5": [
                "狼爪T恤男短袖夏宽松圆领快干吸湿透气休闲",
                "骆驼户外冲锋衣男加绒加厚三合一防寒登山服",
                "百搭打底衫男士弹力修身厚高领纯色长袖T恤",
                "CANADA GOOSE / 加拿大鹅 Kent夹克 2412M"
              ]
            })
          } else if (parseInt(page) === 2) {
            return Mock.mock({
              "type|20":["pop"],
              "img|20": ["https://dummyimage.com/200x300.png/FB7299/ffffff&text=商品"],
              "goodsInfo|5": [
                "旅行包时尚潮流手提包运动健身包男士",
                "Nike 耐克官方NIKE AIR MAX 270 REACT男子运动鞋",
                "Nike耐克鞋男鞋2019春秋轻便透气网面缓震跑步鞋",
                "耐克Nike Mid Blazer开拓者男女复古休闲鞋"
              ]
            })
          } else {
            return {
              mes: "没有更多了"
            }
          }
        } else if (type === 'news') {
          if (parseInt(page) === 1) {
            return Mock.mock({
              "type|20":["news"],
              "img|20": ["https://dummyimage.com/200x300.png/FB7299/ffffff&text=商品"],
              "goodsInfo|5": [
                "旅行包时尚潮流手提包运动健身包男士",
                "Nike 耐克官方NIKE AIR MAX 270 REACT男子运动鞋",
                "Nike耐克鞋男鞋2019春秋轻便透气网面缓震跑步鞋",
                "耐克Nike Mid Blazer开拓者男女复古休闲鞋"
              ]
            })
          } else if (parseInt(page) === 2) {
            return Mock.mock({
              "type|20":["news"],
              "img|20": ["https://dummyimage.com/200x300.png/00A1D6/ffffff&text=商品"],
              "goodsInfo|5": [
                "狼爪T恤男短袖夏宽松圆领快干吸湿透气休闲",
                "骆驼户外冲锋衣男加绒加厚三合一防寒登山服",
                "百搭打底衫男士弹力修身厚高领纯色长袖T恤",
                "CANADA GOOSE / 加拿大鹅 Kent夹克 2412M"
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
              "type|20":["sell"],
              "img|20": ["https://dummyimage.com/200x300.png/F98148/ffffff&text=商品"],
              "goodsInfo|5": [
                "李宁跑步鞋女2019新款减震耐磨防滑情侣鞋",
                "李宁休闲鞋男鞋行云网面一脚蹬袜子鞋",
                "李宁篮球鞋男鞋韦德之道7飒缪空袭4悟道2.3",
                "李宁泳衣女遮肚显瘦性感2019新款游泳衣"
              ]
            })
          } else if (parseInt(page) === 2) {
            return Mock.mock({
              "type|20":["sell"],
              "img|20": ["https://dummyimage.com/200x300.png/FB7299/ffffff&text=商品"],
              "goodsInfo|5": [
                "旅行包时尚潮流手提包运动健身包男士",
                "Nike 耐克官方NIKE AIR MAX 270 REACT男子运动鞋",
                "Nike耐克鞋男鞋2019春秋轻便透气网面缓震跑步鞋",
                "耐克Nike Mid Blazer开拓者男女复古休闲鞋"
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


export function getUserList(type) {
  let List = []
  const count = 20


  console.log(type);

  for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1)
    }))

    if (type === 'birth') {
      return {
        code: 1,
        data: {
          mes: 'success',
          birth: List[i].birth
        }
      }
    } else {
      return {
        code: 0,
        data: {
          mes: '获取失败'
        }
      }
    }
  }

}





#
#   @authors Alones (7242586@qq.com)
#   @date    2019-03-14 23:29:02
#

# host: localhost:3000/

# 查看所有订单信息
# api: order/allOrder
# methods: get
# req:
# res: {code:200, data: {
#       total: 0, //总数
#       data: []  //订单数据
#      }}

# 新增订单
# api: order/addOrder
# methods: post
# req: {
#   oName       客户名称
#   oTel        客户电话
#   oAddress    客户地址
#   oType       服务类型
#   oTime       预约时间
#   oRemark     备注
#   openId      唯一标识
# }
# res:
#   true: {{code: 200, msg: '下单成功'}}
#   false: {{code: 3000, msg: '下单失败'}}
#
# test : http://localhost:3000/order/addorder?oName=%E9%B8%A1%E5%84%BF&oTel=13800138000&oAddress=%E4%B8%AD%E5%9B%BD%E5%B9%BF%E4%B8%9C%E7%9C%81%E6%B7%B1%E5%9C%B3%E5%B8%82&oTime=0&oRemark=%E9%80%9F%E5%BA%A6%E8%A6%81%E5%BF%AB%E5%8A%A8%E4%BD%9C%E8%A6%81%E5%B8%85&openId=aw1rf8564v13a2w5f4a1w23rf5r1aqwe&oType=1
#
#
#

# 取消订单
# api: order/delorder
# methods: post
# req: {
#   oId       订单号  --> md5(md5(md5(oId))) + 'xn'
# }
# res:
#   {{code: 200, msg: '取消订单成功'}}

# 修改订单状态
# api: order/editstate
# methods: post
# req: {
#   oId       订单号  --> md5(md5(md5(oId))) + 'xn'
#   oState    订单状态
# }
# res:
#   {{code: 200, msg: '修改订单成功'}}

# 客户评价
# api: order/addevaluate
# methods: post
# req: {
#   oId       订单号  --> md5(md5(md5(oId))) + 'xn'
#   evaluate  评价
# }
# res:
#   {{code: 200, msg: '评价成功'}}

# 用户订单
# api: order/userorder
# methods: get
# req: {
#   openId       唯一密钥
# }
# res: {code:200, 
#       data: {
#               total: 0, //总数
#               data: []  //订单数据
#             }
#       msg: '请求成功'
#      }

# 用户订单
# api: order/getorder
# methods: get
# req: {
#   str       (可传 手机号码 or 订单号(无需加密))
# }
# res: {code:200, 
#       data: {
#               total: 0, //总数
#               data: []  //订单数据
#             }
#       msg: '查询成功'
#      }


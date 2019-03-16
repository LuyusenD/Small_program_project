#
#   @authors Alones (7242586@qq.com)
#   @date    2019-03-16 17:29:02
#

# host: localhost:3000/

# 获取openId && 秘钥
# api: user/getopenid
# methods: get
# req: {
#   code     
#   appid    
# }
# res:
#   {{code: 200, data: {openId: '', session_key: ''}, msg: '请求openid成功'}}

# 添加用户信息
# api: user/adduser
# methods: post
# req: {
#   openId
#   img
#   name
#   sex
#   address
# }
# res:
#   {{code: 200, data: null, msg: '登记用户成功'}}
#

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

# 后台管理 - 登录
# api: user/login
# methods: post
# req: {
#   username
#   password
# }
# res:
#   {{code: 200, data: {id,name}, msg: '登录成功'}}

# 后台管理 - 退出登录
# api: user/out
# methods: post
# req: {
#   id
#   username
# }
# res:
#   {{code: 200, data: null, msg: '退出登录成功'}}

# 后台管理 - 添加管理用户
# api: user/addadmin
# methods: post
# req: {
#   adminId    //当前用户id
#   adminName  //当前用户name
#   username   //当前新增name
#   password   //当前新增密码
# }
# res:
#   {{code: 200, data: null, msg: '新增成功'}}

# 后台管理 - 删除管理用户
# api: user/deladmin
# methods: post
# req: {
#   username   //注销用户的name
#   id         //注销用户的id
# }
# res:
#   {{code: 200, data: null, msg: '注销用户成功'}}

# 后台管理 - 修改密码
# api: user/forget
# methods: post
# req: {
#   username   //用户的name
#   id         //用户的id
#   oldpassword   //原密码
#   newpassword   //新密码
# }
# res:
#   {{code: 200, data: null, msg: '修改密码成功'}}
#

import { Context } from 'koa'

import app from '../app'

const {
  PHONENUMBER_HAS_BEEN_LOGINED,
  PHONE_OR_PASSWORD_IS_REQUIRED,
  USER_NOT_EXISTS,
  PASSWORD_ERROR,
  NOT_BRING_TOKEN,
  Autho_INFO_ERROR,
  MOMENT_CONTENT_CAN_NOT_BE_BLANK,
  OPERTER_NOT_ALLOWED
} = require('../constants')

app.on('error', (reason: string, ctx: Context) => {
  let code = '9999'
  let message = '未知的错误'

  switch (reason) {
    case PHONENUMBER_HAS_BEEN_LOGINED:
      code = '-1001'
      message = '该手机号已经被注册过了！'
      break
    case PHONE_OR_PASSWORD_IS_REQUIRED:
      code = '-1002'
      message = '用户名或密码不能为空'
      break
    case USER_NOT_EXISTS:
      code = '-1003'
      message = '该账号还未注册~'
      break
    case PASSWORD_ERROR:
      code = '-1004'
      message = '密码错误'
      break
    case NOT_BRING_TOKEN:
      code = '-1005'
      message = '未携带token'
      break
    case Autho_INFO_ERROR:
      code = '-1006'
      message = '授权信息错误！'
      break
    case MOMENT_CONTENT_CAN_NOT_BE_BLANK:
      code = '-1007'
      message = '动态内容不能为空'
      break
    case OPERTER_NOT_ALLOWED:
      code = '2001'
      message = '对该条评论无此操作权限'
      break
  }

  ctx.body = { code, message }
})

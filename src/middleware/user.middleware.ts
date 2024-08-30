import userService from '../services/user.service'
import md5Password from '../utils/md5_password'
import {
  PHONE_OR_PASSWORD_IS_REQUIRED,
  PHONENUMBER_HAS_BEEN_LOGINED
} from '../constants'
import { Context } from 'koa'

const verify = async (ctx: Context, next: any) => {
  const { password, phone } = ctx.request.body as IRequestBody
  //判断用户名或密码是否为空
  if (!phone || !password) {
    return ctx.app.emit('error', PHONE_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  //判断手机号是否被注册过
  if (await userService.isExist(ctx)) {
    return ctx.app.emit('error', PHONENUMBER_HAS_BEEN_LOGINED, ctx)
  }

  await next()
}
//密码加密
const handelPassword = async (ctx: Context, next: any) => {
  const body = ctx.request.body as IRequestBody
  const password = body.password as string
  body.password = md5Password(password)
  await next()
}

export { verify, handelPassword }

import {
  PHONE_OR_PASSWORD_IS_REQUIRED,
  USER_NOT_EXISTS,
  PASSWORD_ERROR,
  NOT_BRING_TOKEN,
  Autho_INFO_ERROR
} from '../constants'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import loginService from '../services/login.service'
import userService from '../services/user.service'
import md5Password from '../utils/md5_password'
import { Context } from 'koa'

const verifyLogin = async (ctx: Context, next: any) => {
  const { phone, password } = ctx.request.body as IRequestBody
  //判断用户名或密码是否为空
  if (!phone || !password) {
    return ctx.app.emit('error', PHONE_OR_PASSWORD_IS_REQUIRED, ctx)
  }
  //判断用户名是否存在于数据库
  if (!(await userService.isExist(ctx))) {
    return ctx.app.emit('error', USER_NOT_EXISTS, ctx)
  }
  //判断密码是否正确
  const truePassword = await loginService.findPassword(phone)
  if (!(md5Password(password) === truePassword)) {
    return ctx.app.emit('error', PASSWORD_ERROR, ctx)
  }

  await next()
}

const verifyAuth = async (ctx: Context, next: any) => {
  const publicKey = fs.readFileSync('./src/keys/public.key')
  const authorization = ctx.header.authorization
  if (!authorization) {
    return ctx.app.emit('error', NOT_BRING_TOKEN, ctx)
  }
  const token = decodeURIComponent(authorization).replace('Bearer ', '')
  // 解码

  try {
    const result = jwt.verify(token, publicKey) as any
    const res = await userService.findUser(result.phone)
    ctx.user = {
      ...res[0]
    }
    ctx.user.avatar = `${ctx.origin}/${ctx.user.avatar}`
  } catch (error) {
    return ctx.app.emit('error', Autho_INFO_ERROR, ctx)
  }
  await next()
}

export { verifyLogin, verifyAuth }

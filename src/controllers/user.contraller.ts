import { Context } from 'koa'
import userService from '../services/user.service'

class UserContraller {
  async create(ctx: Context) {
    //存入数据库
    if (await userService.save(ctx)) {
      return (ctx.body = {
        code: '0',
        message: '注册成功'
      })
    } else {
      return (ctx.body = {
        code: '9999',
        message: '发生了未知的错误'
      })
    }
  }

  async getUserInfo(ctx: Context) {
    ctx.body = {
      code: '0',
      user: ctx.user
    }
  }

  async changeUserInfo(ctx: Context) {
    const res = await userService.changeUserInfo(ctx)
    if (res) {
      ctx.body = {
        code: '0',
        message: '信息修改成功'
      }
    }
  }
}

export default new UserContraller()

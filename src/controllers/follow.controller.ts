import { Context } from 'koa'
import followService from '../services/follow.service'

class followContraller {
  async create(ctx: Context) {
    try {
      await followService.create(ctx)
      ctx.body = {
        code: '0',
        message: '关注成功'
      }
    } catch (err) {
      ctx.body = {
        code: '-1002',
        err
      }
    }
  }
  async cancel(ctx: Context) {
    try {
      await followService.cancel(ctx)
      ctx.body = {
        code: '0',
        message: '取关成功'
      }
    } catch (err) {
      ctx.body = {
        code: '-1003',
        err
      }
    }
  }
  async getList(ctx: Context) {
    try {
      const res = await followService.getList(ctx)
      ctx.body = {
        code: '0',
        user: {
          username: ctx.user.username,
          user_rank: ctx.user.user_rank,
          followednum: res[0].length,
          fansnum: res[1].length
        },
        followed: res[0],
        fans: res[1]
      }
    } catch (err) {
      ctx.body = {
        code: '-1003',
        err
      }
    }
  }
}

export default new followContraller()

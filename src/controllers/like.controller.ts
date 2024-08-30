// like.controller.ts (TypeScript) 或 like.controller.js (JavaScript)
import { Context } from 'koa'
import likeService from '../services/like.service'

class LikeController {
  async create(ctx: Context) {
    try {
      const res = await likeService.create(ctx)
      if (res) {
        ctx.body = {
          code: '0',
          message: '点赞成功'
        }
      }
    } catch (error) {
      ctx.status = 400
      ctx.body = {
        code: -1001,
        message: '点赞失败',
        error
      }
    }
  }

  async cancel(ctx: Context) {
    try {
      await likeService.cancel(ctx)
      ctx.body = {
        code: '0',
        message: '取消点赞成功'
      }
    } catch (error) {
      ctx.status = 400
      ctx.body = {
        code: -1004,
        message: '取消点赞失败',
        error
      }
    }
  }
}

export default new LikeController()

import { Context } from 'koa'
import commentService from '../services/comment.service'

class CommentController {
  async create(ctx: Context) {
    try {
      await commentService.create(ctx)
      ctx.body = {
        code: '0',
        message: '评论成功'
      }
    } catch (error) {
      ctx.status = 400
      ctx.body = {
        code: -2001,
        message: '评论失败',
        error
      }
    }
  }

  async delete(ctx: Context) {
    try {
      await commentService.delete(ctx)
      ctx.body = {
        code: 0,
        message: '删除评论成功'
      }
    } catch (error) {
      ctx.status = 400
      ctx.body = {
        code: -2002,
        message: '删除评论失败',
        error
      }
    }
  }
}

export default new CommentController()

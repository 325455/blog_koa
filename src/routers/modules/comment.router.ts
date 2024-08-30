import koaRouter from '@koa/router'
import commentController from '@/controllers/comment.controller'
import { verifyAuth } from '@/middleware/login.middleware'

const commentRouter = new koaRouter({ prefix: '/comment' })

// 发表评论
commentRouter.post('/create', verifyAuth, commentController.create)
// 删除评论
commentRouter.delete('/delete/:commentId', verifyAuth, commentController.delete)

export default commentRouter

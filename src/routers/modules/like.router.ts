import koaRouter from '@koa/router'
import likeController from '@/controllers/like.controller'
import { verifyAuth } from '@/middleware/login.middleware'

const likeRouter = new koaRouter({ prefix: '/like' })

// 创建点赞
likeRouter.post('/create', verifyAuth, likeController.create)
// 取消点赞
likeRouter.delete('/cancel/:passageid', verifyAuth, likeController.cancel)

export default likeRouter

import koaRouter from '@koa/router'
import followController from '@/controllers/follow.controller'
import { verifyAuth } from '@/middleware/login.middleware'

const followRouter = new koaRouter({ prefix: '/follow' })

followRouter.post('/create', verifyAuth, followController.create)
followRouter.delete('/cancel/:followed', verifyAuth, followController.cancel)
followRouter.get('/getlist', verifyAuth, followController.getList)

export default followRouter

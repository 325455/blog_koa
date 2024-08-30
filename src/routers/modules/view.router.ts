import { verifyAuth } from '@/middleware/login.middleware'
import viewContraller from '../../controllers/view.contraller'
import kaoRouter from '@koa/router'

const viewRouter = new kaoRouter({ prefix: '/view' })

viewRouter.get('/homedata/:description', verifyAuth, viewContraller.getHomeData)
viewRouter.get('/userDetail/:phone', verifyAuth, viewContraller.getUserDetail)

export default viewRouter

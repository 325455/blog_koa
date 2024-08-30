import koaRouter from '@koa/router'
import { verifyLogin } from '../../middleware/login.middleware'
import loginContraller from '../../controllers/login.contraller'

const loginRouter = new koaRouter({ prefix: '/login' })

loginRouter.post('/', verifyLogin, loginContraller.signin)

export default loginRouter

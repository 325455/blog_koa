import kaoRouter from '@koa/router'
import { verifyAuth } from '../../middleware/login.middleware'
import passageContraller from '../../controllers/passage.contraller'

const passageRouter = new kaoRouter({ prefix: '/passage' })

passageRouter.post('/', verifyAuth, passageContraller.create)
passageRouter.get('/detail/:passageid', verifyAuth, passageContraller.getDetail)
passageRouter.get('/list/:description', passageContraller.getPassageList)

export default passageRouter

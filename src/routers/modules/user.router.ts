import UserContraller from '../../controllers/user.contraller'
import { verify, handelPassword } from '../../middleware/user.middleware'
import KoaRouter, { RouterOptions } from '@koa/router'
import { verifyAuth } from '../../middleware/login.middleware'
import userContraller from '../../controllers/user.contraller'
import { uploadAvatar } from '../../middleware/file.middleware'

const userRouter = new KoaRouter<RouterOptions>({ prefix: '/user' })

userRouter.post('/signup', verify, handelPassword, UserContraller.create)

userRouter.get('/verifyUser', verifyAuth, userContraller.getUserInfo)

userRouter.post(
  '/userInfo',
  verifyAuth,
  uploadAvatar,
  userContraller.changeUserInfo
)

export default userRouter

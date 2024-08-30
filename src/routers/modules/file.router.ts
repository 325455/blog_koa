import koaRouter from '@koa/router'
import multer from '@koa/multer'
import userContraller from '../../controllers/user.contraller'
import { verifyAuth } from '../../middleware/login.middleware'

const fileRouter = new koaRouter({ prefix: '/file' })

const uploadAvatar = multer({
  dest: './upload'
})

fileRouter.post(
  '/avatar',
  verifyAuth,
  uploadAvatar.single('avatar'),
  userContraller.changeUserInfo
)

export default fileRouter

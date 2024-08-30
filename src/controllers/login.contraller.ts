import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
import { Context } from 'koa'

class LoginContraller {
  async signin(ctx: Context) {
    const { phone } = ctx.request.body as IRequestBody

    const privateKey = fs.readFileSync(
      path.resolve(__dirname, '../keys/private.key')
    )
    const payload = { phone }

    const token = jwt.sign(payload, privateKey, {
      expiresIn: 60 * 60 * 60 * 60,
      algorithm: 'RS256'
    })

    ctx.body = {
      code: '0',
      token,
      message: '登录成功~'
    }
  }
}

export default new LoginContraller()

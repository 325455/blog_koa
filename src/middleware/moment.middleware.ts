import { Context } from 'koa'
import { OPERTER_NOT_ALLOWED } from '../constants'
import connection from '../database'
import { RowDataPacket } from 'mysql2'

const momentPremission = async (ctx: Context, next: any) => {
  const { id } = ctx.params
  const { phone } = ctx.user
  const statement = `select * from moment where phone=? and id=?`
  const [res] = await connection.execute<RowDataPacket[]>(statement, [
    phone,
    id
  ])
  if (res.length === 0) {
    return ctx.app.emit('error', OPERTER_NOT_ALLOWED, ctx)
  }
  await next()
}

export { momentPremission }

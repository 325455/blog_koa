import connection from '@/database'
import { getCompleteAvater } from '@/utils/get_avater'
import { Context } from 'koa'

class followService {
  async create(ctx: Context) {
    const { phone } = ctx.user
    const { followed } = ctx.request.body as any
    const statement = `insert into follow (follower,followed) values (?,?)`
    const res = await connection.execute(statement, [phone, followed])
    return res
  }
  async cancel(ctx: Context) {
    const { phone } = ctx.user
    const { followed } = ctx.params
    const statement = `delete from follow where follower=? and followed=?`
    const res = await connection.execute(statement, [phone, followed])
    return res
  }

  async getList(ctx: Context) {
    const { phone } = ctx.user
    const getFollowedStatement = `select phone,username,avatar,user_rank 
    from users,follow where users.phone=follow.followed and follower=?`
    const getFansStatement = `select phone,username,avatar,user_rank 
    from users,follow where users.phone=follow.follower and followed=?`
    let [res1] = await connection.execute<any[]>(getFollowedStatement, [phone])
    let [res2] = await connection.execute<any[]>(getFansStatement, [phone])
    res1 = getCompleteAvater(ctx, res1)
    res2 = getCompleteAvater(ctx, res2)
    return [res1, res2]
  }
}

export default new followService()

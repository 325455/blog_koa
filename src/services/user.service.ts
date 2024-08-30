import { Context } from 'koa'

import connection from '../database'
import { RowDataPacket } from 'mysql2'

class UserService {
  //存入用户
  async save(ctx: Context) {
    const { phone, password } = ctx.request.body as IRequestBody

    const saveSql = `INSERT INTO users (Phone, Username, Password, avatar) VALUES 
    (?, '未设置', ?, '默认');`
    const [res] = await connection.execute(saveSql, [phone, password])
    return res
  }
  //判断用户是否存在
  async isExist(ctx: Context) {
    const { phone } = ctx.request.body as IRequestBody
    console.log(phone)

    const statement = `select * from users where phone=?`
    const [res] = await connection.execute<[]>(statement, [phone])
    return !!res.length
  }

  //查询用户
  async findUser(phone: string) {
    const findSql = `select phone,username,user_rank,avatar from users where phone=?`
    const countfollow = (
      await connection.execute<any>(
        `select count(followed) as followedNum from follow where follower=? group by follower`,
        [phone]
      )
    )[0][0].followedNum
    const fansNum = (
      await connection.execute<any>(
        `select count(follower) as fansNum from follow where followed=? group by followed`,
        [phone]
      )
    )[0][0].fansNum

    const [values] = await connection.execute<RowDataPacket[]>(findSql, [phone])
    values[0].followedNum = countfollow
    values[0].fansNum = fansNum
    return values
  }
  //修改用户信息
  async changeUserInfo(ctx: Context) {
    const { phone } = ctx.user
    const { name, rank } = ctx.request.body as any
    if (!ctx.file) {
      const statement = `update users set username=?,user_rank=? where phone=?`
      const res = await connection.execute(statement, [name, rank, phone])
      return res[0]
    }
    const avatar = ctx.file.filename
    const statement = `update users set username=?,user_rank=?,avatar=? where phone=?`
    const res = await connection.execute(statement, [name, rank, avatar, phone])
    return res[0]
  }
}

export default new UserService()

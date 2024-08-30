import { Context } from 'koa'
import connection from '../database'

class MomentService {
  async save(ctx: Context) {
    const { phone } = ctx.user
    const { title, content, description } = ctx.request.body as IRequestBody
    const id = +new Date()
    console.log(ctx.request.body)

    console.log([id, phone, title, content, description])

    const statement = `INSERT INTO passage (passageid,authorPhone,title, content,description,recommend)
        VALUES (?, ?, ?,?, ?,0);`
    const res = await connection.execute(statement, [
      id,
      phone,
      title,
      content,
      description
    ])
    return res
  }

  async search(ctx: Context) {
    const { size = '10', offset = '0' } = ctx.query
    const { description } = ctx.params
    const statement = `select * from passage where description=? LIMIT ? OFFSET ?`
    const [value] = await connection.execute(statement, [
      description,
      size,
      offset
    ])
    return value
  }

  async getDetail(ctx: Context) {
    const { passageid } = ctx.params
    const { phone } = ctx.user
    const getDetailStatement = `SELECT 
          p.passageid,
          p.title,
          p.content,
          p.created_at AS article_created_at,
          p.updated_at AS article_updated_at,
          u.phone AS author_phone,
          u.Username AS author_username,
          u.avatar AS author_avatar,
          u.user_rank AS author_rank,
          COUNT(l.phone) AS likes_count
      FROM 
          passage AS p
      LEFT JOIN 
          users AS u ON p.authorPhone = u.Phone
      LEFT JOIN 
          likes AS l ON p.passageid = l.passageid
      GROUP BY 
          p.passageid
      HAVING 
          p.passageid = ?;`
    //是否点赞了该文章
    const [res] = await connection.execute<any>(getDetailStatement, [passageid])
    res[0].isLike = !!(
      await connection.execute<any>(`select * from likes 
      where phone=${phone} and passageid=${passageid}`)
    )[0].length
    //获取完整头像
    res[0].author_avatar = `${ctx.origin}/${res[0].author_avatar}`
    const getCommentsStatement = `select users.phone,users.username,content,created_at
     from comments,users where users.phone=comments.phone and passageid=?`
    const [comments] = await connection.execute(getCommentsStatement, [
      passageid
    ])
    res[0].comments = comments

    return res[0]
  }
}
export default new MomentService()

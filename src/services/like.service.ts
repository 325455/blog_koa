// like.service.ts (TypeScript) 或 like.service.js (JavaScript)
import connection from '@/database'
import { Context } from 'koa'

class LikeService {
  async create(ctx: Context): Promise<boolean> {
    const { phone } = ctx.user
    const { passageid } = ctx.request.body as any

    // 检查是否已经点赞
    const [existingLike] = await connection.execute<any>(
      'SELECT * FROM likes WHERE phone = ? AND passageid = ?',
      [phone, passageid]
    )
    if (existingLike.length > 0) {
      ctx.body = {
        code: '-1999',
        message: '已经赞过该文章了'
      }
      return false
    }

    // 插入新的点赞记录
    const statement = 'INSERT INTO likes (phone, passageid) VALUES (?, ?)'
    await connection.execute(statement, [phone, passageid])
    return true
  }

  async cancel(ctx: Context): Promise<void> {
    const { phone } = ctx.user
    const { passageid } = ctx.params

    // 删除点赞记录
    const statement = 'DELETE FROM likes WHERE phone = ? AND passageid = ?'
    await connection.execute(statement, [phone, passageid])
  }
}

export default new LikeService()

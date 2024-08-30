// comment.service.ts (TypeScript) 或 comment.service.js (JavaScript)
import connection from '@/database'
import { Context } from 'koa'

class CommentService {
  async create(ctx: Context): Promise<void> {
    const { phone } = ctx.user // 假设用户信息中有 phone
    const { passageid, content } = ctx.request.body as any

    // 插入新的评论记录
    const statement =
      'INSERT INTO comments (phone, passageid, content, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)'
    await connection.execute(statement, [phone, passageid, content])
  }

  async delete(ctx: Context): Promise<void> {
    const { phone } = ctx.user
    const { commentId } = ctx.params

    // 检查评论是否存在且属于当前用户
    const statementCheck =
      'SELECT * FROM comments WHERE comment_id = ? AND phone = ?'
    const [existingComment] = await connection.execute<any>(statementCheck, [
      commentId,
      phone
    ])

    if (!existingComment.length) {
      throw new Error('评论不存在或不属于当前用户')
    }

    // 删除评论记录
    const statementDelete = 'DELETE FROM comments WHERE comment_id = ?'
    await connection.execute(statementDelete, [commentId])
  }
}

export default new CommentService()

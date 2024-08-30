import connection from '@/database'
import { getCompleteAvater } from '@/utils/get_avater'
import { Context } from 'koa'

class searchService {
  async search(ctx: Context) {
    const { querystr } = ctx.params
    const regx = new RegExp(querystr, 'ig')
    const pSql = `select * from passage`
    const uSql = `select * from users`
    let [res1] = (await connection.execute(pSql)) as any
    let [res2] = (await connection.execute(uSql)) as any
    res1 = res1.filter(
      (item: any) => regx.test(item.title) || regx.test(item.content)
    )
    res2 = res2.filter(
      (item: any) => regx.test(item.Username) || regx.test(item.user_rank)
    )
    res2 = getCompleteAvater(ctx, res2)
    return [res1, res2]
  }
}

export default new searchService()

import { Context } from 'koa'
import searchService from '../services/search.service'

class searchContraller {
  async search(ctx: Context) {
    const res = await searchService.search(ctx)
    ctx.body = {
      code: '0',
      passages: res[0],
      users: res[1]
    }
  }
}

export default new searchContraller()

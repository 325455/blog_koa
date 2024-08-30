import { Context } from 'koa'
import passageService from '../services/passage.service'

class passageContraller {
  async create(ctx: Context) {
    const res = await passageService.save(ctx)
    ctx.body = {
      code: '0',
      result: res
    }
  }

  async getPassageList(ctx: Context) {
    const res = await passageService.search(ctx)
    ctx.body = {
      code: '0',
      res
    }
  }

  async getDetail(ctx: Context) {
    const res = await passageService.getDetail(ctx)
    ctx.body = {
      code: '0',
      detail: res
    }
  }
}

export default new passageContraller()

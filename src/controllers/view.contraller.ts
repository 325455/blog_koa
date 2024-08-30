import { Context } from 'koa'
import passageService from '../services/passage.service'
import viewService from '../services/view.service'

class viewContraller {
  async create(ctx: Context) {
    const res = await passageService.save(ctx)
    ctx.body = {
      code: '0',
      result: res
    }
  }

  async getHomeData(ctx: Context) {
    const res = await viewService.search(ctx)
    ctx.body = {
      code: '0',
      res
    }
  }

  async getUserDetail(ctx: Context) {
    const res = await viewService.getUserDetail(ctx)
    ctx.body = {
      code: '0',
      res
    }
  }
}

export default new viewContraller()

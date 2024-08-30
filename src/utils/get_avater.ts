import { Context } from 'koa'

export const getCompleteAvater = (ctx: Context, list: { avatar: string }[]) => {
  return list.map((item) => {
    item.avatar = `${ctx.origin}/${item.avatar}`
    return item
  })
}

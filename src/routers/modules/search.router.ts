import koaRouter from '@koa/router'
import searchController from '@/controllers/search.controller'

const searchRouter = new koaRouter({ prefix: '/search' })

searchRouter.get('/:querystr', searchController.search)

export default searchRouter

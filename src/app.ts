import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'
import registerRouter from './routers'
import serve from 'koa-static'
import path from 'path'

const app = new Koa()

app.use(bodyParser())
app.use(serve(path.resolve(__dirname, '../upload')))

app.use(cors())

registerRouter(app)

export default app

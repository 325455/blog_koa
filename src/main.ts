import app from './app'
import dotenv from 'dotenv'
import './utils/handle-error'
require('module-alias/register')

dotenv.config()

//启动服务器
app.listen(process.env.SERVER_PORT, () => {
  console.log(`服务器成功在${process.env.SERVER_PORT} 端口启动`)
})

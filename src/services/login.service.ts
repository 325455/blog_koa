import { RowDataPacket } from 'mysql2'
import connection from '../database'

class LoginService {
  async findPassword(phone: string) {
    const findSql = `select password from users where phone=?`
    const [value] = await connection.execute<RowDataPacket[]>(findSql, [phone])
    return value[0].password
  }
}

export default new LoginService()

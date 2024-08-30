import { Context } from 'koa'
import connection from '../database'
import { RowDataPacket } from 'mysql2'
import { getCompleteAvater } from '../utils/get_avater'

class ViewService {
  async search(ctx: Context) {
    const { size = '10', offset = '0' } = ctx.query
    const { description } = ctx.params
    const { phone } = ctx.user

    //文章榜
    const [passageRaking] = await connection.execute<RowDataPacket[]>(
      `select passageid,title,recommend from passage ORDER BY recommend DESC LIMIT 12`
    )
    //大佬
    let [loaer] = await connection.execute<any[]>(
      `select phone,username,user_rank,avatar,Count(passageid) as passagenum ,sum(recommend) as recommends from users,passage where users.Phone=passage.authorPhone and passage.description=? GROUP BY users.Phone ORDER BY recommends DESC LIMIT 3;`,
      [description]
    )
    for (let i = 0; i < loaer.length; i++) {
      const [isFollowed] = (await connection.execute(`select * from
          follow where follower=${phone} and followed=${loaer[i].phone}`)) as any
      loaer[i].isFollowed = !!isFollowed.length
    }
    loaer = getCompleteAvater(ctx, loaer)
    //博客精选
    let [finePassage] = await connection.execute<any[]>(
      `SELECT passageid,username,avatar,content FROM passage,users WHERE users.phone=passage.AuthorPhone and created_at >= CURDATE() - INTERVAL 5 DAY ORDER BY recommend DESC  LIMIT 10;`
    )
    finePassage = finePassage.map((item: any) => {
      item.content = item.content.replace(/#/g, '').slice(0, 50) + '...'
      return item
    })
    finePassage = getCompleteAvater(ctx, finePassage)
    //文章推荐
    const statement = `select passageid,username,title,content,recommend,avatar,created_at from passage,users where passage.authorPhone=users.Phone and description=? LIMIT ? OFFSET ?;`
    let [passageRecommend] = await connection.execute<any[]>(statement, [
      description,
      size,
      offset
    ])
    passageRecommend = getCompleteAvater(ctx, passageRecommend)
    //汇总
    const res = {
      bannerimgs: [
        `${ctx.origin}/bannerimg/${description}/${description}01.png`,
        `${ctx.origin}/bannerimg/${description}/${description}02.png`,
        `${ctx.origin}/bannerimg/${description}/${description}03.png`
      ],
      passageRaking,
      loaer,
      finePassage,
      passageRecommend
    }
    return res
  }

  async getUserDetail(ctx: Context) {
    const { phone } = ctx.params

    const [user] = (
      await connection.execute(
        `select phone, username, avatar, user_rank from users where phone = '${phone}'; `
      )
    )[0] as any
    user.isFollowed = !!(
      (await connection.execute(`select * from
          follow where follower=${ctx.user.phone} and followed=${user.phone}`)) as any
    )[0].length

    user.avatar = `${ctx.origin}/${user.avatar}`
    const [article_num] = (
      await connection.execute(
        `select count(*) as article_count from passage where authorphone = '${phone}' group by authorphone; `
      )
    )[0] as any

    const [followed_num] = (
      await connection.execute(
        `select count(*) as follow_count from follow where follower = '${phone}' group by follower;`
      )
    )[0] as any

    const [comment_num] = (
      await connection.execute(
        `select count(*) as comment_count from comments where phone = '${phone}' group by phone;`
      )
    )[0] as any

    const [passages] = await connection.execute(
      `select passageid,title,created_at from passage where authorPhone=${phone};`
    )

    return {
      user,
      article_num: article_num?.article_count || 0,
      followed_num: followed_num?.follow_count || 0,
      comment_num: comment_num?.comment_count || 0,
      passages
    }
  }
}
export default new ViewService()

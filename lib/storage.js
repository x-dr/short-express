
import { customAlphabet } from 'nanoid'
import query from './db.js'
import 'dotenv/config'



const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)

const createSlug = async () => {
  const slug = nanoid()
  const sql = 'select * from links where slug = ?'
  const { total } = await query(sql, slug)
  if (!total) return slug

  return await createSlug()
}


export const addLog = async (url, slug, ua, ip) => {
  // 构建sql语句
  const sql = 'insert into logs set ?'
  var timedata = new Date()
  // 执行sql语句
  const data = await query(sql, { url, slug, ua, ip, data: timedata })
  // console.log(data);

}

export const addLink = async (url, slug, ua, ip) => {
  slug = slug || await createSlug()
  // 构建sql语句
  // console.log(url);
  const sql = 'insert into links set ?'
  const data = await query(sql, { slug, url, ua, ip })
  return slug


}


export const getUrlBySlug = async (slug) => {

  const sql = 'select * from links where slug = ?'
  const data = await query(sql, slug)
  return data[0] && data[0].url


}

export const getSlugByUrl = async (url) => {
  const sql = 'select * from links where url = ?'
  const data = await query(sql, url)
  return data[0] && data[0].slug

}





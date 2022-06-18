import { getUrlBySlug ,addLog} from '../lib/storage.js'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const redirect = async (req, res) => {
  const { slug } = req.params

  if (!slug) return res.status(400).send('Bad Request')

  try {
    // 通过 slug 获取目标 url
    const url = await getUrlBySlug(slug)

    // 未找到目标网址
    if (url == null) return res.status(404).send('未找到目标网址')

    // 如果目标存在则 307 重定向

    await addLog(url,slug, req.get('user-agent'), req.ip.split(':')[3])
    // await addLog(url,slug, req.get('user-agent'), req.get('x-forwarded-for'))
    res.redirect(url)

  } catch (e) {
    return res.status(500).send(e.message)
  }

  
}



export default redirect
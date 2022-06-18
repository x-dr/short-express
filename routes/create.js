import { getUrlBySlug,addLink ,getSlugByUrl} from '../lib/storage.js'

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const create = async (req, res) => {
  // 来自请求的参数
  const { url, slug } = req.body


  // 网址为必填项
  if (!url) return res.status(400).send({ message: 'Missing required parameter: url.' })

  // url格式检查
  if (!/^https?:\/\/.{3,}/.test(url)) {
    return res.status(400).send({ message: 'Illegal format: url.' })
  }

  // 自定义slug长度检查 2<slug<10
  if (slug && (slug.length < 2 || slug.length > 10)) {
    return res.status(400).send({ message: 'Illegal length: slug, (>= 2 && <= 10).' })
  }

  try {
    // 请求源地址

    const origin = `${req.protocol}://${req.get('host')}/`

 

    // 如果自定义slug
    if (slug) {
      const existUrl = await getUrlBySlug(slug)

      // url & slug 是一样的。
      if (existUrl === url) {
        return res.send({ slug, link: origin + slug })
      }

      // slug 已存在
      if (existUrl) {
        return res.status(400).send({ message: 'Slug already exists.' })
      }
    }

    // 目标 url 已存在
    const existSlug = await getSlugByUrl(url)



    // url 存在且没有自定义 slug
    if (existSlug && !slug) {
      return res.send({ slug: existSlug, link: origin + existSlug })
    }


   // 如果不存在则创建
    // const newSlug = await addLink(url,slug, req.get('user-agent'), req.ip.split(':')[3])
    const newSlug = await addLink(url,slug, req.get('user-agent'), req.get('x-forwarded-for'))

    // response
    res.send({ slug: newSlug, link: origin + newSlug })
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}



export default create
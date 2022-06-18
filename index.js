import Express from 'express';
import path from "path"
const __dirname = path.resolve();
import redirect from './routes/redirect.js'
import create from './routes/create.js'
import 'dotenv/config'

// import { addLog , getSlugByUrl,addLink,getUrlBySlug } from './lib//storage.js'

// 创建服务器
const app = Express()

app.set('x-powered-by', false)
app.use(Express.json())
// 配置中间件
app.use(Express.urlencoded({ extended: false }))


app.use(Express.static(__dirname+'/public'));



app.post('/create', create)
app.get('/:slug', redirect)

// 启动服务器

const port = process.env.PORT || 3001;
// app.listen(port);
app.listen(port, () => {
    console.log('Start service success! listening port: http://127.0.0.1:' + port);
})
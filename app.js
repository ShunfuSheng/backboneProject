//服务器端接口取数据用
//public为静态资源目录
var express = require('express') //引入express
var app = express()
var morgan = require('morgan')

var model = require('./model') //引入model数据模型
var Book = model.Book

app.use(morgan('dev')) // morgan日志输出模块

app.use(express.static('./public'))

app.get('/api/v1/books/',(req,res)=>{
    Book.find()
        .limit(10)
        .then(data=>{
            res.json({
                status:'y',
                msg:'获取数据成功',
                data:data
            })
        })
})
app.listen(3000,()=>{
    console.log('服务器运行于3000端口...')
})

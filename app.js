//引入express
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const app = express();

//引入model数据模型
const model = require('./model');
var Book = model.Book;
var Student = model.Student;

// morgan日志输出模块
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//配置静态资源目录
app.use(express.static('./public'));


//获取书籍信息数据接口
app.get('/api/v1/books/',(req,res)=>{
    Book.find()
        .limit(300)
        .then(data=>{
            res.json({
                status:'y',
                msg:'获取数据成功',
                data:data
            });
        })
});

//验证学生登录信息接口
app.post('/api/v1/handel_login',(req,res)=>{
    var user_data = req.body;
    Student.find({user_name: user_data.user_name}).then(function (data) {
        if(data){
            Student.find({user_name: user_data.user_name, pwd: user_data.user_pwd}).then(function (data) {
                if(data){
                    res.json({status: '200', msg: '登录成功，准备跳转!'});
                }else{
                    res.json({status: '400', msg: '密码错误，请重新输入!'});
                }
            }).catch(function (err) {
                console.dir(err);
            });
        }else{
            res.json({status: '400', msg: '用户名不存在，请注册!'});
        }
    }).catch(function (err) {
        console.dir(err);
    })
});

//注册用户处理
app.post('/api/v1/save_userInfo',(req,res)=>{
    res.json({});
})




//监听端口
app.listen(3000,()=>{
    console.log('服务器运行于3000端口...');
})

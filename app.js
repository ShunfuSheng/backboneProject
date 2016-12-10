//引入express
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const app = express();

//引入model数据模型
const model = require('./model');
var Book = model.Book;
var Student = model.Student;
var StudentBook = model.StudentBook;

// morgan日志输出模块
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//配置静态资源目录
app.use(express.static('./public'));


//获取书籍信息数据接口
app.get('/api/v1/books/:page?',(req,res)=>{
    var currentPage = 1;
    if(req.params.page){
        currentPage = Number(req.params.page);
    }
    setTimeout(function () {
        Book.find()
            .limit(10)
            .skip((currentPage-1)*10)
            .then(data=>{
                res.json({
                    status:'y',
                    msg:'获取数据成功',
                    data:data
                });
            })
    }, 3000);
});

//用户借阅处理
app.get('/api/v1/borrow', (req,res)=>{
    if(!req.cookies.user_id){
        res.json({status: '400', msg: '你还未登录，请先登录!'});
    }
    var user_id = req.cookies.user_id;
    var book_id = req.query.book_id;
    StudentBook.findOneAndUpdate({book_id: book_id, user_id: user_id},{book_id: book_id, user_id: user_id},{upsert: true})
        .then(function (data) {
            if(data){
                res.json({status: '400', msg: '你已借过此书了!!'});
            }else{
                res.json({status: '400', msg: '借阅成功，请收好!'});
            }
        }).catch(function (err) {
        console.dir(err);
    });
});

//验证学生登录信息接口
app.post('/api/v1/handel_login',(req,res)=>{
    var user_data = req.body;
    Student.findOne({user_name: user_data.user_name}).then(function (data) {
        if(data){
            Student.findOne(user_data).then(function (data) {
                if(data){
                    var timeSpan = new Date(Date.now()+24*60*60*1000*10);
                    //设置cookie 保存用户id信息
                    res.cookie('user_id', data._id, {path: '/', expires: timeSpan});
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
app.post('/api/v1/reg_userInfo',(req,res)=>{
    var data = req.body;
    delete data.per_phone;
    var student = new Student(data);
    student.save();
    var timeSpan = new Date(Date.now()+24*60*60*1000*10);
    //设置cookie 保存用户id信息
    res.cookie('user_id', student._id, {path: '/', expires: timeSpan});
    res.json({status: '200', msg: '注册成功!'});
})

//用户信息显示
app.get('/api/v1/get_userinfo', (req,res)=>{
    if(req.cookies.user_id){
        Student.findById(req.cookies.user_id).then(function (data) {
            // 用populate作表关联
            StudentBook.find({user_id:req.cookies.user_id}).populate('book_id')
                .then(function (sbData) {
                    console.log(sbData);
                    res.json({status: 'y', user: data, books: sbData});
                }).catch(function (err) {
                console.dir(err);
            })
        }).catch(function (err) {
            console.dir(err);
        })
    }else{
        res.json({status: 'n', msg: '请先登录'});
    }
})




//监听端口
app.listen(3000,()=>{
    console.log('服务器运行于3000端口...');
})

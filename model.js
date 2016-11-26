//mongoose数据模型
var db = require('mongoose')
db.Promise = Promise
db.connect('mongodb://localhost/books_db')
var Schema =  db.Schema

//定义书籍数据模型
var bookSchema = new Schema({
    title: String,
    author: String,
    publisher: String,
    price: Number,
    img: String,
    link: String,
    type: String
})
var Book = db.model('book', bookSchema)


//定义学生数据模型
var studentSchema = new Schema({
    user_name: Number,
    pwd: String,
    name: String,
    sex: String,
    birthday: {
        type: Date,
        default: Date.now
    },
    mobile: String,
    email: String,
})
var Student = db.model('student', studentSchema);





// 模块导出
module.exports = {
    Book: Book,
    Student: Student
}

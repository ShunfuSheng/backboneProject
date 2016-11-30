//mongoose数据模型
var db = require('mongoose');
db.Promise = Promise;
db.connect('mongodb://localhost/books_db');
var Schema =  db.Schema;

//定义书籍数据模型
var bookSchema = new Schema({
    title: String,
    author: String,
    publisher: String,
    price: Number,
    img: String,
    link: String,
    type: String
});
var Book = db.model('book', bookSchema);


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
});
//计算年龄
studentSchema.methods.getAge = function () {
    var now = new Date();
    return (now.getFullYear() - this.birthday.getFullYear());
}
var Student = db.model('student', studentSchema);


//创建一个orm用做表关联，ref的时候需要制定模型的名字即db.model()中的第一个参数
var studentBookSchema = new Schema({
    booked_date:{
        type: Date,
        default: Date.now()
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'student'
    },
    book_id:{
        type:Schema.Types.ObjectId,
        ref:'book'
    }
})
//拿到model对象
var StudentBook = db.model('student_book',studentBookSchema);





// 模块导出
module.exports = {
    Book: Book,
    Student: Student,
    StudentBook: StudentBook
}

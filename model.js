//mongoose数据模型
var db = require('mongoose')
db.Promise = Promise
db.connect('mongodb://localhost/books_db')
var Schema =  db.Schema
var bookSchema = new Schema({
    title:String,
    author:String,
    publisher:String,
    price:Number,
    img:String,
    link:String
})
// 定义模型
var Book = db.model('dangdang_book',bookSchema)

var Schema =  db.Schema
// 模块导出
module.exports = {
    Book:Book
}

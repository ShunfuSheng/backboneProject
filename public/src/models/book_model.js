//书籍信息集合模块
define(['backbone'],function(B){
    //定义模型
    var Book = B.Model.extend({
    })

    //定义集合
    var Books = B.Collection.extend({
        model:Book,     //指定集合的模型
        url:'/api/v1/books/',   //指定取数据的地址
        parse:function(res){
            return res.data;
        }
    })
    return{
        model:Book,
        collection:Books
    };
})
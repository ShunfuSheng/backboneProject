// ajax方式获取当当网数据的模块
define(['jquery'],function($){
    //定义一个object对象 用于最后的模块返回
    var api = {}

    //从服务器端获取数据,function接收一个回调函数作为参数
    api.get_data = function(callBack){
        $.getJSON('/api/v1/books/get_data',function(res){
            callBack(res)
        })
    }

    // jQuery使用promise方式取数据 返回一个deferred对象
    api.get_data_deferred = function(){
        return $.getJSON('/api/v1/books/get_data')
    }

    return api
})

//学生集合模块
define(['backbone'],function(B){
    //定义学生模型
    var Student = B.Model.extend({
        validate: function (attrs) {
            if(attrs.name.length < 2){
                return {
                    attr:'name',
                    msg:'名字不能小于两个字符'
                }
            }
            if(attrs.age<=0 || attrs.age>=140){
                return {
                    attr:'age',
                    msg:'年龄信息不合法'
                }
            }
        },
        parse: function (res) {
            return res;
        },
        url: '/api/v1/save_userInfo'
    })

    //定义用户登录模型
    var User = B.Model.extend({
        validate: function (attrs) {
            if(attrs.name.length < 2){
                return {
                    attr:'name',
                    msg:'名字不能小于两个字符'
                }
            }
            if(attrs.age<=0 || attrs.age>=140){
                return {
                    attr:'age',
                    msg:'年龄信息不合法'
                }
            }
        },
        parse: function (res) {
            return res;
        },
        url: '/api/v1/handel_login'
    })

    //定义集合
    // var Students = B.Collection.extend({
    //     model:Student, //指定集合的模型
    //     url:'/api/v1/students/',//指定取数据的地址
    //     parse:function(res){
    //         return res;
    //     }
    // })
    return{
        stuentModel:Student,
        userModel: User,
        // collection:Students
    };
})
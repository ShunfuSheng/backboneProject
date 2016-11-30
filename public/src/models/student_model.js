//学生集合模块
define(['backbone'],function(B){
    //定义学生模型
    var Student = B.Model.extend({
        url: '/api/v1/reg_userInfo',
        // defaults: {
        //     user_name: '',
        //     pwd: '',
        //     sex: '',
        //     name: '',
        //     birthday: '',
        //     mobile: '',
        //     email: ''
        // },
        //默认情况下validate在save之前调用，但如果在set等方法内设置{validate:true}则会自动调用
        validate: function (attrs) {
            if(attrs.user_name.length == 0){
                return {attr:'user_name', msg:'用户名不能为空!'};
            }
            if(attrs.pwd.length == 0){
                return {attr:'pwd', msg:'密码不能为空!'};
            }
            if(attrs.pwd != attrs.rePwd){
                return {attr:'rePwd', msg:'两次输入的密码不一致!'};
            }
            if(attrs.name.length == 0){
                return {attr:'name', msg:'名字不能为空!'};
            }
            if(attrs.mobile.length == 0){
                return {attr:'mobile', msg:'手机号不能为空!'};
            }
            if(attrs.email.length == 0){
                return {attr:'email', msg:'邮箱地址必填!!'};
            }
        },
        // parse: function (res) {
        //     // return res;
        //     window.location.href = '#userinfo';
        // }
    });

    //定义用户信息模型
    var UserInfo = B.Model.extend({
        parse: function (res) {
            return res;
        },
        url: '/api/v1/get_userinfo'
    })

    return{
        saveModel:Student,
        infoModel: UserInfo,
    };
})
define(['backbone','text!regTpl','template','studentModel','jquery','cookie'],function(B, tpl, artTpl, studentModel, $, cookie){
    //console.log('tpl中的内容为:'+tpl)
    /// 定义一个视图对象
    var view = B.View.extend({
        template:artTpl.compile(tpl), //把art-template.compile方法传递给template作为参数
        initialize:function(){
            console.log('reg_view is initialized!');
            this.model = new studentModel.saveModel();
            //当model执行save操作时触发表单验证
            this.listenTo(this.model, 'invalid', this.handel_invalid);
        },
        render:function(){
            var strHtml = this.template({title:'注册'});
            //把生成的html字符串赋值到view的标签节点上
            this.$el.html(strHtml);
            return this;
        },
        handel_invalid:function (model, err) {
            alert(err.msg);
            return false;
        },
        //对模板中的事件进行绑定
        events:{
            'click #reg_btn': 'send_ajax'
        },
        //对model做save操作
        send_ajax:function () {
            var user = {};
            user.user_name = this.$el.find('#user_name').val();
            user.pwd = this.$el.find('#pwd').val();
            user.name = this.$el.find('#name').val();
            user.sex = this.$el.find('input[name="sex"]:checked').val();
            user.birthday = this.$el.find('#birthday').val();
            user.mobile = this.$el.find('#mobile').val();
            user.email = this.$el.find('#email').val();
            this.model.set({rePwd: this.$el.find('#rePwd').val()});

            // save的时候做三件事：首先往model中set数据，然后进行表单验证，最后提交到服务器
            // save的第二个参数为一个对象，接受ajax中的一些配置项，
            // 其中的success和error回调函数接收model和返回信息两个参数; fetch中的写法类似
            this.model.save(user, {success: this.successHandel, error: this.errorHandel});
        },
        //服务器接收并处理成功后返回的处理函数
        successHandel:function (model, res) {
            //到此，这个model实例中的属性包含有表单中的值和服务器返回的信息
            console.log(model);
            console.log(res);
            window.location.href = '#userinfo';
        },
        //服务器接收失败或处理失败后返回的处理函数
        errorHandel:function (model, err) {
            console.dir(err);
        }
    })

    return view;

})
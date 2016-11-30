define(['backbone','text!loginTpl','template','jquery'],function(B,tpl,artTpl,$){
    /// 定义一个视图对象
    var view = B.View.extend({
        template:artTpl.compile(tpl),
        initialize:function(){
            console.log('login_view is initialized!');
        },
        render:function(){
            var strHtml = this.template({title:'登陆'});
            //把生成的html字符串赋值到view的标签节点上
            this.$el.html(strHtml);
            return this;
        },
        events: {
            'click #showTooltips': 'login_handle'
        },
        login_handle:function () {
            $.ajax({
                url: '/api/v1/handel_login',
                method: 'post',
                data: $('#login_form').serialize(),
                dataType: 'json',
                success: function (res) {
                    if(res.status == 200){
                        alert(res.msg);
                        location.href = '#userinfo';
                    }else{
                        alert(res.msg);
                    }
                },
                error: function (err) {
                    console.dir(err);
                }
            })
        }
    })

    return view

})
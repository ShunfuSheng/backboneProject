define(['backbone','text!loginTpl','template','studentModel'],function(B,tpl,artTpl,studentModel){
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
        }
    })

    return view

})
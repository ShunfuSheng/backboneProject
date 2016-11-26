define(['backbone','text!userinfoTpl','template'],function(B,tpl,artTpl){
    /// 定义一个视图对象
    var view = B.View.extend({
        template:artTpl.compile(tpl), //把art-template.compile方法传递给template作为参数
        initialize:function(){
            console.log('userinfo_view is initialized!')
        },
        render:function(){
            var strHtml = this.template({title:'个人中心'})
            this.$el.html(strHtml) //把生成的html字符串赋值到view的标签节点上
            return this
        }
    })

    return view

})
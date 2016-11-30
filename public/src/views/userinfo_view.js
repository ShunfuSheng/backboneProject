define(['backbone','text!userinfoTpl','template','studentModel','jquery','cookie'],function(B,tpl,artTpl,studentModel,$,cookie){
    /// 定义一个视图对象
    var view = B.View.extend({
        template:artTpl.compile(tpl), //把art-template.compile方法传递给template作为参数
        initialize:function(){
            console.log('userinfo_view is initialized!');
            this.model = new studentModel.infoModel();
            //向服务器取数据
            this.model.fetch();
            this.listenTo(this.model,'sync',this.showInfo);
        },
        render:function(){
            console.log(this.model.toJSON());
            var strHtml = this.template({title:'个人中心', userData: this.model.toJSON(), msg: '请先登录'});
            this.$el.html(strHtml); //把生成的html字符串赋值到view的标签节点上
            return this;
        },
        showInfo:function () {
            this.render();
        },
        events: {
            'click #info_btn': 'removeCookie'
        },
        removeCookie:function () {
            $.removeCookie('user_id',{path:'/'});
            location.reload();
        }
    })

    return view;

})
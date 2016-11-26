define(['backbone','text!homeTpl','template','api','bookModel'],function(B,tpl,artTpl,api,bookModel){
    /// 定义一个视图对象
    var view = B.View.extend({
        //compile方法返回一个带参函数
        template:artTpl.compile(tpl),
        initialize:function(){
            console.log('home_view is initialized!');
            //创建model变量值为books集合(其中每一个model存放一条记录)
            this.model = new bookModel.collection();
            //向服务器取数据
            this.model.fetch();
            //监听sync事件
            this.listenTo(this.model,'sync',this.loadDataEnd);
        },
        render:function(){
            var strHtml = this.template({title:'首页', data:this.model.toJSON()});
            //把生成的html字符串赋值到view的标签节点上
            this.$el.html(strHtml);
            return this;
        },
        loadDataEnd:function(){
            //渲染页面
            this.render();
        }
    })

    return view;

})
define(['backbone','text!homeTpl','template','api','bookModel'],function(B,tpl,artTpl,api,bookModel){
    /// 定义一个视图对象
    var view = B.View.extend({
        //compile方法返回一个带参函数
        template:artTpl.compile(tpl),
        initialize:function(){
            console.log('home_view is initialized!')
            this.model = new bookModel.collection()//创建model变量值为books集合
            this.model.fetch()//向服务器取数据
            this.listenTo(this.model,'sync',this.loadDataEnd)//监听sync事件
        },
        render:function(){
            var strHtml = this.template({title:'首页', data:this.model.toJSON()})
            this.$el.html(strHtml) //把生成的html字符串赋值到view的标签节点上
            return this
        },
        loadDataEnd:function(){
            this.render()//渲染页面
        }
    })

    return view

})
define(['backbone','text!homeTpl','template','api','bookModel','jquery','pace'],function(B,tpl,artTpl,api,bookModel,$,pace){
    /// 定义一个视图对象
    var view = B.View.extend({
        //compile方法返回一个带参函数
        template:artTpl.compile(tpl),
        initialize:function(){
            console.log('home_view is initialized!');
            this.currentPage = 1;
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
            //返回数据完之后当前页码加1
            this.currentPage += 1;
            //渲染页面
            this.render();
        },
        //模板视图事件的注册绑定
        events: {
            'click .borrow': 'borrow',
            'click #loadMore': 'loadMore'
        },
        borrow:function (e) {
            $.ajax({
                url: '/api/v1/borrow',
                method: 'get',
                data: {book_id: e.currentTarget.dataset.id},
                dataType: 'json',
                success: function (res) {
                    alert(res.msg);
                },
                error: function (err) {
                    console.dir(err);
                }
            });
        },
        //加载更多，智能追加model到collection中
        loadMore:function () {
            this.model.fetch({
                url:'/api/v1/books/' + this.currentPage,
                add:true,       //表示新获取的数据会追加到原来的集合中
                remove:false    //如果要实现追加，需设置remove值为false
            })
        }
    })

    return view;

})
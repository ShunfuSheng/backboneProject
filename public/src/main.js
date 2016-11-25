// 主入口文件
require.config({
    paths:{
        'jquery':'./lib/jquery',
        'template':'./lib/template',
        'text':'./lib/text',
        'mainTpl':'./tpl/book_list.html',
        'api':'./api/book',
        'backbone':'./lib/backbone',
        'underscore':'./lib/underscore',
        'loginTpl':'./tpl/login.html', //登陆的模板文件
        'loginView':'./views/login_view', //登陆的视图文件

        'regTpl':'./tpl/reg.html', //注册的模板文件
        'regView':'./views/reg_view', //注册的视图文件

        'userinfoTpl':'./tpl/userinfo.html', //用户中心的模板文件
        'userinfoView':'./views/userinfo_view', //用户中心的视图文件

        'homeTpl':'./tpl/home.html', //首页的模板文件
        'homeView':'./views/home_view', //首页的视图文件

        'bookModel':'./models/book_model'
    }
})
require(['backbone','jquery','loginView','homeView','regView','userinfoView'],function(B,$,loginView,homeView,regView,userinfoView){
    var Router = B.Router.extend({
        routes:{
            "":"indexPage",
            "reg":"regPage",
            "login":"loginPage",
            "userinfo":"userinfoPage"
        },
        indexPage:function(e){
            this.setCurrentStyle('#')
            var view = new homeView()
            $('#main').html(view.render().$el)
            console.log('这里访问的是indexPage')
        },
        regPage:function(){
            this.setCurrentStyle('#reg')
            var view = new regView()
            $('#main').html(view.render().$el)
            console.log('这里访问的是regPage')
        },
        loginPage:function(){
            this.setCurrentStyle('#login')
            var view = new loginView()
            $('#main').html(view.render().$el)
            console.log('这里访问的是loginPage')
        },
        userinfoPage:function(){
            this.setCurrentStyle('#userinfo')
            var view = new userinfoView()
            $('#main').html(view.render().$el)
            console.log('这里访问的是userinfoPage')
        },
        //设置图标的点亮操作
        setCurrentStyle:function(href){
            $('.weui-tabbar a').removeClass('weui-bar__item_on')
            $('.weui-tabbar a[href="'+href+'"]').addClass('weui-bar__item_on')
        }
    })

    var router = new Router()
    B.history.start()
})

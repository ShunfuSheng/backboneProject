#### 目录结构说明

```
    app.js //项目服务器端主入口文件
    model.js //mongoose数据模型
    public //静态资源目录
    public/index.html //主html文件
    public/src/lib/        //依赖库文件目录
    public/src/tpl/        //书籍列表模板文件目录
    public/src/api/        //客户端ajax请求模块
    public/src/main.js     //客户端js主入口文件
```

#### 技术路线
1. node.js的express框架实现服务器端数据接口
2. 数据库方面使用mongodb
3. 测试数据使用的是node.js第三方爬虫模块crawler进行抓取
4. orm方面使用mongoose实现数据库内容读取
5. 客户端js文件使用requirejs进行模块化组织
6. 页面渲染使用art-template模版
7. ui展示效果使用weui框架实现
8. ajax请求使用jquery实现
9. backbone前端框架的应用

#### 项目说明
该项目是基于backbone框架实现的一个学生图书借阅单页面程序，前端页面展示使用了weui框架，后台相关的数据接口使用express框架实现，
测试数据使用的是当当网热销榜中的2500条记录，前端开发方面使用amd规范进行模块化开发；项目的主要功能分为四个部分，分别是学生注册
登录功能，首页分页展示所有书籍信息，通过cookie记录用户标识将用户信息展示在个人中心，通过两个数据表的外连接实现用户借阅功能

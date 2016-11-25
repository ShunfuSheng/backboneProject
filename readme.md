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

#### 主要使用的知识点
1. express框架实现服务器端数据接口
2. mongoose实现数据库内容读取
3. 客户端js文件使用requirejs进行模块化组织
4. 页面渲染使用template模版
5. ui展示效果使用weui实现
6. ajax请求使用jquery实现

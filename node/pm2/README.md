


## 技术栈

nodejs + express + mongodb + mongoose + es6/7


## 项目运行

```
项目运行之前，请确保系统已经安装以下应用
1、node (6.0 及以上版本)
2、mongodb (开启状态)
3、GraphicsMagick (裁切图片)
```

```
cd pm2

npm install

npm run watch

```


# 项目布局

```
.
├── InitData                        初始化数据
│   ├── cities.js                   城市列表
│   └── admin.js                    超级管理员 admin/234567
├── config                          运行配置
│   ├── default.js                  默认配置
│   └── development.js              开发环境
├── controller                      处理中心，负责路由及数据库的具体操作
│   ├── admin
│   │   └── admin.js                管理员
│   ├── user
│   │   └── user.js                 用户
│   ├── payapi
│   ├── common
│   │   └── city.js                 城市
├── logs                            日志文件
├── middlewares                     中间价
│   ├── check.js                    权限验证    
│   └── statistic.js                API数据统计
├── models                          模型(数据库)
│   ├── admin
│   │   └── admin.js                管理员模型
│   ├── user
│   │   └── user.js                 用户
│   ├── ids.js
│   ├── common
│   │   └── cities.js               城市
│   ├── statis
│   │   └── statis.js               数据统计模型
├── mongodb                         连接数据库
│   └── db.js
├── prototype                       基础功能Class
│   ├── addressComponent.js         与腾讯、百度地图API相关的Class
│   └── baseComponent.js            底层类
├── public                          静态资源目录
├── routes                          路由配置
│   ├── index.js                    路由配置主文件
│   ├── admin.js                    管理员
│   ├── user.js                     用户
│   ├── common.js                   公共
├── views   
├── .babelrc 
├── .gitignore
├── app.js                          基础配置
├── index.js                        入口文件
├── package.json
├── README.md                  
.

```




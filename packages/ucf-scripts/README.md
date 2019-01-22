# ucf-scripts

[![npm version](https://img.shields.io/npm/v/ucf-scripts.svg)](https://www.npmjs.com/package/ucf-scripts)
[![NPM downloads](http://img.shields.io/npm/dt/ucf-scripts.svg?style=flat)](https://npmjs.org/package/ucf-scripts)

---

[![NPM](https://nodei.co/npm/ucf-scripts.png)](https://nodei.co/npm/ucf-scripts/)

---

## 介绍

Webpack集成开发工具、高度封装、简化配置、无多余依赖、具有服务启动、开发调试、代理访问、数据模拟、构建资源、自动刷新功能。快速开发UCF微服务工程底层配套工具支撑



## 安装


工具可以依赖UCF项目工程通过`scripts`运行，也可以单独安装全局切换到UCF工程根目录运行使用



```bash
# 全局安装
$ npm install ucf-scripts -g
```

## 使用

1. 通过全局命令启动

切换到项目根目录后执行开发调试、上线构建：
```bash
# 开发启动
$ ucf-scripts start

# 开发构建
$ ucf-scripts build
```
2. 通过`npm scripts`启动

```bash

# 开发启动
$ npm start

# 开发构建
$ npm run build
```
内置已经集成ucf-scripts的启动

## 启动方式对比优劣

全局启动和项目内脚本启动区别：

启动方式 | 优点 | 缺点
---|---|---
全局启动 | 无需根据项目一次次安装重复依赖npm包节省磁盘空间速度 | 不受项目内工具版本控制，会导致每个开发者环境不统一，出现未知版本错误等
脚本启动 | 无需管理全局环境变量、不污染全局变量、随时根据项目内版本更新、可控每一次版本  | 多次项目使用需要反复安装、占用磁盘空间大


## 项目配置文件说明

UCF微服务前端工程核心配置文件只有一个`ucf.config.js`下面对配置文件说明：

```js
module.exports = () => {
    return {
        // 启动所有模块，默认这个配置，速度慢的时候使用另外的配置
        // bootList: true,

        // 启动这两个模块，不启动调试，关闭构建
        bootList: [
            "demo-app-org",
            //"demo-app-staff"
        ],
        // 代理的配置
        proxy: [
            {
                enable: true,
                headers: {
                    // 与下方url一致
                    "Referer": "http://iuap-meger-demo.test.app.yyuap.com"
                },
                //要代理访问的对方路由
                router: [
                    '/iuap'
                ],
                // pathRewrite: {
                //     '^/api/old-path': '/api/new-path', // rewrite path
                //     '^/api/remove/path': '/path' // remove base path
                // },
                url: 'http://iuap-meger-demo.test.app.yyuap.com'
            }
        ],
        // 全局环境变量
        global_env: {
            GROBAL_HTTP_CTX: JSON.stringify("/iuap_demo"),
        },
        // 别名配置
        alias: {
            //'ucf-apps': path.resolve(__dirname, 'ucf-apps/')
        },
        // 构建排除指定包
        externals: {
            //'tinper-bee': 'TinperBee'
        },
        // 调试服务需要运行的插件
        devPlugins: [],
        // 构建服务需要运行的插件
        buildPlugins: []
    }
}
```

## 功能配置节点说明

配置项 | 说明 | 默认值 | 可选值 | 备注
---|---|---|---|---
bootList | 启动、构建入口配置，true表示所有模块全部启用，数组参数按需模块使用 | true | `true`,`['app-name','app-demo']` | 一般默认开启所有模块的调试和构建，低配置机器或者只需要开发一块模块的话可以选择性的去配置单独启动
proxy | 开发调试阶段的代理服务配置 | [] | `enable:true` 是否有效代理,false表示关闭. `headers:{}` 设置代理请求的消息头. `router:['/iuap','wbalone']`. `url:'proxy.example.com'`. 本地请求代理对方服务器地址. `pathRewrite:{}`URL重写服务.  `opts:{}` 如内置配置无法满足需求，需要单独设置原生配置 [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware#options).  | 数组节点可以配置多条代理服务，通过`enable`来控制启用哪个，针对一些服务器校验头信息例如：`Referer`等就需要设置，其他常规的设置工具已经内置，代理路由`router`表示设置的几个路由访问后会代理到对方服务器上，`url`就是对方服务器地址
global_env | 程序内公共变量 | null | 同webpack4 { key : value } | 接收K、V格式如：{GROBAL_HTTP_CTX: JSON.stringify("/iuap_demo")}
alias | 别名 | null | 同webpack4 {key : value} | 接收K、V格式如：{'ucf-apps': path.resolve(__dirname, 'ucf-apps/')}
externals | 排除指定的包用外部变量代理提升打包性能 | null | 同webpack4 { key : value } | 接收K、V格式如：{'tinper-bee': 'TinperBee'}
loader | 内置加载器无法处理需要单独去设置处理 | [] | 同webpack4 loader | 
devPlugins | 开发环境加载的插件 | [] | 同webpack4 plugin | 开发阶段使用的插件
buildPlugins | 生产环境加载的插件 | [] | 同webpack4 plugin | 生产阶段使用的插件

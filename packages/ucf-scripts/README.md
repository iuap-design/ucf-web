# ucf-scripts

[![npm version](https://img.shields.io/npm/v/ucf-scripts.svg)](https://www.npmjs.com/package/ucf-scripts)
[![NPM downloads](http://img.shields.io/npm/dt/ucf-scripts.svg?style=flat)](https://npmjs.org/package/ucf-scripts)

---

[![NPM](https://nodei.co/npm/ucf-scripts.png)](https://nodei.co/npm/ucf-scripts/)

---

## 介绍

Webpack集成开发工具、高度封装、具有服务启动、开发调试、代理访问、数据模拟、自动刷新功能。快速开发UCF微服务工程底层配套工具



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

## 说明

全局启动和项目内脚本启动区别：

启动方式 | 优点 | 缺点
---|---|---
全局启动 | 无需根据项目一次次安装重复依赖npm包节省磁盘空间速度 | 不受项目内工具版本控制，会导致每个开发者环境不统一，出现未知版本错误等
脚本启动 | 无需管理全局环境变量、不污染全局变量、随时根据项目内版本更新、可控每一次版本  | 多次项目使用需要反复安装、占用磁盘空间大


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
                url: 'http://iuap-meger-demo.test.app.yyuap.com'
            }
        ],
        // 全局环境变量
        global_env: {
            GROBAL_HTTP_CTX: JSON.stringify("/iuap_walsin_demo"),
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
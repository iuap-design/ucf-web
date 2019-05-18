# ucf-cli

[![npm version](https://img.shields.io/npm/v/ucf-cli.svg)](https://www.npmjs.com/package/ucf-cli)
[![NPM downloads](http://img.shields.io/npm/dt/ucf-cli.svg?style=flat)](https://npmjs.org/package/ucf-cli)

---

[![NPM](https://nodei.co/npm/ucf-cli.png)](https://nodei.co/npm/ucf-cli/)

---

## 介绍

通过该工具可以快速下载初始化UCF微服务前端工程所有资源到本机开发，并且可以快速创建指定的页面、带路由页面等，功能强大、操作简单易上手。

![image](http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/uba/gui/img/ucf-cli.gif)

![image](http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/uba/gui/img/ucf-cli-err.png)


## 安装


```bash
# 全局安装
$ npm install ucf-cli -g
```

## 使用

安装完成全局后使用下面命令：

```bash

# 指定名称 `ucf-custom`，将会在ucf-custom里面创建资源
$ ucf init ucf-custom

# 快速下载工程到本地，并且不会创建文件夹直接在当前运行根目录进行平铺，适合初始化git仓库使用
$ ucf init


# 快速创建基础页面包含大致UCF微服务工程结构
$ ucf new app

# 查看现有微服务工程名
$ ucf list

```

## 说明

- 查看帮助 `ucf -h`
- 查看版本 `ucf -v`
- 下载工程 `ucf init myweb`
- 创建模块 `ucf new app`
- 查看模块 `ucf list`



## 版本

- `1.2.1` 调整`ucf init`初始化工程必须输入名字，而不是直接平铺到根目录，也可以`ucf init webapp`直接指定工程名
- `1.2.0` 调整`i18n`多语的机制问题，`Intl`多语文件夹调整到`ucf-common`下
- `1.1.1` 修复没有选择多语微应用出现了`Intl`文件夹
- `1.1.0` 增加微应用命令`ucf new app`多语选项的支持
- `1.0.7` 调整微应用显示名称为 `MPA` , `SPA`
- `1.0.6` 调整微应用显示名称为 `singleApp` , `spaApp`
- `1.0.5` 在线更新最新微应用模板(仅测试)
- `1.0.4` 模板App入口修改为`IndexView`
- `1.0.3` 升级模板
- `1.0.2` 增加版本在线检测，有新版本会给出提示升级
- `1.0.1` 更新模板路由页面、`ucf init` 表示在当前根目录下平铺工程文件，适合初始化`git`仓库的时候
- `1.0.0` 支持远端UCF工程初始化到本地、创建微服务模块工程、模块查看、内置两种模板
- `0.0.x` 初步测试版本发布
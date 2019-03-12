/* UCF Start Services
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2019-01-21 13:02:27
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2019-03-12 11:21:10
 */

const path = require('path');
const chalk = require('chalk');
const argv = require("minimist")(process.argv.slice(2));
const commands = argv;
const express = require('express');
const app = new express();
const webpack = require('webpack');
const proxy = require('http-proxy-middleware');
const OpenBrowserPlugin = require("open-browser-webpack-plugin");
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const ip = require('ip');
const getPort = require('get-port');
const util = require('./util');
const webpackConfig = require('./start.config');
const cfg = util.getUcfConfig()('development', commands._);
const compiler = webpack(webpackConfig);


/**
 * server 主程序
 */
server = opt => {
    // 判断是否加载默认页面打开浏览器
    if (commands.homepage) {
        compiler.apply(new OpenBrowserPlugin({
            url: `http://127.0.0.1:${opt.port}/${commands.homepage || ''}`
        }));
    }
    //静态编译
    const instance = devMiddleware(compiler, {
        logTime: true,
        logLevel: commands.logLevel || "info",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Ucf-Server': util.getPkg().version
        },
        stats: {
            colors: true,
            hash: false,
            children: false,
            chunks: false
        }
    });
    cfg.static && app.use(express.static(path.resolve(".", cfg.static)));
    //加载实例
    app.use(instance);
    //热更新
    app.use(hotMiddleware(compiler));

    //加载代理插件
    //处理proxy数组情况
    cfg.proxy && cfg.proxy.forEach(function (element) {
        if (element.enable) {//代理开启
            //默认配置项
            let proxyOpt = {
                target: element.url,
                logLevel: "debug",
                changeOrigin: true,
                pathRewrite: Object.assign({}, element.pathRewrite),
                headers: (typeof element.headers !== 'undefined' ? element.headers : {}),
                onProxyRes: function (proxyRes) {
                    proxyRes.headers["Ucf-Proxy"] = "success";
                }
            }
            app.use(element.router, proxy(element.opts || proxyOpt));
            console.log(chalk.green(`[proxy] : ${element.router} to ${element.url}`));
        }
    });
    //运行调试服务
    app.listen(opt.port, () => {
        console.log();
        console.log(chalk.green(`----------------------------------------------------`));
        console.log(chalk.yellow(`\t 🚀 UCF Develop Server`));
        console.log(chalk.green(`\t [Server Version]: 🏅 ${util.getPkg().version}`));
        console.log(chalk.green(`\t [Local]         : 🏠 http://127.0.0.1:${opt.port}`));
        console.log(chalk.green(`\t [Lan]           : 📡 http://${opt.ip}:${opt.port}`));
        console.log(chalk.green(`----------------------------------------------------`));
        console.log();
    });
}

//插件启动
module.exports = {
    //主程序ucf调用插件Context
    plugin: () => {
        //设置默认端口
        //检测是否被占用，更换端口，启动调试服务
        getPort({
            port: commands.port || 3000
        }).then(port => {
            //启动服务
            server({
                port,
                ip: ip.address()
            });
        });
    }
}
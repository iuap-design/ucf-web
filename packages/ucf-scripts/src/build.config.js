/* Build Webpack4 config
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2019-01-22 14:57:43
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2019-02-27 11:55:19
 */

const glob = require('glob');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const argv = require("minimist")(process.argv.slice(2));
const commands = argv;
const util = require('./util');
const base = require('./base.config');
const cfg = util.getUcfConfig()('production', commands._);


//当前应用模式
//入口集合
const entries = {};
//HTML插件
const HtmlPlugin = [];
//启动器控制
const _bootList = new Set();

const bootList = cfg.bootList ? cfg.bootList : true;

//构造模块加载入口以及html出口
glob.sync('./ucf-apps/*/src/app.js').forEach(_path => {
    let _context = "";
    if (cfg.context) {
        _context = `${cfg.context}/`;
    }
    //模块名
    const module = `${_path.split('./ucf-apps/')[1].split('/src/app.js')[0]}`;
    const chunk = `${_context}${module}/index`;
    const htmlConf = {
        filename: `${chunk}.html`,
        template: `${_path.split('/app.js')[0]}/index.html`,
        inject: 'body',
        chunks: [chunk],
        hash: true
    };
    //处理启动器逻辑
    if (bootList && typeof bootList == 'boolean') {
        entries[chunk] = _path;
        HtmlPlugin.push(new HtmlWebPackPlugin(htmlConf));
    } else if (Array.isArray(bootList) && bootList.length > 0) {
        bootList.forEach(item => {
            _bootList.add(item);
        });
        if (_bootList.has(module)) {
            entries[chunk] = _path;
            HtmlPlugin.push(new HtmlWebPackPlugin(htmlConf));
        }
    }
});

//默认的配置用于merge操作
const config = {
    mode: 'production',
    devtool: 'source-map',
    externals: cfg.externals,
    resolve: {
        alias: cfg.alias
    },
    module: {
        rules: cfg.loader
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                cache: '.cache',
                parallel: true, //undefined false true
                sourceMap: cfg.open_source_map == undefined ? true : cfg.open_source_map
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['ucf-publish'], {
            root: path.resolve(".")
        }),
        ...HtmlPlugin
    ]
}
//入口
config.entry = entries;

//环境变量注入
cfg.global_env && (config.plugins = config.plugins.concat(new webpack.DefinePlugin(cfg.global_env)));
//传入插件设置
cfg.buildPlugins && (config.plugins = config.plugins.concat(cfg.buildPlugins));


module.exports = merge(base, config);
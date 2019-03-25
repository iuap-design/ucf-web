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

// //构造模块加载入口以及html出口
let _context = "";
if (cfg.context) {
    _context = `${cfg.context}/`;
}
//构造模块加载入口以及html出口
if (bootList && typeof bootList == 'boolean') {
    //若bootList为true 则遍历ucf-apps下的所有目录，并识别多级目录的项目
    glob.sync('./ucf-apps/*/**/src/app.js').forEach(_path=>{
        const module = `${_path.split('./ucf-apps/')[1].split('/src/app.js')[0]}`;
        const chunk = `${_context}${module}/index`;
            const htmlConf = {
                filename: `${chunk}.html`,
                template: `${_path.split('/app.js')[0]}/index.html`,
                inject: 'body',
                chunks: [chunk],
                hash: true
            };
        entries[chunk] = [_path, require.resolve('./webpack-hot-middleware/client')];
        HtmlPlugin.push(new HtmlWebPackPlugin(htmlConf));
    })
           
}else{
    const ucfAppPath = path.join( process.cwd(), '/ucf-apps', item, 'src');
    bootList.forEach(item => {
        //模块名
        const chunk = `${_context}${item}/index`;
        const htmlConf = {
            filename: `${chunk}.html`,
            template: path.join(ucfAppPath, '/index.html'), //`${_path.split('/app.js')[0]}/index.html`,
            inject: 'body',
            chunks: [chunk],
            hash: true
        };
        //装载启动器
        entries[chunk] = [path.join(ucfAppPath, '/app.js'), require.resolve('./webpack-hot-middleware/client')];
        HtmlPlugin.push(new HtmlWebPackPlugin(htmlConf));
    });
}

//实验性功能，增加可 debug 版打包，即不压缩混淆 js 代码
let minimizer = [
    new OptimizeCSSAssetsPlugin({})
];
if(commands._[1] !== 'debug'){
    minimizer.push(new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        cache: '.cache',
        parallel: true, //undefined false true
        sourceMap: cfg.open_source_map == undefined ? true : cfg.open_source_map
    }))
}
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
        minimizer: minimizer
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
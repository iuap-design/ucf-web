/* Build Webpack4 config
 * @Author:             Kvkens(yueming@yonyou.com)
 * @Date:               2019-01-22 14:57:43
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2019-06-21 16:39:15
 */

const glob = require('glob');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const argv = require("minimist")(process.argv.slice(2));
const commands = argv;
const util = require('./util');
const base = require('./base.config');
const cfg = util.getUcfConfig(commands._);


//当前应用模式
//入口集合
const entries = {};
//HTML插件
const HtmlPlugin = [];
//启动器控制
const _bootList = new Set();
// 启动器
const bootList = cfg.bootList ? cfg.bootList : true;
// 扫描微应用入口规则
const scan_root = cfg.scan_root ? cfg.scan_root : 'ucf-apps';

//构造模块加载入口以及html出口
glob.sync(`./${scan_root}/**/src/app.js`).forEach(_path => {
    //模块名
    const module = `${_path.split(`./${scan_root}/`)[1].split('/src/app.js')[0]}`;
    const chunk = `${module}/index`;
    const htmlConf = {
        filename: `${chunk}.html`,
        template: `${_path.split('/app.js')[0]}/index.html`,
        inject: 'body',
        chunks: ['vendor', chunk],
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
let splitChunks = {
    cacheGroups: {
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
        },
        //打包重复出现的代码
        vendor: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0, // This is example is too small to create commons chunks
            name: 'vendor'
        },
        //打包第三方类库
        commons: {
            name: 'vendor',
            chunks: 'initial',
            minChunks: Infinity
        }
    }
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
        // 不使用内部压缩参数关闭
        minimize: false
    },
    plugins: [
        new CleanWebpackPlugin(),
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                safe: true,
                mergeLonghand: false,
                discardComments: { removeAll: true }
            },
            canPrint: true
        }),
        new TerserPlugin({
            // test: /\.js(\?.*)?$/i,
            cache: true,
            parallel: true,
            sourceMap: cfg.open_source_map == undefined ? true : cfg.open_source_map
            // include:'vendor',
            // exclude:'vendor',
        }),
        ...HtmlPlugin
    ]
}
// 入口
config.entry = entries;

// 环境变量注入
cfg.global_env && (config.plugins = config.plugins.concat(new webpack.DefinePlugin(cfg.global_env)));
// 传入插件设置
cfg.buildPlugins && (config.plugins = config.plugins.concat(cfg.buildPlugins));
// 是否启用优化资源单独生成文件
cfg.res_extra && (cfg.splitChunks ? config.optimization['splitChunks'] = cfg.splitChunks : config.optimization['splitChunks'] = splitChunks);
module.exports = merge(base, config);
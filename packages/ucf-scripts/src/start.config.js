/* Start Webpack4 config
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2019-01-21 13:02:27
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2019-05-10 10:45:56
 */

const glob = require('glob');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
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

const HtmlPluginConf = cfg.HtmlPluginConf || {};

//加载本地开发环境的Portal
glob.sync('./ucf-common/src/portal/src/app.js').forEach(_path => {
    entries['index'] = './ucf-common/src/portal/src/app.js';
    const htmlConf = {
        filename: `index.html`,
        template: './ucf-common/src/portal/src/index.html',
        inject: 'body',
        chunks: ['index'],
        hash: true
    };
    HtmlPlugin.push(new HtmlWebPackPlugin(htmlConf));
});


//构造模块加载入口以及html出口
glob.sync(`./${scan_root}/**/src/app.js`).forEach(_path => {
            let _context = "";
            //TODO 当publicPath=true 因为start.js webpack-dev-middleware 中配置了publicPath, 所以此处产出路径不在包含 context
            if (!cfg.publicPath && cfg.context) {
                _context = `${cfg.context}/`;
            }
            //模块名
            const module = `${_path.split(`./${scan_root}/`)[1].split('/src/app.js')[0]}`;
    const chunk = `${_context}${module}/index`;

    const targetDir = _path.split('/app.js')[0]
    // 兼容其他类型的模版配置，如：ejs
    const templateType = cfg.templateType ? cfg.templateType : 'html'
    const htmlConf = Object.assign({
        filename: `${chunk}.html`,
        template: `${targetDir}/index.${templateType}`,
        inject: 'body',
        chunks: [chunk],
        hash: true,
        static_url: cfg.static_url ? cfg.static_url : '' 
    },HtmlPluginConf);
    //处理启动器逻辑
    if (bootList && typeof bootList == 'boolean') {
        entries[chunk] = [_path, require.resolve('./webpack-hot-middleware/client')];
        HtmlPlugin.push(new HtmlWebPackPlugin(htmlConf));
    } else if (Array.isArray(bootList) && bootList.length > 0) {
        bootList.forEach(item => {
            _bootList.add(item);
        });
        if (_bootList.has(module)) {
            entries[chunk] = [_path, require.resolve('./webpack-hot-middleware/client')];
            HtmlPlugin.push(new HtmlWebPackPlugin(htmlConf));
        }
    }
});

//默认的配置用于merge操作
const config = {
    devtool: 'source-map',
    mode: 'development',
    externals: cfg.externals,
    resolve: {
        alias: cfg.alias
    },
    module: {
        rules: cfg.loader
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        ...HtmlPlugin
    ]
}
//入口
config.entry = entries;

//环境变量注入
cfg.global_env && (config.plugins = config.plugins.concat(new webpack.DefinePlugin(cfg.global_env)));
//传入插件设置
cfg.devPlugins && (config.plugins = config.plugins.concat(cfg.devPlugins));


module.exports = merge(base, config);
/* Base Webpack4 config
 * @Author:             Kvkens(yueming@yonyou.com)
 * @Date:               2019-01-21 13:02:27
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2019-10-17 18:57:29
 */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const argv = require("minimist")(process.argv.slice(2));
const commands = argv;
const util = require('./util');
const cfg = util.getUcfConfig(commands._);

let _context = "";
// 处理资源展开
let limit = cfg.res_extra ? 8196 : 81960000;
// 处理上下文路径
if (cfg.context) {
    _context = `${cfg.context}/`;
}
// 处理babel插件兼容
cfg.babel_plugins == undefined ? cfg.babel_plugins = [] : cfg.babel_plugins;
// 处理babel preset兼容
cfg.babel_presets == undefined ? cfg.babel_presets = [] : cfg.babel_presets;
// 接收postcss插件
cfg.postcss_plugins == undefined ? cfg.postcss_plugins = [] : cfg.postcss_plugins;
// 扫描微应用入口规则
const scan_root = cfg.scan_root ? cfg.scan_root : 'ucf-apps';
// 输出资源的文件夹
const dist_root = cfg.dist_root ? cfg.dist_root : 'ucf-publish';

const config = {
    output: {
        path: path.resolve('.', dist_root, _context),
        filename: '[name].js',
        chunkFilename: '[name].js',
        //TODO ucf.config 中增加publicPath参数，当publicPath为true时， 使用 context 参数作为生成 publicPath的值, 并且start.js中引入
        //TODO 项目中的产出资源依赖会由原来的  ../../${_context}${chunkName} 路径会变成  /${_context}${chunkName}
        publicPath: cfg.publicPath ? '/' + _context : undefined
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /(node_modules)/,
            include: [path.resolve('.', 'ucf-apps'), path.resolve('.', 'ucf-common'), path.resolve('.', scan_root)],
            use: [{
                loader: require.resolve('babel-loader'),
                options: {
                    babelrc: false,
                    presets: [
                        require.resolve('@babel/preset-env'),
                        require.resolve('@babel/preset-react'),
                        ...cfg.babel_presets
                    ],
                    plugins: [
                        [require.resolve('@babel/plugin-transform-runtime'), {
                            'corejs': false,
                            'helpers': true,
                            'regenerator': true,
                            'useESModules': false
                        }],
                        [require.resolve('babel-plugin-dynamic-import-webpack'), {
                            'helpers': false,
                            'polyfill': true,
                            'regenerator': true
                        }],
                        [require.resolve('@babel/plugin-proposal-decorators'), {
                            "legacy": true
                        }],
                        [require.resolve('@babel/plugin-proposal-class-properties'), {
                            "loose": true
                        }],
                        ...cfg.babel_plugins
                    ]
                }
            }]
        }, {
            test: /\.(le|c)ss$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: './'
                }
            }, {
                loader: require.resolve('css-loader'),
                options: cfg.css
            }, {
                loader: require.resolve('postcss-loader'),
                options: {
                    ident: 'postcss',
                    plugins: (loader) => [require('autoprefixer')({
                        overrideBrowserslist: ['last 2 Chrome versions', 'last 2 Firefox versions', 'Safari >= 7', 'ie > 10']
                    }),
                    require('postcss-flexbugs-fixes'),
                    ...cfg.postcss_plugins
                    ]
                }
            }, {
                loader: require.resolve('less-loader'),
                options: {
                    javascriptEnabled: true,
                    ...cfg.less
                }
            }]
        }, {
            test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
            use: [{
                loader: require.resolve('url-loader'),
                options: {
                    limit,
                    name: '[name].[hash:8].[ext]',
                    //TODO 当publicPath=true 因为start.js webpack-dev-middleware 中配置了publicPath, 所以此处产出路径不在包含 context
                    outputPath: commands._[0] === 'start' && !cfg.publicPath ? `${_context}assets/images/` : 'assets/images/',
                    publicPath: `/${_context}assets/images`
                }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|svg|svgz|otf)$/,
            use: [{
                loader: require.resolve('url-loader'),
                options: {
                    limit,
                    name: '[name].[hash:8].[ext]',
                    //TODO 当publicPath=true 因为start.js webpack-dev-middleware 中配置了publicPath, 所以此处产出路径不在包含 context
                    outputPath: commands._[0] === 'start' && !cfg.publicPath ? `${_context}assets/fonts/` : 'assets/fonts/',
                    publicPath: `/${_context}assets/fonts`
                }
            }]
        }]
    },
    resolve: {
        extensions: [
            ".jsx", ".js", ".less", ".css", ".json"
        ],
        alias: {
            'ucf-apps': path.resolve('.', 'ucf-apps/'),
            'ucf-common': path.resolve('.', 'ucf-common/src/'),
            components: path.resolve('.', 'ucf-common/src/components/'),
            static: path.resolve('.', 'ucf-common/src/static/'),
            utils: path.resolve('.', 'ucf-common/src/utils/')
        }
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `File:[file] Date:${new Date()}`
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
        }),
        new webpack.ProgressPlugin()
    ]
};

module.exports = config;
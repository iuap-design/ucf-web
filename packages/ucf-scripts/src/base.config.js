/* Base Webpack4 config
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2019-01-21 13:02:27
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2019-03-05 16:56:56
 */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const argv = require("minimist")(process.argv.slice(2));
const commands = argv;
const util = require('./util');
const cfg = util.getUcfConfig()('production', commands._);

let _context = "";
let limit = cfg.res_extra ? 8196 : 81960000;
if (cfg.context) {
    _context = `${cfg.context}/`;
}

const config = {
    output: {
        path: path.resolve('.', 'ucf-publish'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /(node_modules)/,
            include: [path.resolve('.', 'ucf-apps'), path.resolve('.', 'ucf-common')],
            use: [{
                loader: require.resolve('babel-loader'),
                options: {
                    babelrc: false,
                    presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-react')],
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
                        }]
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
                    plugins: (loader) => [require('autoprefixer')({ browsers: ['last 2 Chrome versions', 'last 2 Firefox versions', 'Safari >= 7', 'ie > 10'] }),
                    require('postcss-flexbugs-fixes')]
                }
            }, require.resolve('less-loader')]
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|svgz)(\?.+)?$/,
            use: [{
                loader: require.resolve('url-loader'),
                options: {
                    limit,
                    name: '[name].[hash:8].[ext]',
                    outputPath: `${_context}assets/images/`,
                    publicPath: `../assets/images`
                }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: require.resolve('url-loader'),
                options: {
                    limit,
                    name: '[name].[hash:8].[ext]',
                    outputPath: `${_context}assets/fonts/`,
                    publicPath: `../assets/fonts`
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
            banner: 'build:ucf hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
        }),
        new webpack.ProgressPlugin()
    ]
};

module.exports = config;

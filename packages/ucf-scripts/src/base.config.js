/* Base Webpack4 config
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2019-01-21 13:02:27
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2019-01-21 13:02:35
 */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    output: {
        path: path.resolve('.', 'ucf-public'),
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
                        require.resolve('@babel/plugin-proposal-class-properties')
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
                options: {
                    //url: true,
                    //root: path.resolve('.')
                }
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
                    limit: 8192 * 100,
                    name: '[name].[ext]',
                    outputPath: 'images/',
                    publicPath: '../images'
                }
            }]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [{
                loader: require.resolve('url-loader'),
                options: {
                    limit: 8192 * 100,
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: '../fonts'
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

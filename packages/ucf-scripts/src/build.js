/* UCF Build Services
 * @Author: Kvkens(yueming@yonyou.com)
 * @Date:   2019-01-22 09:43:39
 * @Last Modified by:   Kvkens
 * @Last Modified time: 2019-01-22 09:43:42
 */

const chalk = require('chalk');
const webpack = require('webpack');
const util = require('./util');
const webpackConfig = require('./build.config');
const compiler = webpack(webpackConfig);


/**
 * build 主程序
 */
build = () => {
    console.log();
    console.log(chalk.green(`--------------------------------------------`));
    console.log(chalk.yellow(`\t 🚀  UCF Build Server`));
    console.log(chalk.green(`\t [Build Version] : 🏅 ${util.getPkg().version}`));
    console.log();
    console.log(chalk.green(`\t 💪 Good Luck Please Wait ☃️`));
    console.log(chalk.green(`--------------------------------------------`));
    console.log();
    compiler.run((err, stats) => {
        if (!err) {
            console.log('\n' + stats.toString({
                hash: false,
                chunks: false,
                children: false,
                colors: true
            }));
        } else {
            console.log(chalk.red(err));
        }
    });
}
//启动构建
module.exports = {
    plugin: () => {
        build();
    }
}
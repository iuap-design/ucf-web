/**
 * 获得当前UCF下所有模块
 * @author  Kvkens(yueming@yonyou.com)
 * @date    2019-01-24 19:10:34
 */

const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

let appsPath = path.resolve('.', 'ucf-apps/*/');

module.exports = () => {
    glob.sync(appsPath).forEach(_path => {
        console.log(chalk.yellow.bold(`module : ${path.basename(_path)}`))
    });
}
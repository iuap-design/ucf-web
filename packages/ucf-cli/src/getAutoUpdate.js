/**
 * 检测当前是否有新版本，给出提示升级ucf-cli
 * @url http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/uba/ucf-cli-version.json
 */

const request = require('request');
const chalk = require('chalk');
const path = require('path');

module.exports = () => {
    request({ url: 'http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/uba/ucf-cli-version.json' }, (error, response, body) => {
        let result = JSON.parse(body);
        let version = require('../package.json').version;
        if(result['ucf-cli'] != version){
            console.log(chalk.yellow.bold(`New version ${version} -> ${result['ucf-cli']}`));
            console.log(chalk.yellow.bold(`npm install ucf-cli -g`));
        }
    });
}
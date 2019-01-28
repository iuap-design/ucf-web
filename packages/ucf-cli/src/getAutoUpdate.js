/**
 * 检测当前是否有新版本，给出提示升级ucf-cli
 * @url http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/uba/ucf-cli-version.json
 */

const request = require('request');
const downloadUrl = require('download');
const chalk = require('chalk');
const path = require('path');

module.exports = () => {
    request({ url: 'http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/uba/ucf-cli-version.json' }, (error, response, body) => {
        let result = JSON.parse(body);
        console.log(result);
        console.log(__dirname);
        downloadUrl(result['url'], __dirname, { extract: true, strip: 1, mode: '666', headers: { accept: 'application/zip' } })
            .then(function (data) {
                console.log('Successful template update');
            })
            .catch(function (err) {

            })
        let version = require('../package.json').version;
        if (result['ucf-cli'] != version) {
            //console.log(chalk.yellow.bold(`New version ${version} -> ${result['ucf-cli']}`));
            //console.log(chalk.yellow.bold(`npm install ucf-cli -g`));
            // downloadUrl(result['url'], '.', { extract: true, strip: 1, mode: '666', headers: { accept: 'application/zip' } })
            //     .then(function (data) {

            //     })
            //     .catch(function (err) {

            //     })
        }
    });

}
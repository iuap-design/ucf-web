/**
 * 检测当前是否有新版本，给出提示升级ucf-cli
 * @url http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/uba/ucf-cli-version.json
 * @url https://github.com/iuap-design/ucf-web/archive/code-fragment.zip
 */

const request = require('request');
const downloadUrl = require('download');
const chalk = require('chalk');
const path = require('path');
const pathExists = require('path-exists');


getTemplates = (url = 'https://github.com/iuap-design/ucf-web/archive/code-fragment.zip') => {
    downloadUrl(url, __dirname, { extract: true, strip: 1, mode: '666', headers: { accept: 'application/zip' } })
        .then(function (data) {
            console.log(chalk.green.bold('Successful template update'));
        })
        .catch(function (err) {

        })
}

module.exports = () => {
    request({ url: 'http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/uba/ucf-cli-version.json' }, (error, response, body) => {
        let result = JSON.parse(body);
        if (pathExists.sync(path.resolve(__dirname, 'templates'))) {
            let version = require('./package.json').version;
            if (result['ucf-templates'] != version) {
                //console.log(chalk.yellow.bold(`New version ${version} -> ${result['ucf-cli']}`));
                //console.log(chalk.yellow.bold(`npm install ucf-cli -g`));
                getTemplates();
            }
        } else {
            getTemplates();
        }
    });

}
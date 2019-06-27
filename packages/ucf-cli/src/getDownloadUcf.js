/**
 * UCF 下载最新仓库内的UCF完整工程
 * @author  Kvkens(yueming@yonyou.com)
 * @date    2019-01-21 11:14:35
 */

const chalk = require('chalk');
const path = require('path');
const pathExists = require('path-exists');
// const download = require('download-git-repo');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const utils = require('./utils');
const unzipper = require('unzipper');

module.exports = async (folderName = '.') => {
    if (folderName == '.') {
        let inquirerProjectName = await inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'Project Name:',
            default: function () {
                return 'ucf-web';
            }
        }]);
        folderName = inquirerProjectName.name;
    }

    console.log(chalk.green(`\t\t⏳  UCF cloud transfer to local machine ⏳`));
    console.log();
    // console.log(chalk.green(`⏳🔊📢⚠️🇺🇿🌍☁️`));
    console.log(chalk.cyan.bold(`[Info] :    🚀 Start downloading UCF project to the current directory 🎁`));
    console.log(chalk.cyan.bold(`Path:${path.resolve('.', folderName)}  🏠`));
    console.log();

    var ProgressBar = require('./processBar');
    var pb = new ProgressBar('Download', 72);
    var num = 0, total = 100;

    function downloading() {
        if (num < total) {
            pb.render({ completed: num, total: total, status: 'Downloading...' });
            num++;
            setTimeout(function () {
                downloading();
            }, 10);
        } else {
            //pb.render({ completed: num, total: total, status: "Completed." });
            //process.exit(0);
        }
    }

    if (!pathExists.sync(folderName) || folderName == 'ucf-web') {
        downloading();
        // download('iuap-design/ucf-webapp', folderName, function (err) {
        //     if (!err) {
        //         pb.render({ completed: num, total: total, status: "Completed." });
        //         console.log();
        //         console.log();
        //         console.log(chalk.cyan(`🚀 Next, install NPM package dependencies 🎁 `));
        //         console.log(chalk.cyan(`[Tips] : 🏆  cd ${folderName} && npm install && npm start`));
        //     } else {

        //     }
        // });
        // utils.download({
        //     url: "http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/ucf/templates/latest/ucf-webapp-master.zip"
        // }, () => {
        //     pb.render({ completed: num, total: total, status: "Completed." });
        //     console.log();
        //     console.log();
        //     console.log(chalk.cyan(`🚀 Next, install NPM package dependencies 🎁 `));
        //     console.log(chalk.cyan(`[Tips] : 🏆  cd ${folderName} && npm install && npm start`));
        // }, `${folderName}.zip`);
        let result = await utils.getRemoteZip({
            filename: folderName
        });
        let filepath = path.resolve('.');
        if (result.success) {
            fse.createReadStream(`${filepath}/ucf-webapp-master.tmp`).pipe(unzipper.Extract({ path: filepath })).on('close', () => {
                // 删除压缩包
                fse.remove(`${filepath}/ucf-webapp-master.tmp`);
                fse.renameSync(`${filepath}/ucf-webapp-master`,`${filepath}/${folderName}`);
            });
            pb.render({ completed: num, total: total, status: "Completed." });
            console.log();
            console.log();
            console.log(chalk.cyan(`🚀 Next, install NPM package dependencies 🎁 `));
            console.log(chalk.cyan(`[Tips] : 🏆  cd ${folderName} && npm install && npm start`));
        }
    } else {
        console.log(chalk.red.bold(`[Error] :   ⚠️  directory ${folderName} already exists. 😫`));
        console.log(chalk.yellow(`[Tips] :    🤔 Try renaming the project name 🤗  `));
        process.exit(0);
    }

}
/**
 * UCF 下载最新仓库内的UCF完整工程
 * @author  Kvkens(yueming@yonyou.com)
 * @date    2019-01-21 11:14:35
 */

const chalk = require('chalk');
const path = require('path');
const pathExists = require('path-exists');
const download = require('download-git-repo');

module.exports = (folderName = 'ucf-webapp') => {
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
            }, 20);
        } else {
            //pb.render({ completed: num, total: total, status: "Completed." });
            //process.exit(0);
        }
    }

    

    if (!pathExists.sync(folderName)) {
        downloading();
        download('iuap-design/ucf-webapp', folderName, function (err) {
            if (!err) {
                pb.render({ completed: num, total: total, status: "Completed." });
                console.log();
                console.log();
                console.log(chalk.cyan(`🚀 Next, install NPM package dependencies 🎁 `));
                console.log(chalk.cyan(`[Tips] : 🏆  cd ${folderName} && npm install && npm start`));
            }else{

            }
        });
    } else {
        console.log(chalk.red.bold(`[Error] :   ⚠️  directory ${folderName} already exists. 😫`));
        console.log(chalk.yellow(`[Tips] :    🤔 Try renaming the project name 🤗  `));
        process.exit(0);
    }

}
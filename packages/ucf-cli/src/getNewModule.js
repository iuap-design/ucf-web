/**
 * UCF 微服务前端工程最佳实践页面生成
 * @author  Kvkens(yueming@yonyou.com)
 * @date    2019-01-24 18:15:48
 */

const chalk = require('chalk');
const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');

module.exports = async (app = 'app') => {
    // 连接配置文件
    let ucfFilePath = path.resolve('.', 'ucf.config.js');
    // 目标路径
    let ucfApps = path.resolve('.', 'ucf-apps');
    // 模板路径
    let ucfPathTmp = path.resolve(__dirname, './templates');
    // 人机交互选择的模板名称
    let ucfSelectTempArr = ['normal', 'routes'];
    // 生成模块参数
    let ucfParam = {
        name: '',
        mode: ''
    };
    //所有new操作主逻辑
    switch (app) {
        case 'app':
            // TO DO : 1. 检测ucf.config.js是否存在，来判断当前目录是否正确
            let hasUcfFile = await fse.pathExists(ucfFilePath);
            if (hasUcfFile) {
                //TO DO : 2.1 确定正确目录下，开始执行下一步模块选择操作
                console.log(chalk.cyan('🎁  Create App module startup...'));
                //TO DO : 3 展示人机交互，输入工程模块名，选择模板

                // 输入模块名
                let inquirerTempName = await inquirer.prompt([{
                    type: 'input',
                    name: 'inputName',
                    message: 'Page Name:',
                    default: function () {
                        return 'ucf-app-demo';
                    }
                }]);

                ucfParam.name = inquirerTempName.inputName;

                // 选择哪种方式的页面
                let inquirerTempModule = await inquirer.prompt([{
                    type: 'list',
                    name: 'selectTemplates',
                    message: 'UCF Templates Please Select:',
                    choices: ucfSelectTempArr
                }]);

                ucfParam.mode = inquirerTempModule.selectTemplates;

                await fse.copy(path.resolve(ucfPathTmp, ucfParam.mode), path.resolve(ucfApps, ucfParam.name));

                console.log(chalk.green(`🤗  Module Creation Successfully to \n💪  ${path.resolve(ucfApps, ucfParam.name)}`))
                
            } else {
                //TO DO : 2.2 找不到配置文件，说明运行目录不正确给出提示
                console.log(chalk.red.bold('😫  Error failed to find ucf.config configuration file'));
            }
            break;
        default:
            break;
    }
}
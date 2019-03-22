/**
 * UCF 微服务前端工程最佳实践页面生成
 * @author  Kvkens(yueming@yonyou.com)
 * @date    2019-03-22 14:20:06
 */

const chalk = require('chalk');
const path = require('path');
const fse = require('fs-extra');
const inquirer = require('inquirer');
const ejs = require('ejs');

module.exports = async (app = 'app') => {
    // 连接配置文件
    let ucfFilePath = path.resolve('.', 'ucf.config.js');
    // 目标路径
    let ucfApps = path.resolve('.', 'ucf-apps');
    // 模板路径
    let ucfPathTmp = path.resolve(__dirname, './templates');
    // 人机交互选择的模板名称
    let ucfSelectTempArr = ['MPA', 'SPA'];
    // 生成模块参数
    let ucfParam = {
        name: '',// 微应用名字
        mode: '',// 选择哪种模板
        i18n: false,// 是否需要多语
    };
    // TO DO : 1. 检测ucf.config.js是否存在，来判断当前目录是否正确
    let hasUcfFile = await fse.pathExists(ucfFilePath);
    if (!hasUcfFile) {
        //TO DO : 2.2 找不到配置文件，说明运行目录不正确给出提示
        console.log(chalk.red.bold('😫  Error failed to find ucf.config configuration file'));
        process.exit(1);
    }
    //TO DO : 2.1 确定正确目录下，开始执行下一步模块选择操作

    // 所有new操作主逻辑
    switch (app) {
        case 'app':
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

            // 选择哪种方式的页面
            let inquirerTempI18n = await inquirer.prompt([{
                type: 'confirm',
                name: 'selectI18n',
                message: 'Do you need i18n',
            }]);

            ucfParam.i18n = inquirerTempI18n.selectI18n;

            // console.log(ucfParam);
            // process.exit(0);

            // 复制微应用模板到客户指定位置
            await fse.copy(path.resolve(ucfPathTmp, ucfParam.mode), path.resolve(ucfApps, ucfParam.name));
            // 判断模板类型 mode
            switch (ucfParam.mode) {
                case 'MPA':
                    // #package.json
                    let pkg_path = path.resolve(ucfApps, ucfParam.name, 'package.json');
                    let pkg_json = await ejs.renderFile(pkg_path, { name: ucfParam.name });
                    await fse.outputFile(pkg_path, pkg_json);

                    // #app.js
                    let app_path = path.resolve(ucfApps, ucfParam.name, 'src', 'app.js');
                    let app_json = await ejs.renderFile(app_path, { isI18n: ucfParam.i18n });
                    await fse.outputFile(app_path, app_json);

                    // #container.js
                    let container_path = path.resolve(ucfApps, ucfParam.name, 'src', 'container.js');
                    let container_json = await ejs.renderFile(container_path, { isI18n: ucfParam.i18n });
                    await fse.outputFile(container_path, container_json);

                    // #App/index.js
                    let app_index_path = path.resolve(ucfApps, ucfParam.name, 'src', 'components', 'app', 'index.js');
                    let app_index_json = await ejs.renderFile(app_index_path, { isI18n: ucfParam.i18n });
                    await fse.outputFile(app_index_path, app_index_json);
                    break;
                case 'SPA':

                    break;
                default:
                    break;
            }


            console.log(chalk.green(`🤗  Module Creation Successfully to \n💪  ${path.resolve(ucfApps, ucfParam.name)}`));
            break;
        default:
            break;
    }
}
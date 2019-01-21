/**
 * UCF 微服务前端工程最佳实践脚手架生成工具
 * @author  Kvkens(yueming@yonyou.com)
 * @date    2019-01-21 11:14:35
 */


const request = require('request');
const chalk = require('chalk');
const inquirer = require('inquirer');
const path = require('path');
const pathExists = require('path-exists');
const fs = require('fs');
const download = require('download-git-repo');
const spawn = require('cross-spawn');

function getHelp() {
    console.log(chalk.green(" Usage : "));
    console.log();
    console.log(chalk.green(" ucf init \t Create a standard microservice front-end project"));
    console.log();
    console.log(chalk.green(" ucf new app \t Create a module page \n \t\t There are two types of pages: separate pages and separate pages containing routing."));
    console.log();
    process.exit(0);
}

function getVersion() {
    console.log(chalk.green(require("../package.json").version));
    process.exit(0);
}

module.exports = {
    plugin: function (options) {
        commands = options.cmd;
        pluginname = options.name;
        if (options.argv.h || options.argv.help) {
            getHelp();
        }
        if (options.argv.v || options.argv.version) {
            getVersion();
        }

        console.log(chalk.green("Available official templates:"));
    }
}
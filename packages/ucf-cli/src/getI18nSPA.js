/**
 * 生成SPA微应用
 */

const path = require('path');
const fse = require('fs-extra');
const ejs = require('ejs');

module.exports = async (ucfApps, ucfParam) => {
    // let IntlDirPath = path.resolve(ucfApps, ucfParam.name, 'src', 'Intl');
    // #package.json
    let sps_pkg_path = path.resolve(ucfApps, ucfParam.name, 'package.json');
    let sps_pkg_json = await ejs.renderFile(sps_pkg_path, { name: ucfParam.name });
    await fse.outputFile(sps_pkg_path, sps_pkg_json);

    // #app.js
    let spa_app_path = path.resolve(ucfApps, ucfParam.name, 'src', 'app.js');
    let spa_app_json = await ejs.renderFile(spa_app_path, { isI18n: ucfParam.i18n });
    await fse.outputFile(spa_app_path, spa_app_json);

    // #home/container.js
    // let home_container_path = path.resolve(ucfApps, ucfParam.name, 'src', 'routes', 'home', 'container.js');
    // let home_container_json = await ejs.renderFile(home_container_path, { isI18n: ucfParam.i18n });
    // await fse.outputFile(home_container_path, home_container_json);

    // #home/components/IndexView/index.js
    let indexview_path = path.resolve(ucfApps, ucfParam.name, 'src', 'routes', 'home', 'components', 'IndexView', 'index.js');
    let indexview_json = await ejs.renderFile(indexview_path, { isI18n: ucfParam.i18n });
    await fse.outputFile(indexview_path, indexview_json);
    // 删除不属于多语的文件夹
    // if (!ucfParam.i18n) {
    //     await fse.remove(IntlDirPath)
    // }
}
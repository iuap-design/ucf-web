const rp = require('request-promise');
const path = require('path');
const fse = require('fs-extra');

const download = async function (options, filename, cb) {
    let opts = {
        method: 'get',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': 1
        }
    }
    opts = { ...opts, ...options };
    // 获得文件夹路径
    let fileFolder = path.dirname(filename);
    // 创建文件夹
    fse.ensureDirSync(fileFolder);
    // 开始下载无需返回
    rp(opts).pipe(fse.createWriteStream(filename)).on('close', cb);
}

/**
 * 下载zip压缩包包含路径文件名
 */
const getRemoteZip = ({ filename, filepath }, cb) => {
    let url = `http://iuap-design-cdn.oss-cn-beijing.aliyuncs.com/static/ucf/templates/latest/ucf-webapp-master.zip`
    return new Promise((resolve, reject) => {
        download({ url }, `ucf-webapp-master.tmp`, () => {
            resolve({ success: true });
        });
    });
}


exports.download = download;
exports.getRemoteZip = getRemoteZip;
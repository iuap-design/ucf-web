
- 存放 ucf init 时自动生成的标准工程代码，里面默认有一个Hello world
- 存放 ucf new app 时创建三种微应用的标准代码

## 标准工程中的三方包管理

最小集：

```
{
  "name": "xx-webapp",
  "version": "1.0.0",
  "description": "开发思路",
  "main": "index.js",
  "scripts": { },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "ucf-scripts": "^7.2.2"
  },
  "dependencies": {
    "ucf-request": "^0.18.0",
    "tinper-bee": "^1.0.10",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "mirrorx": "^1.6.9",
    "ucf-mdf": "2.3.4"
  }
}

```
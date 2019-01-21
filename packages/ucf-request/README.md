# ucf-request

网络请求库，基于 axios 封装, 旨在为开发者提供一个统一的api调用方式.

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/ucf-request.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ucf-request
[travis-image]: https://img.shields.io/travis/iuap-design/ucf-request.svg?style=flat-square
[travis-url]: https://travis-ci.org/iuap-design/ucf-request.svg?branch=master

--------------------

## 支持的功能
- url 参数自动序列化
- post 数据提交方式简化
- response 返回处理简化
- api 超时支持
- axios 的 request 和 response 拦截器(interceptors)支持
- 统一的错误处理方式


## 安装
`npm install ucf-request --save`


## 使用
```javascript

import request from 'ucf-request';


// 请求一个api, 没有method参数默认为get
request('/api/v1/some/api').then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});

// url参数序列化
request('/api/v1/some/api', { params: {foo: 'bar'} });

// post 数据提交简化
// 当data为object时, 默认requestType: 'json'可不写, header会自动带上 application/json
request('/api/v1/some/api', { method:'post', data: {foo: 'bar'} });

// requestType: 'form', header会自动带上 application/x-www-form-urlencoded
request('/api/v1/some/api', { method:'post', requestType: 'form', data: {foo: 'bar'} });

// reponseType: 'blob', 如何处理返回的数据, 默认情况下 text 和 json 都不用加. 如blob 或 formData 之类需要加
request('/api/v1/some/api', { reponseType: 'blob' });

// 提交其他数据, 如文本, 上传文件等, requestType不填, 手动添加对应header.
request('/api/v1/some/api', { method:'post', data: 'some data', headers: { 'Content-Type': 'multipart/form-data'} });


// 超时 单位毫秒, 但是超时后客户端虽然返回超时, 但api请求不会断开, 写操作慎用.
request('/api/v1/some/api', { timeout: 3000 });

// 使用缓存, 只有get时有效. 单位毫秒, 不加ttl默认60s, ttl=0不过期. cache key为url+params组合
request('/api/v1/some/api', { params: { hello: 'world' }, useCache: true, ttl: 10000 });

// 当服务端返回的是gbk时可用这个参数, 避免得到乱码
request('/api/v1/some/api', { charset: 'gbk' });

```
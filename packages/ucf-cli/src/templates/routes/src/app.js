/**
 * 入口、路由、导入组件样式、渲染页面
 */

import React from 'react';
import mirror, { render, Router } from 'mirrorx';
import Routes from './routes';
// 组件库样式
import 'tinper-bee/assets/tinper-bee.css';
// 全局样式
import './app.less';

// 设置mirrorx 路由加载方式
mirror.defaults({
    historyMode: "hash"
});

render(<Router>
    <Routes />
</Router>, document.querySelector("#app"));
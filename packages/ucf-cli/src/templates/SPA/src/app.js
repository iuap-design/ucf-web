/**
 * 入口、路由、导入组件样式、渲染页面
 */

import React from 'react';
import mirror, { render, Router } from 'mirrorx';
<% if(isI18n){ %>
// 项目内多语组件引用
import Intl from 'components/Intl';
<% } %>
import Routes from './routes';
// 组件库样式
import 'tinper-bee/assets/tinper-bee.css';
// 全局样式
import './app.less';

// 设置mirrorx 路由加载方式
mirror.defaults({
    historyMode: "hash"
});
<% if(isI18n){ %>
render(<Intl><Router>
    <Routes />
</Router></Intl>, document.querySelector("#app"));
<% }else{ %>
render(<Router>
    <Routes />
</Router>, document.querySelector("#app"));
<% } %>
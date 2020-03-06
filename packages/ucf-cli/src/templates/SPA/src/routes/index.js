/**
 * 前端路由说明：
 * 基于浏览器 History 的前端 Hash 路由
 */

import React from "react";
import { Route } from "mirrorx";

// 引用mirrorx作为connect
import mirror, { connect } from 'mirrorx';

// 默认页面组件
import Home from './home/components/IndexView';
import Contact from './contact/components/IndexView';
//引用模型
import homeModel from './home/model';
import contactModel from './contact/model';

// 数据和组件UI关联、绑定
mirror.model(homeModel);

// 数据和组件UI关联、绑定
mirror.model(contactModel);


const ConnectedContact = connect(state => state.contact)(Contact);

const ConnectedHome = connect(state => state.home)(Home);


export default () => (
    <div className="route-content">
        <Route exact path="/" component={ConnectedHome} />
        <Route exact path="/home" component={ConnectedHome} />
        <Route exact path="/contact" component={ConnectedContact} />
    </div>
);
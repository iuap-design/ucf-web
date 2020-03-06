/**
 * 入口、导入组件样式、渲染
 */

import React from 'react';
import { render } from 'mirrorx';
import mirror, { connect } from 'mirrorx';
import IndexView from './components/App';

import model from './model'

import './app.less';

// 数据和组件UI关联、绑定
mirror.model(model);

const App = connect(state => state.app)(IndexView);


render(<App />, document.querySelector("#app"));
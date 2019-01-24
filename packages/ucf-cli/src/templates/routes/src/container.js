/**
 * 容器类组件
 */

import mirror, { connect } from 'mirrorx';
import Home from './routes/home';
import model from './model'

mirror.model(model);
// 数据和组件UI关联、绑定
export const ConnectedHome = connect(state => state.app)(Home);

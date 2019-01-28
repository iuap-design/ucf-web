/**
 * 容器类组件
 */

import mirror, { connect } from 'mirrorx';
import App from './components/App';
import model from './model'

mirror.model(model);
// 数据和组件UI关联、绑定
export default connect(state => state.app)(App);

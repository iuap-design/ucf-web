/**
 * 容器类组件
 */

// 引用mirrorx作为connect
import mirror, { connect } from 'mirrorx';
<% if(isI18n){ %>
// 多语组件引用
import { injectIntl } from 'react-intl';
<% } %>
// 默认页面组件
import IndexView from './components/IndexView';
//引用模型
import model from './model'

// 数据和组件UI关联、绑定
mirror.model(model);
<% if(isI18n){ %>
export const ConnectedHome = connect(state => state.home)(injectIntl(IndexView));
<% }else{ %>
export const ConnectedHome = connect(state => state.home)(IndexView);
<% } %>
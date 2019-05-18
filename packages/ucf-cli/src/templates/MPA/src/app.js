/**
 * 入口、导入组件样式、渲染
 */

import React from 'react';
import { render } from 'mirrorx';
<% if(isI18n){ %>
// 国际化多语包引用
import { IntlProvider } from 'react-intl';
// 项目内多语组件引用
import Intl from 'components/Intl';
<% } %>
import App from "./container";

import 'ucf-common/styles/tinper-bee.css';
import 'ucf-common/styles/public.less';
import './app.less';


<% if(isI18n){ %>
render(<Intl>
        <IntlProvider>
            <App />
        </IntlProvider>
    </Intl>, document.querySelector("#app"));
<% }else{ %>
render(<App />, document.querySelector("#app"));
<% } %>
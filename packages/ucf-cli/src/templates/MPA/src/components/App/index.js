/**
 * App模块
 */

import React, { Component } from 'react';
import mirror, { actions } from 'mirrorx';
import './index.less';

class App extends Component {
    render() {
        return (
            <div className="app-wrap">
                Hello,World
            </div>
        );
    }
}

App.displayName = "App";
export default App;

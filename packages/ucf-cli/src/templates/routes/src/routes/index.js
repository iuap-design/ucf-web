/**
 * 前端路由说明：
 * 基于浏览器 History 的前端 Hash 路由
 */

import React from "react";
import { Route } from "mirrorx";
import { ConnectedHome } from "../container";

export default () => (
    <div className="route-content">
        <Route exact path="/" component={ConnectedHome} />
    </div>
);
/**
 * App模块
 */

import React, { Component } from 'react';
import { Table, Button } from 'tinper-bee';

import './index.less';

class App extends Component {
    constructor(props) {
        super(props);
    }
    columns = [
        {
            title: '用户名',
            dataIndex: "username",
            key: "username",
            width: 300
        },
        {
            title: '性别',
            dataIndex: "sex",
            key: "sex",
            width: 500
        },
        {
            title: '年龄',
            dataIndex: "age",
            key: "age",
            width: 200
        }
    ];
    data = [
        { username: "令狐冲", sex: "男", age: 41, d: "操作", key: "1" },
        { username: "杨过", sex: "男", age: 67, d: "操作", key: "2" },
        { username: "郭靖", sex: "男", age: 25, d: "操作", key: "3" }
    ];
    render() {
        return (
            <div className="app-wrap">
                <Table
                    columns={this.columns}
                    data={this.data}
                    onRowClick={(record, index, indent) => {
                        console.log(record, index);
                    }}
                    footer={() =>
                        <Button colors="info">
                            确认
                        </Button>
                    }
                />
            </div>
        );
    }
}

App.displayName = "App";
export default App;

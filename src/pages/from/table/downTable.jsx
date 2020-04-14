import React, { Component } from 'react'
import { Table, Button, Popconfirm, message } from 'antd';
import { Execute, downDelete, History } from '../../../api/from';
import _ from 'lodash';
import moment from 'moment';

const columns = (app) => ([
    {
        title: '组名',
        dataIndex: 'group',
        key: 'group',
    },
    {
        title: '货币对',
        dataIndex: 'symbol',
        key: 'symbol',
    },
    {
        title: '交易所',
        dataIndex: 'exchanges',
        key: 'exchanges',
    },
    {
        title: '是否执行过',
        dataIndex: 'isStart',
        key: 'isStart',
        render: (text) => {
            // console.log('是否执行过', text)
            if (text) {
                return (<span className="_btn execute_btn">已执行过</span>)
            }
            return (<span className="_btn noexecute_btn">未执行过</span>)
        }
    },
    {
        title: '文件日期',
        dataIndex: 'date',
        key: 'date'
    },
    {
        title: '操作日期',
        dataIndex: 'time',
        key: 'time',
        render: (text) => {
            console.log('text', text)
            if (!text) {
                return moment(new Date()).format('YYYY-MM-DD')
            }
            return moment(text).format('YYYY-MM-DD')
        }
    },
    {
        title: '操作',
        key: 'opt',
        render: (text, record) => (
            <div>
                {
                    record.isStart ? (
                        <Popconfirm
                            placement="topLeft"
                            title="已执行过确定要再次执行吗？"
                            onConfirm={(e) => app.execute(e, record)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button size="small" style={{ marginRight: 10 }}>执行</Button>
                        </Popconfirm>
                    ) : (<Button onClick={(e) => app.execute(e, record)} size="small" style={{ marginRight: 10 }}>执行</Button>
                        )
                }
                <Popconfirm
                    placement="topLeft"
                    title="确认要删除吗？"
                    onConfirm={(e) => app.delete(e, record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="danger" size="small">删除</Button>
                </Popconfirm>
            </div>
        )
    }
]);
class IndexPage extends Component {

    state = {
        downData: [],
    }

    componentDidMount() {
        // const res = this.getRes();
       this.getHistory()

    }

    getHistory = () => {
        History().then((res) => {
            if (res.code === 1200) {
                this.setState({
                    downData: _.map(res.obj || [], (item, index) => ({ ...item, id: index })),
                }, () => {
                    // console.log('downData', this.state.downData)
                })
            }
        })
    }

    getRes = () => (
        {
            "code": 1200,
            "msg": "请求成功",
            "obj": [
                {
                    "group": 'test001',
                    "symbol": 'BTC/USD',
                    "exchanges": 'AAAAA,BBBB,CCCCC',
                }, {
                    "group": 'test001',
                    "symbol": 'BTC/USD',
                    "exchanges": 'AAAAA,BBBB,CCCCC',
                }, {
                    "group": 'test001',
                    "symbol": 'BTC/USD',
                    "exchanges": 'AAAAA,BBBB,CCCCC',
                }],
        }
    )

    execute = (e, record) => {
        e.preventDefault();
        Execute(record).then((res) => {
            if (res.code === 1200) {
                message.success(res.msg)
            } else {
                message.error(res.msg)
            }
        })

    }

    delete = (e, record) => {
        e.preventDefault();
        downDelete(record).then((res) => {
            if (res.code === 1200) {
                message.success('删除成功！');
                this.getHistory();
            } else {
                message.error(res.msg)
            }
        })
    }

    render() {
        return (
            <div style={{ marginTop: 40, background: "#ffffff", minHeight: 500, padding: '50px 40px' }}>
                <Table
                    size="small"
                    pagination={false}
                    rowKey="id"
                    dataSource={this.state.downData}
                    columns={columns(this)}
                // scroll={{ x: 1800 }}
                />
            </div>
        )
    }
}

export default IndexPage

import React, { Component } from 'react'
import { Row, Col, Table, Form, Input, Button } from 'antd';

const columns = (app) => ([
    {
        title: '价格',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '数量',
        dataIndex: 'avg',
        key: 'avg',
    },
    {
        title: '成交额',
        dataIndex: 'med',
        key: 'med',
    }
]);

const columnsRight = (app) => ([
    {
        title: '交易对',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '价格',
        dataIndex: 'avg',
        key: 'avg',
    },
    {
        title: '涨跌',
        dataIndex: 'med',
        key: 'med',
    }
])

const columnsRightDown = (app) => ([
    {
        title: '价格',
        dataIndex: 'time',
        key: 'time',
    },
    {
        title: '数量',
        dataIndex: 'avg',
        key: 'avg',
    },
    {
        title: '时间',
        dataIndex: 'med',
        key: 'med',
    }
])


class index extends Component {
    state = {
        symbols: '',
        leftTop: [],
        leftDown: [],
        rightTop: [],
        rightDown: [],
    }

    componentDidMount() {
        const url = window.location.hash.split('/')
        console.log(url[url.length - 1])
        const symbol = url[url.length - 1].split('_');
        const symbols = `${symbol[0]}/${symbol[1]}`
        this.setState({
            symbols,
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="main-page">
                <div className="list-title">
                    <Row gutter={12}>
                        <Col span={6}>
                            <p>{this.state.symbols}</p>
                            <div className="table-top">
                                <Table
                                    size="small"
                                    pagination={false}
                                    rowKey="id"
                                    dataSource={this.state.leftTop}
                                    columns={columns(this)}
                                // scroll={{ y: 500 }} 
                                />
                            </div>
                            <div>
                                <Table
                                    showHeader={false}
                                    size="small"
                                    pagination={false}
                                    rowKey="id"
                                    dataSource={this.state.leftDown}
                                    columns={columns(this)}
                                // scroll={{ y: 500 }} 
                                />

                            </div>
                        </Col>
                        <Col span={12} className="f_Box">
                            <div className="f_center">
                                <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onSubmit={this.handleSubmit} labelAlign="left">
                                    <h3>买入 BTC </h3>
                                    <Form.Item label="价格">
                                        {getFieldDecorator('note', {
                                            rules: [{ required: true, message: 'Please input your note!' }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="数量">
                                        {getFieldDecorator('gender', {
                                            rules: [{ required: true, message: 'Please select your gender!' }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="成交额">
                                        {getFieldDecorator('e', {
                                            rules: [{ required: true, message: 'Please select your gender!' }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ span: 12, offset: 8 }} style={{ marginTop: 25 }}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
          </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className="f_center">
                            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onSubmit={this.handleSubmit} labelAlign="left">
                                    <h3>买出 BTC </h3>
                                    <Form.Item label="价格">
                                        {getFieldDecorator('note', {
                                            rules: [{ required: true, message: 'Please input your note!' }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="数量">
                                        {getFieldDecorator('gender', {
                                            rules: [{ required: true, message: 'Please select your gender!' }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item label="成交额">
                                        {getFieldDecorator('e', {
                                            rules: [{ required: true, message: 'Please select your gender!' }],
                                        })(<Input />)}
                                    </Form.Item>
                                    <Form.Item wrapperCol={{ span: 12, offset: 8 }} style={{ marginTop: 25 }}>
                                        <Button type="primary" htmlType="submit">
                                            Submit
          </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className="table-top">
                                <Table
                                    size="small"
                                    pagination={false}
                                    rowKey="id"
                                    dataSource={this.state.rightTop}
                                    columns={columnsRight(this)}
                                    scroll={{ y: 300 }}
                                />
                            </div>
                            <h4>最新成交</h4>
                            <div>
                                <Table
                                    showHeader={false}
                                    size="small"
                                    pagination={false}
                                    rowKey="id"
                                    dataSource={this.state.rightDown}
                                    columns={columnsRightDown(this)}
                                    scroll={{ y: 300 }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Form.create()(index);

import React, { Component } from 'react';
import { Breadcrumb, Form, Button, Row, Col, Table, Input, Select } from 'antd';
import { getBpsTable } from '../../../api/from';
import _ from 'lodash';

const { Option } = Select;
const columns = (app) => ([
    {
        title: 'exchange',
        dataIndex: 'exchange',
        key: 'exchange',
    },
    {
        title: '平均值',
        dataIndex: 'avg',
        key: 'avg',
    },
    {
        title: '中值',
        dataIndex: 'med',
        key: 'med',
    },
    {
        title: '标准差',
        dataIndex: 'stdev',
        key: 'stdev',
        // render: record => `${record.message.symbol} on ${record.monitorType}`,
    },
    {
        title: '最大值',
        dataIndex: 'max',
        key: 'max',
    },
    {
        title: '最小值',
        dataIndex: 'min',
        key: 'min',
    },
    {
        title: '10分位',
        dataIndex: 'quantile_10',
        key: 'quantile_10',
    },
    {
        title: '90分位',
        dataIndex: 'quantile_90',
        key: 'quantile_90',
    },
]);

class indexPage extends Component {
    constructor() {
        super();
        this.state = {
            bidData: [],
            askData: []
        }
    }

    componentDidMount() {
        getBpsTable().then((data) => {
            if (data.code === 1200 && data.obj) {
                let ask = data.obj.ask;
                let bid = data.obj.bid;
                ask = _.map(ask, (item, index) => ({ ...item, id: index }));
                bid = _.map(bid, (item, index) => ({ ...item, id: index }));
                this.setState({
                    askData: ask,
                    bidData: bid
                })
            }
        });
    }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            const values = {
                ...fieldsValue,
            };
            getBpsTable(values).then((data) => {
                if (data.code === 1200 && data.obj) {
                    let ask = data.obj.ask;
                    let bid = data.obj.bid;
                    ask = _.map(ask, (item, index) => ({ ...item, id: index }));
                    bid = _.map(bid, (item, index) => ({ ...item, id: index }));
                    this.setState({
                        askData: ask,
                        bidData: bid
                    })
                }
            });
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>queryBps表格</Breadcrumb.Item>
                </Breadcrumb>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Row gutter={8}>
                        <Col span={6}>
                            < Form.Item label="grpType" >
                                {getFieldDecorator('grpType', {
                                    rules: [{ required: true, message: 'Please input the grpType you got!' }],
                                })(<Input placeholder="" />)}
                            </Form.Item >
                        </Col>
                        <Col span={6}>
                            < Form.Item label="bps" >
                                {getFieldDecorator('bps', {
                                    initialValue: '1',
                                    rules: [{ required: true, message: 'Please input the bps you got!' }],
                                })(
                                    <Select>
                                        <Option value="1">1</Option>
                                        <Option value="3">3</Option>
                                        <Option value="5">5</Option>
                                        <Option value="10">10</Option>
                                        <Option value="20">20</Option>
                                        <Option value="40">40</Option>
                                    </Select>
                                )}
                            </Form.Item >
                        </Col>
                        <Col span={6}>
                            <Form.Item label="cType">
                                {getFieldDecorator('cType', {
                                    initialValue: '1',
                                    rules: [{ required: true, message: 'Please input the cType you got!' }],
                                })(
                                    <Select>
                                        <Option value="1">C1</Option>
                                        <Option value="0">C0</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={3}>
                            <Form.Item
                                wrapperCol={{
                                    xs: { span: 24, offset: 0 },
                                    sm: { span: 16, offset: 8 },
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    查询

                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form >
                <Row gutter={24} style={{ padding: '30px 10px', background: '#fff' }}>
                    <Col span={12}>
                        <Table
                            size="small"
                            pagination={false}
                            rowKey="id"
                            dataSource={this.state.bidData}
                            title={() => 'Bid'}
                            columns={columns(this)}
                        // scroll={{ x: 1800 }}
                        />
                    </Col>
                    <Col span={12}>
                        <Table
                            size="small"
                            pagination={false}
                            rowKey="id"
                            title={() => 'Ask'}
                            dataSource={this.state.askData}
                            columns={columns(this)}
                        // scroll={{ x: 1800 }}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create()(indexPage);

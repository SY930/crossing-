import React, { Component } from 'react'
import { Row, Col, Table, Form, Input, Button, Select,  } from 'antd'
import { getSymbols } from '../../api/detail'
import _ from 'lodash'
import moment from 'moment';

const Option = Select.Option;

const columns = (app) => ([
    {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: 90,
    },
    {
        title: '数量',
        dataIndex: 'count',
        key: 'count',
        align: 'left',
        width: 70,
    },
    {
        title: '成交额',
        dataIndex: 'sum',
        key: 'sum',
        render: (t, record) => {
            return (record.price - 0) * (record.count - 0)
        }
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
        dataIndex: 'dealPrice',
        key: 'dealPrice',
    },
    {
        title: '数量',
        dataIndex: 'dealCount',
        key: 'dealCount',
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        render: (text) => moment(text).format('HH:mm:ss')
    }
])


class index extends Component {
    state = {
        symbols: '',
        leftTop: [],
        leftDown: [],
        rightTop: [],
        rightDown: [],
        optSelect: [],
        defaultValue: '',
        accuracy: '',
        lotSize: '',
        orderbookData: {
            state: true,
            type: 'orderbook',
            object: {
                sym: "BTC_USDT",
                a: [["8000", "2"], ["6000", "9"]],
                b: [["7000", "2"]],
            }
        },
        tradeData: {
            state: true,
            type: 'trade',
            object: {
                executeId: "4fb8f1ef-1915-49c5-86d9-345189051d17",
                dealCount: 1,
                dealPrice: 7000,
                time: 1587109050121,
            }
        }
    }

    orderbookData = [{
        state: true,
        type: 'orderbook',
        object: {
            sym: "BTC_USDT",
            a: [["8000", "2"], ["6000", "9"], ["5000", "9"]],
            b: [["7000", "2"], ["2000", "3"]],
        }
    },];
    tradeData = [{
        state: true,
        type: 'trade',
        object: {
            executeId: "4fb8f1ef-1915-49c5-86d9-345189051d17",
            dealCount: 1,
            dealPrice: 8000,
            time: 1587109050133,
        }
    }];

    allLeftTopData = [];
    allLeftDownData = [];

    componentDidMount() {
        const url = window.location.hash.split('/')
        console.log(url[url.length - 1])
        this.sym = url[url.length - 1];
        const symbol = url[url.length - 1].split('_');
        const symbols = `${symbol[0]}/${symbol[1]}`
        this.setState({
            symbols,
        })
        this.initSocket(this.state.orderbookData);
        this.initSocket(this.state.tradeData);
        this.getExchangeSymbols()
    }

    getExchangeSymbols = () => {
        const obj = [{ sym: 'VET_USDT', accuracy: 4, lotSize: 0.2 }, { sym: 'VET_BTC', accuracy: 4, lotSize: 0.3 }, { sym: 'VET_ETH', accuracy: 4, lotSize: 0.1 }]; // lotSize是数量的最小值，accuracy是价格后面小数点最多的位数
        getSymbols().then((data) => {
            const url = window.location.hash.split('/');
            const defaultValue = url[url.length - 1];
            const defaultObj = _.filter(data.obj, item => item.sym === defaultValue);
            if (data.code === 1200) {
                this.setState({
                    optSelect: data.obj,
                    defaultValue,
                    lotSize: defaultObj.lotSize,
                    accuracy: defaultObj.accuracy,
                })
            }
        })
    }

    initSocket = (received_msg) => {
        const self = this;
        if (received_msg.type === 'trade') {
            this.tradeData = _.concat(this.tradeData, received_msg);
        } else {
            this.orderbookData = _.concat(this.orderbookData, received_msg);
        }
        this.delData();
        // if ("WebSocket" in window) {
        //     //    alert("您的浏览器支持 WebSocket!");     
        //     // 打开一个 web socket
        //     this.ws = new WebSocket("ws://172.16.11.196:9305/websocket/client123");
        //     this.ws.onopen = function () {
        //         self.onWebsocket(this.sym);
        //     };

        //     this.ws.onmessage = function (evt) {
        //         console.log(evt);
        //         const received_msg = JSON.parse(evt.data);
        //         // console.log('object', JSON.parse(received_msg));
        //         // if (received_msg.type === 'trade') {
        //         //     this.tradeData = _.concat(this.tradeData, received_msg);
        //         // } else {
        //         //     this.orderData = _.concat(this.orderData, received_msg);
        //         // }
        //         // self.delData(received_msg);
        //         //   alert("数据已接收...");
        //     };

        //     this.ws.onclose = function () {
        //         // 关闭 websocket
        //         alert("连接已关闭...");
        //     };
        // }

        // else {
        //     // 浏览器不支持 WebSocket
        //     alert("您的浏览器不支持 WebSocket!");
        // }
    }

    onWebsocket = (sym) => {
        const orderbookObj = {
            account: 'client123',
            event: 'subscribe',
            tag: 'orderbook',
            sym
        }
        const tradeObj = {
            account: 'client123',
            event: 'subscribe',
            tag: 'trade',
            sym
        }
        this.ws.send(JSON.stringify(orderbookObj));
        // this.ws.send(JSON.stringify(tradeObj));
    }

    delData = () => {
        console.log('===', this.orderbookData, this.tradeData);
        const orderbookData = this.orderbookData;
        _.map(orderbookData, (item) => {
            const leftTop = item.object.a;
            const leftDown = item.object.b;
            this.allLeftTopData = _.orderBy(_.concat(leftTop, this.allLeftTopData), (item) => item[0], ['desc']);
            this.allLeftDownData = _.sortBy(_.concat(leftDown, this.allLeftDownData), item => item[0]);
        });
        const rightDown = _.map(this.tradeData, (item, index) => ({ ...item.object, type: 'trade', id: index }))
        const leftTop = _.map(this.allLeftTopData, (item, index) => {
            return {
                price: item[0],
                count: item[1],
                id: index,
            }
        });
        const leftDown = _.map(this.allLeftDownData, (item, index) => {
            return {
                price: item[0],
                count: item[1],
                id: index,
            }
        })
        // const rightDown = _.map(this.allRightData)
        this.setState({
            leftTop,
            leftDown,
            rightDown,
        })
        console.log(this.tradeData);
        // console.log(orderbookData)

    }

    handleChangeSym = (value) => {
        // console.log(value);
        // this.onWebsocket(value);
        const optSelect = this.state.optSelect;
        const defaultObj = _.filter(optSelect, item => item.sym === value);
        this.setState({
            defaultValue: value,
            lotSize: defaultObj.lotSize,
            accuracy: defaultObj.accuracy,
        })
    }

    render() {
        console.log(this.state.defaultValue);
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="main-page">
                <div className="list-title">
                    {/* <Button onClick={this.onWebsocket}>订阅</Button> */}
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
                                    scroll={{ y: 500 }}
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
                                    scroll={{ y: 500 }}
                                />

                            </div>
                        </Col>
                        <Col span={12} >
                            <Row className="f_select">
                                <Col span={12}>
                                    <Select defaultValue={this.state.defaultValue} value={this.state.defaultValue} style={{ width: '70%' }} onChange={this.handleChangeSym}>
                                        {
                                            _.map(this.state.optSelect || [], (item) => (<Option key={`${item.sym}`} value={`${item.sym}`}>{item.sym}</Option>))
                                        }
                                    </Select>

                                </Col>
                                    <Col span={12}>最新价格：{this.state.rightDown && this.state.rightDown[0]? this.state.rightDown[0].dealPrice : ''}</Col>
                            </Row>
                            <div className="f_Box">
                                <div className="f_center">
                                    <Form labelcol={{ span: 8 }} wrappercol={{ span: 16 }} onSubmit={this.handleSubmit}>
                                        <h3>买入 {this.state.defaultValue ? this.state.defaultValue.split('_')[0] : ''} </h3>
                                        <Form.Item label="价格" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {getFieldDecorator('note', {
                                                rules: [{ required: true, message: '请输入价格！' }],
                                            })(<Input type="number"/>)}
                                        </Form.Item>
                                        <Form.Item label="数量" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {getFieldDecorator('gender', {
                                                rules: [{ required: true, message: '请输入数量！' }],
                                            })(<Input  type="number"/>)}
                                        </Form.Item>
                                        <Form.Item label="成交额" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {getFieldDecorator('e', {
                                                rules: [{ required: true, message: 'Please select your gender!' }],
                                            })(<Input disabled />)}
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ span: 12, offset: 8 }} style={{ marginTop: 25 }}>
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                        </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div className="f_center">
                                    <Form onSubmit={this.handleSubmit}>
                                        <h3>买出 {this.state.defaultValue ? this.state.defaultValue.split('_')[0] : ''} </h3>
                                        <Form.Item label="价格" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {getFieldDecorator('note1', {
                                                rules: [
                                                    { required: true, message: '请输入价格！' },
                                                    
                                                ],
                                            })(<Input  type="number"/>)}
                                        </Form.Item>
                                        <Form.Item label="数量" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {getFieldDecorator('gender1', {
                                                rules: [{ required: true, message: '请输入数量！' }],
                                            })(<Input  type="number"/>)}
                                        </Form.Item>
                                        <Form.Item label="成交额" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {getFieldDecorator('e1', {
                                                rules: [{ required: true, message: 'Please select your gender!' }],
                                            })(<Input disabled />)}
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ span: 12, offset: 8 }} style={{ marginTop: 25 }}>
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
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
                            {/* <div className="table-top">
                                <Table
                                    size="small"
                                    pagination={false}
                                    rowKey="id"
                                    dataSource={this.state.rightTop}
                                    columns={columnsRight(this)}
                                    scroll={{ y: 300 }}
                                />
                            </div> */}

                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Form.create()(index);

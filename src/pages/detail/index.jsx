import React, { Component } from 'react'
import { Row, Col, Table, Form, Input, Button, Select, message } from 'antd'
import { getSymbols, BuyOrder, SellOrder } from '../../api/detail'
import _ from 'lodash'
import moment from 'moment';
import BigNumber from 'bignumber.js';

const Option = Select.Option;

const columns = (app) => ([
    {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        className: 'price',
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
            if (!record.price) return '';
            const price = record.price - 0;
            const count = record.count - 0;
            return new BigNumber(price).multipliedBy(count).decimalPlaces(6, 1).toString();
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
        accuracy: 0,
        lotSize: 0,
        sym: '',
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

    orderbookData = [
        //     {
        //     state: true,
        //     type: 'orderbook',
        //     object: {
        //         sym: "BTC_USDT",
        //         a: [["8000", "2"], ["6000", "9"], ["5000", "9"]],
        //         b: [["7000", "2"], ["2000", "3"]],
        //     }
        // },
    ];
    tradeData = [
        //     {
        //     state: true,
        //     type: 'trade',
        //     object: {
        //         executeId: "4fb8f1ef-1915-49c5-86d9-345189051d17",
        //         dealCount: 1,
        //         dealPrice: 8000,
        //         time: 1587109050133,
        //     }
        // }
    ];

    allLeftTopData = [];
    allLeftDownData = [];
    allRightDown = [];
    ws = null;
    timer = {
        interval: 5000,
        handler: null,
    }

    componentDidMount() {

        this.getExchangeSymbols()

        // this.initSocket(this.state.orderbookData);
        // this.initSocket(this.state.tradeData);
    }

    componentWillMount() {
        if (this.timer) {
            clearInterval(this.timer.handler);
            this.timer.handler = null;
        }
    }

    getExchangeSymbols = () => {
        const data = {
            code: 1200,
            obj: [{ sym: 'BTC_USDT', accuracy: 4, lotSize: 0.2 }, { sym: 'VET_BTC', accuracy: 4, lotSize: 0.3 }, { sym: 'VET_ETH', accuracy: 4, lotSize: 0.1 }] // lotSize是数量的最小值，accuracy是价格后面小数点最多的位数
        }
        getSymbols().then((data) => {
            // const url = window.location.hash.split('/');
            // const defaultValue = url[url.length - 1];
            const defaultObj = data.obj[0];
            const symbol = defaultObj.sym.split('_');
            const symbols = `${symbol[0]}/${symbol[1]}`
            if (data.code === 1200) {
                this.setState({
                    symbols,
                    sym: defaultObj.sym,
                    optSelect: data.obj,
                    defaultValue: defaultObj.sym,
                    lotSize: defaultObj.lotSize,
                    accuracy: defaultObj.accuracy,
                }, () => {
                    this.initSocket();
                    this.loopSend();
                })
            }
        })
    }

    loopSend = () => {
        const self = this;
        this.timer.handler = setInterval(() => {
            if (self.ws) {
                this.ws.send('ping');
            }
        }, this.timer.interval)
    }

    initSocket = () => {
        const self = this;
        // if (received_msg.type === 'trade') {
        //     this.tradeData = _.concat(this.tradeData, received_msg);
        // } else {
        //     this.orderbookData = _.concat(this.orderbookData, received_msg);
        // }
        // this.delData();
        if ("WebSocket" in window) {
            //    alert("您的浏览器支持 WebSocket!");     
            // 打开一个 web socket
            let url = `52.221.122.70`;
            // let url = 'http://172.16.11.196';
            if (process.env.NODE_ENV === 'production') {
                url = `${window.location.hostname}`;
            }
            let userNameObj = localStorage.getItem('layui');
            let userName = ''
            if (userNameObj) {
                // message.error(userNameObj.token);
                const token = JSON.parse(userNameObj).token;
                userName = JSON.parse(token).userName;
                this.account = userName;
            }
            if (!userName) {
                message.error('用户未登录！请重新登录');
                // window.location.href = '/login';
            }
            this.ws = new WebSocket(`ws://${url}:9305/websocket/${userName}`);
            this.ws.onopen = function () {
                self.onWebsocket(self.state.sym);
            };

            this.ws.onmessage = function (evt) {
                // console.log(evt);
                try {
                    const received_msg = JSON.parse(evt.data);
                    // console.log('object', JSON.parse(received_msg));
                    if (received_msg.object.sym === self.state.sym && received_msg.type === 'orderbook') {
                        self.delOrderData(received_msg);
                    }
                    if (received_msg.type === 'trade') {
                        self.delTradeData(received_msg);
                    }
                } catch (error) {
                    
                }
               

                //   alert("数据已接收...");
            };

            this.ws.onclose = () => {
               
            };
        }

        else {
            // 浏览器不支持 WebSocket
            message.error("您的浏览器不支持 WebSocket!");
        }
    }

    onWebsocket = (sym) => {
        const orderbookObj = {
            account: this.account,
            event: 'subscribe',
            tag: 'orderbook',
            sym
        }
        const tradeObj = {
            account: this.account,
            event: 'subscribe',
            tag: 'trade',
            sym
        }
        this.ws.send(JSON.stringify(orderbookObj));
        this.ws.send(JSON.stringify(tradeObj));
    }

    delTradeData = (received_msg) => {
        this.tradeData = received_msg;

        if (this.tradeData.object && _.isObject(this.tradeData.object)) {
            this.allRightDown.unshift(this.tradeData.object)
            // rightDown = [this.tradeData.object];
            // rightDown[0].type = 'trade';
            // rightDown[0].id = '88';
            this.allRightDown = _.map(this.allRightDown, (item, index) => ({ ...item, id: index, type: 'trade' }))
        }
        this.setState({
            rightDown: this.allRightDown || [],
        })
    }

    delOrderData = (received_msg) => {
        // console.log('===', this.orderbookData, this.tradeData);
        // let rightDown = [];
        let leftTop = [];
        let leftDown = [];
        this.orderbookData = received_msg;
        const orderbookData = this.orderbookData;
        let leftTopA = orderbookData.object.a;
        let leftDownB = orderbookData.object.b;
        // if (_.isEmpty(leftDownB) && _.isEmpty(leftTopA)) {
        //     if (this.flag) {
        //         this.oldTime = +new Date();
        //         this.flag = false;
        //         this.flagA = true;
        //         this.flagB = true;
        //     }
        //     const timeDiff = +new Date() - this.oldTime;
        //     // console.log('timeDiff', timeDiff, this.oldTime, +new Date());
        //     if (timeDiff > 3000) {
        //         leftTopA = orderbookData.object.a;
        //         leftDownB = orderbookData.object.b;
        //         this.flag = true;
        //         //  console.log('object', leftTopA, leftDownB);
        //         //  console.log('timeDiff', timeDiff);
        //     } else {
        //         return;
        //     }
        // };
        // if (!_.isEmpty(leftTopA) && !_.isEmpty(leftDownB)) {
        //     // this.flag = true;
        //     this.flagA = true;
        //     this.flagB = true;
        // }
        // console.log('object------', _.isEmpty([]))
        // console.log('=======', 'a:', leftTopA, 'b:', leftDownB)
        if (!_.isEmpty(leftTopA)) {
            // this.flagA = true;
            this.oldTimeA = +new Date();
            leftTopA = _.orderBy(leftTopA, (item) => item[0] || '', ['desc']);
            leftTop = _.map(leftTopA, (item, index) => {
                return {
                    price: item[0] || '',
                    count: item[1] || '',
                    id: index + 11,
                }
            });
            if (leftTop.length < 10) {
                let len = 10 - leftTop.length;
                // console.log('len', len)
                while (len) {
                    leftTop.unshift({ id: len })
                    len--;
                }
            }
            // const rightDown = _.map(this.allRightData)
            this.setState({
                leftTop,
            })
        } else {
            const timeDiffA = +new Date() - this.oldTimeA;
            if (timeDiffA > 3000) {
                console.log('timeDiffA=====', timeDiffA, this.oldTimeA, +new Date())
                leftTopA = orderbookData.object.a;
                leftTopA = _.orderBy(leftTopA, (item) => item[0] || '', ['desc']);
                leftTop = _.map(leftTopA, (item, index) => {
                    return {
                        price: item[0] || '',
                        count: item[1] || '',
                        id: index + 11,
                    }
                });
                if (leftTop.length < 10) {
                    let len = 10 - leftTop.length;
                    // console.log('len', len)
                    while (len) {
                        leftTop.unshift({ id: len })
                        len--;
                    }
                }
                // const rightDown = _.map(this.allRightData)
                this.setState({
                    leftTop,
                })
            }
        }
        if (!_.isEmpty(leftDownB)) {
            // this.flagB = true;
            this.oldTimeB = +new Date();
            leftDownB = _.orderBy(leftDownB, item => item[0] || '', ['desc']);
            leftDown = _.map(leftDownB, (item, index) => {
                return {
                    price: item[0] || '',
                    count: item[1] || '',
                    id: index + 11,
                }
            })
            if (leftDown.length < 10) {
                let len = 10 - leftDown.length;
                // console.log('len', len)
                while (len) {
                    leftDown.push({ id: len })
                    len--;
                }
            }
            this.setState({
                leftDown,
            })
        } else {
            const timeDiffB = +new Date() - this.oldTimeB;
            if (timeDiffB > 3000) {
                leftDownB = orderbookData.object.b;
                // this.flagB = true;
                leftDownB = _.orderBy(leftDownB, item => item[0] || '', ['desc']);
                leftDown = _.map(leftDownB, (item, index) => {
                    return {
                        price: item[0] || '',
                        count: item[1] || '',
                        id: index + 11,
                    }
                })
                if (leftDown.length < 10) {
                    let len = 10 - leftDown.length;
                    // console.log('len', len)
                    while (len) {
                        leftDown.push({ id: len })
                        len--;
                    }
                }
                this.setState({
                    leftDown,
                })
            }
        }

        // if (_.isEmpty(leftTopA)) {
        //     if (this.flagA) {

        //         this.flagA = false;
        //         // this.flagB = true;
        //     }

        // }
        // if (_.isEmpty(leftDownB)) {
        //     if (this.flagB) {
        //         this.oldTimeB = +new Date();
        //         this.flagB = false;
        //         // this.flagA = true;
        //     }

        // }


        // console.log(this.tradeData);
        // console.log(orderbookData)

    }

    handleChangeSym = (value) => {
        // console.log(value);
        const symbol = value.split('_');
        const symbols = `${symbol[0]}/${symbol[1]}`
        const optSelect = this.state.optSelect;
        const defaultObj = _.filter(optSelect, item => item.sym === value);
        const oldSym = this.state.sym;
        this.setState({
            defaultValue: value,
            lotSize: defaultObj.lotSize,
            accuracy: defaultObj.accuracy,
            symbols,
            sym: value,
        }, () => {
            this.allRightDown = [];
            this.ws.send(JSON.stringify({
                account: this.account,
                event: 'unsubscribe',
                tag: 'orderbook',
                sym: oldSym,
            }));
            this.onWebsocket(this.state.sym);
        })
    }
    handleBuyPrice = (rule, value, callback) => {
        // console.log(rule);
        const { form } = this.props;
        const gender = form.getFieldValue('amount');
        const len = 4;
        const reg = new RegExp("^\\d+(?:\\.\\d{1," + len + "})?$");
        // console.log('gender===============', gender)
        if (reg.test(value)) {
            if (gender) {
                const count = (gender - 0) * (value - 0);
                form.setFieldsValue({
                    e: count,
                })
            } else {
                form.setFieldsValue({
                    e: value,
                })
            }
            callback();
        } else {
            callback(`小数点后最多${len}`)
        }
        if (!value && !gender) {
            form.setFieldsValue({
                e: '',
            })
        }

    }

    handleBuyGender = (rule, value, callback) => {
        const { form } = this.props;
        const note = form.getFieldValue('price');
        const len = 0.2;
        // const reg = new RegExp("^\\d+(?:\\.\\d{1,"+len+"})?$");
        // console.log('gender===============', gender)
        if (value > 0.2) {
            if (note) {
                const count = (note - 0) * (value - 0);
                form.setFieldsValue({
                    e: count,
                })
            } else {
                form.setFieldsValue({
                    e: value,
                })
            }
            callback();
        } else {
            callback(`数量必须大于${len}`)
        }
        if (!value && !note) {
            form.setFieldsValue({
                e: '',
            })
        }

    }

    handleSellPrice = (rule, value, callback) => {
        // console.log(rule);
        const { form } = this.props;
        const gender = form.getFieldValue('amount1');
        const len = 4;
        const reg = new RegExp("^\\d+(?:\\.\\d{1," + len + "})?$");
        // console.log('gender===============', gender)
        if (reg.test(value)) {
            if (gender) {
                const count = (gender - 0) * (value - 0);
                form.setFieldsValue({
                    e1: count,
                })
            } else {
                form.setFieldsValue({
                    e1: value,
                })
            }
            callback();
        } else {
            callback(`小数点后最多${len}`)
        }
        if (!value && !gender) {
            form.setFieldsValue({
                e1: '',
            })
        }

    }

    handleSellGender = (rule, value, callback) => {
        const { form } = this.props;
        const note = form.getFieldValue('price1');
        const len = 0.2;
        // const reg = new RegExp("^\\d+(?:\\.\\d{1,"+len+"})?$");
        // console.log('gender===============', gender)
        if (value > 0.2) {
            if (note) {
                const count = (note - 0) * (value - 0);
                form.setFieldsValue({
                    e1: count,
                })
            } else {
                form.setFieldsValue({
                    e1: value,
                })
            }
            callback();
        } else {
            callback(`数量必须大于${len}`)
        }
        if (!value && !note) {
            form.setFieldsValue({
                e1: '',
            })
        }
    }

    handleBuySubmit = (e) => {
        e.preventDefault();
        const self = this;
        const { form: { validateFieldsAndScroll } } = self.props;
        validateFieldsAndScroll(['price', 'amount', 'e'], (err, values) => {
            if (!err) {
                const data = values;
                data.symbol = this.state.sym;
                BuyOrder(data).then((res) => {
                    if (res.code === 1200) {
                        message.success(res.msg);
                    } else {
                        message.error(res.msg);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        })
    }

    handleSellSubmit = (e) => {
        e.preventDefault();
        const self = this;
        const { form: { validateFieldsAndScroll } } = self.props;
        validateFieldsAndScroll(['price1', 'amount1', 'e1'], (err, values) => {
            if (!err) {
                const data = values;
                data.symbol = this.state.sym;
                SellOrder(data).then((res) => {
                    if (res.code === 1200) {
                        message.success(res.msg);
                    } else {
                        message.error(res.msg);
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        })
    }

    render() {
        // console.log(this.state.defaultValue);
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="main-page">
                <div className="list-title">
                    {/* <Button onClick={this.onWebsocket}>订阅</Button> */}
                    <Row gutter={24}>
                        <Col span={6}>
                            <p>{this.state.symbols}</p>
                            <div className="table-top">
                                <Table
                                    size="small"
                                    pagination={false}
                                    rowKey="id"
                                    className="sell"
                                    dataSource={this.state.leftTop}
                                    columns={columns(this)}
                                    scroll={{ y: 263 }}
                                />
                            </div>
                            <div>
                                <Table
                                    showHeader={false}
                                    size="small"
                                    pagination={false}
                                    rowKey="id"
                                    className="buy"
                                    dataSource={this.state.leftDown}
                                    columns={columns(this)}
                                    scroll={{ y: 263 }}
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
                                <Col span={12}>最新价格：{this.state.rightDown && this.state.rightDown[0] ? this.state.rightDown[0].dealPrice : ''}</Col>
                            </Row>
                            <div className="f_Box">
                                <div className="f_center">
                                    <Form labelcol={{ span: 8 }} wrappercol={{ span: 16 }} onSubmit={this.handleBuySubmit}>
                                        <h3>买入 {this.state.defaultValue ? this.state.defaultValue.split('_')[0] : ''} </h3>
                                        <Form.Item label="价格" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {getFieldDecorator('price', {
                                                rules: [
                                                    { required: true, message: '请输入价格！' },
                                                    { validator: this.handleBuyPrice }
                                                ],
                                            })(<Input type="number" />)}
                                        </Form.Item>
                                        <Form.Item label="数量" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {getFieldDecorator('amount', {
                                                rules: [
                                                    { required: true, message: '请输入数量！' },
                                                    { validator: this.handleBuyGender }
                                                ],
                                            })(<Input type="number" />)}
                                        </Form.Item>
                                        <Form.Item label="成交额" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {getFieldDecorator('e', {
                                                rules: [{ required: true, message: 'Please select your gender!' }],
                                            })(<Input disabled />)}
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ span: 12, offset: 8 }} style={{ marginTop: 25 }}>
                                            <Button type="primary" htmlType="submit">
                                                卖出
                                        </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                                <div className="f_center">
                                    <Form onSubmit={this.handleSellSubmit}>
                                        <h3>卖出 {this.state.defaultValue ? this.state.defaultValue.split('_')[0] : ''} </h3>
                                        <Form.Item label="价格" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {getFieldDecorator('price1', {
                                                rules: [
                                                    { required: true, message: '请输入价格！' },
                                                    { validator: this.handleSellPrice }

                                                ],
                                            })(<Input type="number" />)}
                                        </Form.Item>
                                        <Form.Item label="数量" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {getFieldDecorator('amount1', {
                                                rules: [
                                                    { required: true, message: '请输入数量！' },
                                                    { validator: this.handleSellGender }
                                                ],
                                            })(<Input type="number" />)}
                                        </Form.Item>
                                        <Form.Item label="成交额" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                                            {getFieldDecorator('e1', {
                                                rules: [{ required: true, message: 'Please select your gender!' }],
                                            })(<Input disabled />)}
                                        </Form.Item>
                                        <Form.Item wrapperCol={{ span: 12, offset: 8 }} style={{ marginTop: 25 }}>
                                            <Button type="primary" htmlType="submit">
                                                买入
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}>
                            <h4>最新成交</h4>
                            <div className="right_table">
                                <Table
                                    showHeader={false}
                                    size="small"
                                    pagination={false}
                                    rowKey="id"
                                    dataSource={this.state.rightDown}
                                    columns={columnsRightDown(this)}
                                // scroll={{ y: 263 }}
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

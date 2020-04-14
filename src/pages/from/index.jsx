import React, { Component } from 'react'
import { Form, DatePicker, Input, Button, Row, Col, Breadcrumb, message } from 'antd';
import { Download, Execute, DownloadStatus, ExecuteStatus } from '../../api/from';
import _ from 'lodash';

class indexPage extends Component {
    state = {
        percent: 0,
        fileName: [],
        message: '',
        execMessage: '',
        execBtn: false,
        downloadBtn: false,
    }

    timer = {
        handler: null,
        interval: 3000,
    }
    timerExec = {
        handler: null,
        interval: 3000,
    }
    // loading = false;

    componentDidMount() {
        // const self = this;
        // if (this.timer.handler) {
        //     clearInterval(this.timer.handler)
        //     this.timer.handler = null
        // }

        // this.timer.handler = setInterval(() => {
        //     self.downloadStatus();
        // }, this.timer.interval)
    }

    componentWillUnmount() {
        if (this.timer.handler) {
            clearInterval(this.timer.handler)
            this.timer.handler = null
        }
        if (this.timerExec.handler) {
            clearInterval(this.timerExec.handler)
            this.timerExec.handler = null
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ downloadBtn: true });
        this.props.form.validateFields(['date', 'group', 'exchange', 'sym'], (err, fieldsValue) => {
            if (err) {
                return;
            }
            // Should format date value before submit.
            const values = {
                ...fieldsValue,
                'date': fieldsValue['date'].format('YYYY/MM/DD'),
            };
            // const exchangeLen = values.exchange.split('.').length;
            // this.loading = true;
            Download(values).then((data) => {
                if (data.code === 1200) {
                    const self = this;
                    message.success(data.msg);
                    if (this.timer.handler) {
                        clearInterval(this.timer.handler)
                        this.timer.handler = null
                    }

                    this.timer.handler = setInterval(() => {
                        self.downloadStatus(values.group);
                    }, this.timer.interval)

                } else {
                    this.setState({ downloadBtn: false });
                    message.error(data.msg)
                }
            }).catch((error) => {
                this.setState({ downloadBtn: false });
                console.log('error===', error)
            })
        });
    };


    downloadStatus = (group) => {
        DownloadStatus(group).then((data) => {
            let message = ''
            if (data.code === 1200 && data.msg === '下载完成') {     
                // console.log('data====', data)  
                // this.loading = false;
                message = data.msg;
                if (this.timer.handler) {
                    clearInterval(this.timer.handler);
                    this.timer.handler = null;
                }
                this.setState({
                    downloadBtn: false,
                })
            } else if (data.code === 1200 && data.msg === '下载中')  {
                message = data.msg;
            } else {
                if (this.timer.handler) {
                    clearInterval(this.timer.handler);
                    this.timer.handler = null;
                }
                message = '下载异常';
                message.error(data.msg);
                this.setState({ downloadBtn: false });
            }
            this.setState({ message,  fileName: data.obj, })
        }).catch((error) => {
            if (this.timer.handler) {
                clearInterval(this.timer.handler);
                this.timer.handler = null;
            }
            this.setState({ downloadBtn: false });
            // console.log('error===', error)
        })
    }

    handleExecuteSubmit = e => {
        e.preventDefault();
        this.setState({ execBtn: true });
        this.props.form.validateFields(['group', 'sym'], (err, fieldsValue) => {
            if (err) {
                return;
            }
            // Should format date value before submit.
            const values = {
                ...fieldsValue,
                symbol: fieldsValue['sym'],
            };

            Execute(values).then((data) => {
                if (data.code === 1200) {
                    // const self = this;
                    message.success(data.msg);
                    if (this.timerExec.handler) {
                        clearInterval(this.timerExec.handler)
                        this.timer.handler = null
                    }

                    this.timerExec.handler = setInterval(() => {
                        this.executesSub();
                    }, this.timerExec.interval)
                } else {
                    this.setState({ execBtn: false });
                    message.error(data.msg)
                }
            }).catch((error) => {
                this.setState({ execBtn: false });
                console.log('error===', error)
            })


            // console.log('Received values of form: ', values);
        });
    };

    executesSub = () => {
        ExecuteStatus().then((data) => {
            let execMessage = '';
            if (data.code === 1200 && data.msg === '执行完成') {
                if (this.timerExec.handler) {
                    clearInterval(this.timerExec.handler);
                    this.timerExec.handler = null;
                }
                execMessage = data.msg;
                this.setState({ execBtn: false });
            } else if (data.code === 1200 && data.msg === '执行中') {
                execMessage = data.msg;
            } else {
                if (this.timerExec.handler) {
                    clearInterval(this.timerExec.handler);
                    this.timerExec.handler = null;
                }
                execMessage = data.msg;
                message.error(data.msg);
                this.setState({ execBtn: false });
            }
            this.setState({ execMessage })

        }).catch((error) => {
            if (this.timerExec.handler) {
                clearInterval(this.timerExec.handler);
                this.timerExec.handler = null;
            }
            this.setState({ execBtn: false });
            console.log('error===', error)
        })
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
        const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
        };
        return (
            <div style={{ minHeight: 580 }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>&nbsp;</Breadcrumb.Item>
                </Breadcrumb>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="组名">
                        <Row gutter={8}>
                            <Col span={6}>
                                {getFieldDecorator('group', {
                                    rules: [{ required: true, message: 'Please input the group you got!' }],
                                })(<Input />)}
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item label="日期">
                        {getFieldDecorator('date', config)(<DatePicker />)}
                    </Form.Item>

                    <Form.Item label="交易所">
                        <Row gutter={8}>
                            <Col span={6}>
                                {getFieldDecorator('exchange', {
                                    rules: [{ required: true, message: 'Please input the exchange you got!' }],
                                })(<Input placeholder="例如 HUOBI,BINANCE" />)}
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item label="货币对">
                        <Row gutter={8}>
                            <Col span={6}>
                                {getFieldDecorator('sym', {
                                    rules: [{ required: true, message: 'Please input the sym you got!' }],
                                })(<Input />)}
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginRight: 10 }}
                            disabled={this.state.downloadBtn}
                        >
                            下载
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.handleExecuteSubmit}
                            disabled={this.state.execBtn}
                        >
                            执行
                        </Button>
                        <Button type="primary" style={{ marginLeft: 100 }}>
                            <a href="/#/download13">历史记录</a>
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ marginBottom: 15 }}>
                    <Row gutter={8}>
                        <Col span={7}></Col>
                        <Col span={3}>
                            下载进度为： <span className={`${this.state.message !== '下载完成' ? 'unfinish' : 'finish'}`}>{this.state.message}</span>
                        </Col>
                        <Col span={6}>
                            执行进度为：<span className={`${this.state.execMessage === '执行完成' ? 'finish' : 'unfinish'}`}> {this.state.execMessage}</span>
                        </Col>
                    </Row>
                </div>
                <div>

                    {/* <Form {...formItemLayout} > */}


                    <Row gutter={8}>
                        <Col span={7}></Col>
                        <Col span={6}>
                            <p>当前下载文件为：</p>
                            {
                                _.map(this.state.fileName || [], (item, index) => {
                                    return (
                                        <p key={index}>{item}</p>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                    {/* <Form.Item label="组名">
                        <Row gutter={8}>
                            <Col span={6}>
                                {getFieldDecorator('group_1', {
                                    rules: [{ required: true, message: 'Please input the group you got!' }],
                                })(<Input />)}
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item label="货币对">
                        <Row gutter={8}>
                            <Col span={6}>
                                {getFieldDecorator('symbol', {
                                    rules: [{ required: true, message: 'Please input the sym you got!' }],
                                })(<Input />)}
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item label="bps">
                        <Row gutter={8}>
                            <Col span={6}>
                                {getFieldDecorator('bps', {
                                    rules: [{ required: true, message: 'Please input the bps you got!' }],
                                })(<Input placeholder="整数逗号分开" />)}
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item label="btc">
                        <Row gutter={8}>
                            <Col span={6}>
                                {getFieldDecorator('btc', {
                                    rules: [{ required: true, message: 'Please input the btc you got!' }],
                                })(<Input placeholder="数字类型逗号分开" />)}
                            </Col>
                        </Row>
                    </Form.Item> */}

                    {/* </Form> */}
                </div>
            </div>
        );
    }
}

export default Form.create()(indexPage);

import React, { Component } from 'react'
import { Breadcrumb, Form, Row, Col, Button, Input, Select } from 'antd';
import Charts from '../../components/Charts';
import _ from 'lodash';
import moment from 'moment';
import { getChartData } from '../../api/home'

const { Option } = Select;

class indexPage extends Component {
  constructor() {
    super();
    this.state = {
      askData: {},
      bidData: {},
    };
    this.mounted = false;
    this.timer = {
      handler: '',
      interval: '5000',
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.getData();
    const self = this;
    // clearInterval(self.timer.handler);
    // self.timer.handler = setInterval(() => {
    //   self.getData();
    // }, self.timer.interval);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (!_.isEqual(nextProps, this.props)
  //     || !_.isEqual(nextState, this.state)) {
  //     console.log('shouldComponentUpdate: 数据变化');
  //     return true;
  //   }
  //   return false;
  // }

  componentWillUnmount() {
    const self = this;
    self.mounted = false;
    if (self.timer.handler) {
      clearInterval(self.timer.handler);
      self.timer.handler = null;
    }
  }

  getRes = () => {
    return (
      {
        "code": 1200,
        "msg": "请求成功",
        "obj": {
            "BITSTAMP": [
                {
                    "time001": "2020-02-27 08:00:00",
                    "bid": "0.00",
                    "ask": "3.20"
                },
                {
                    "time001": "2020-02-27 08:01:00",
                    "bid": "0.00",
                    "ask": "3.01"
                },
                {
                    "time001": "2020-02-27 08:02:00",
                    "bid": "0.00",
                    "ask": "1.81"
                },
                {
                    "time001": "2020-02-27 08:03:00",
                    "bid": "0.00",
                    "ask": "6.90"
                },
                {
                    "time001": "2020-02-27 08:04:00",
                    "bid": "0.13",
                    "ask": "3.61"
                },
                {
                    "time001": "2020-02-27 08:05:00",
                    "bid": "0.67",
                    "ask": "2.54"
                },
                {
                    "time001": "2020-02-27 08:06:00",
                    "bid": "0.24",
                    "ask": "0.88"
                },
                {
                    "time001": "2020-02-27 08:07:00",
                    "bid": "0.03",
                    "ask": "1.59"
                },
                {
                    "time001": "2020-02-27 08:08:00",
                    "bid": "0.04",
                    "ask": "0.48"
                },
                {
                    "time001": "2020-02-27 08:09:00",
                    "bid": "0.07",
                    "ask": "0.26"
                },
                {
                    "time001": "2020-02-27 08:10:00",
                    "bid": "0.02",
                    "ask": "1.26"
                },
                {
                    "time001": "2020-02-27 08:11:00",
                    "bid": "0.33",
                    "ask": "1.06"
                },
                {
                    "time001": "2020-02-27 08:12:00",
                    "bid": "0.06",
                    "ask": "1.04"
                },
                {
                    "time001": "2020-02-27 08:13:00",
                    "bid": "0.01",
                    "ask": "0.00"
                },
                {
                    "time001": "2020-02-27 08:14:00",
                    "bid": "0.12",
                    "ask": "0.09"
                },
                {
                    "time001": "2020-02-27 08:15:00",
                    "bid": "0.40",
                    "ask": "0.34"
                },
                {
                    "time001": "2020-02-27 08:16:00",
                    "bid": "0.73",
                    "ask": "0.93"
                },
                {
                    "time001": "2020-02-27 08:17:00",
                    "bid": "0.30",
                    "ask": "0.23"
                },
                {
                    "time001": "2020-02-27 08:18:00",
                    "bid": "0.17",
                    "ask": "0.28"
                },
                {
                    "time001": "2020-02-27 08:19:00",
                    "bid": "0.07",
                    "ask": "4.01"
                },
                {
                    "time001": "2020-02-27 08:20:00",
                    "bid": "6.43",
                    "ask": "0.06"
                },
                {
                    "time001": "2020-02-27 08:21:00",
                    "bid": "3.06",
                    "ask": "1.45"
                },
                {
                    "time001": "2020-02-27 08:22:00",
                    "bid": "3.09",
                    "ask": "3.71"
                },
                {
                    "time001": "2020-02-27 08:23:00",
                    "bid": "0.34",
                    "ask": "7.51"
                },
                {
                    "time001": "2020-02-27 08:24:00",
                    "bid": "1.66",
                    "ask": "11.34"
                },
                {
                    "time001": "2020-02-27 08:25:00",
                    "bid": "3.62",
                    "ask": "2.99"
                },
                {
                    "time001": "2020-02-27 08:26:00",
                    "bid": "1.31",
                    "ask": "1.52"
                },
                {
                    "time001": "2020-02-27 08:27:00",
                    "bid": "0.06",
                    "ask": "6.98"
                },
                {
                    "time001": "2020-02-27 08:28:00",
                    "bid": "0.01",
                    "ask": "1.86"
                },
                {
                    "time001": "2020-02-27 08:29:00",
                    "bid": "0.24",
                    "ask": "1.10"
                },
                {
                    "time001": "2020-02-27 08:30:00",
                    "bid": "3.63",
                    "ask": "0.47"
                },
                {
                    "time001": "2020-02-27 08:31:00",
                    "bid": "1.50",
                    "ask": "2.08"
                },
                {
                    "time001": "2020-02-27 08:32:00",
                    "bid": "0.47",
                    "ask": "1.52"
                }
            ],
            "BAN": [
                {
                    "time001": "2020-02-27 08:00:00",
                    "bid": "0.00",
                    "ask": "3.20"
                },
                {
                    "time001": "2020-02-27 08:01:00",
                    "bid": "0.00",
                    "ask": "3.01"
                },
                {
                    "time001": "2020-02-27 08:02:00",
                    "bid": "0.00",
                    "ask": "1.81"
                },
                {
                    "time001": "2020-02-27 08:03:00",
                    "bid": "0.00",
                    "ask": "6.90"
                },
                {
                    "time001": "2020-02-27 08:04:00",
                    "bid": "0.13",
                    "ask": "3.61"
                },
                {
                    "time001": "2020-02-27 08:05:00",
                    "bid": "0.67",
                    "ask": "2.54"
                },
                {
                    "time001": "2020-02-27 08:06:00",
                    "bid": "0.24",
                    "ask": "0.88"
                },
                {
                    "time001": "2020-02-27 08:07:00",
                    "bid": "0.03",
                    "ask": "1.59"
                },
                {
                    "time001": "2020-02-27 08:08:00",
                    "bid": "0.04",
                    "ask": "0.48"
                },
                {
                    "time001": "2020-02-27 08:09:00",
                    "bid": "0.07",
                    "ask": "0.26"
                },
                {
                    "time001": "2020-02-27 08:10:00",
                    "bid": "0.02",
                    "ask": "1.26"
                },
                {
                    "time001": "2020-02-27 08:11:00",
                    "bid": "0.33",
                    "ask": "1.06"
                },
                {
                    "time001": "2020-02-27 08:12:00",
                    "bid": "0.06",
                    "ask": "1.04"
                },
                {
                    "time001": "2020-02-27 08:13:00",
                    "bid": "0.01",
                    "ask": "0.00"
                },
                {
                    "time001": "2020-02-27 08:14:00",
                    "bid": "0.12",
                    "ask": "0.09"
                },
                {
                    "time001": "2020-02-27 08:15:00",
                    "bid": "0.40",
                    "ask": "0.34"
                },
                {
                    "time001": "2020-02-27 08:16:00",
                    "bid": "0.73",
                    "ask": "0.93"
                },
                {
                    "time001": "2020-02-27 08:17:00",
                    "bid": "0.30",
                    "ask": "0.23"
                },
                {
                    "time001": "2020-02-27 08:18:00",
                    "bid": "0.17",
                    "ask": "0.28"
                },
                {
                    "time001": "2020-02-27 08:19:00",
                    "bid": "0.07",
                    "ask": "4.01"
                },
                {
                    "time001": "2020-02-27 08:20:00",
                    "bid": "6.43",
                    "ask": "0.06"
                },
                {
                    "time001": "2020-02-27 08:21:00",
                    "bid": "3.06",
                    "ask": "1.45"
                },
                {
                    "time001": "2020-02-27 08:22:00",
                    "bid": "3.09",
                    "ask": "3.71"
                },
                {
                    "time001": "2020-02-27 08:23:00",
                    "bid": "0.34",
                    "ask": "7.51"
                },
                {
                    "time001": "2020-02-27 08:24:00",
                    "bid": "1.66",
                    "ask": "11.34"
                },
                {
                    "time001": "2020-02-27 08:25:00",
                    "bid": "3.62",
                    "ask": "2.99"
                },
                {
                    "time001": "2020-02-27 08:26:00",
                    "bid": "1.31",
                    "ask": "1.52"
                },
                {
                    "time001": "2020-02-27 08:27:00",
                    "bid": "0.06",
                    "ask": "6.98"
                },
                {
                    "time001": "2020-02-27 08:28:00",
                    "bid": "0.01",
                    "ask": "1.86"
                },
                {
                    "time001": "2020-02-27 08:29:00",
                    "bid": "0.24",
                    "ask": "1.10"
                },
                {
                    "time001": "2020-02-27 08:30:00",
                    "bid": "3.63",
                    "ask": "0.47"
                },
                {
                    "time001": "2020-02-27 08:31:00",
                    "bid": "1.50",
                    "ask": "2.08"
                },
                {
                    "time001": "2020-02-27 08:32:00",
                    "bid": "0.47",
                    "ask": "1.52"
                }
            ],
            "HUOBI": [
                {
                    "time001": "2020-02-27 08:00:00",
                    "bid": "0.00",
                    "ask": "3.20"
                },
                {
                    "time001": "2020-02-27 08:01:00",
                    "bid": "0.00",
                    "ask": "3.01"
                },
                {
                    "time001": "2020-02-27 08:02:00",
                    "bid": "0.00",
                    "ask": "1.81"
                },
                {
                    "time001": "2020-02-27 08:03:00",
                    "bid": "0.00",
                    "ask": "6.90"
                },
                {
                    "time001": "2020-02-27 08:04:00",
                    "bid": "0.13",
                    "ask": "3.61"
                },
                {
                    "time001": "2020-02-27 08:05:00",
                    "bid": "0.67",
                    "ask": "2.54"
                },
                {
                    "time001": "2020-02-27 08:06:00",
                    "bid": "0.24",
                    "ask": "0.88"
                },
                {
                    "time001": "2020-02-27 08:07:00",
                    "bid": "0.03",
                    "ask": "1.59"
                },
                {
                    "time001": "2020-02-27 08:08:00",
                    "bid": "0.04",
                    "ask": "0.48"
                },
                {
                    "time001": "2020-02-27 08:09:00",
                    "bid": "0.07",
                    "ask": "0.26"
                },
                {
                    "time001": "2020-02-27 08:10:00",
                    "bid": "0.02",
                    "ask": "1.26"
                },
                {
                    "time001": "2020-02-27 08:11:00",
                    "bid": "0.33",
                    "ask": "1.06"
                },
                {
                    "time001": "2020-02-27 08:12:00",
                    "bid": "0.06",
                    "ask": "1.04"
                },
                {
                    "time001": "2020-02-27 08:13:00",
                    "bid": "0.01",
                    "ask": "0.00"
                },
                {
                    "time001": "2020-02-27 08:14:00",
                    "bid": "0.12",
                    "ask": "0.09"
                },
                {
                    "time001": "2020-02-27 08:15:00",
                    "bid": "0.40",
                    "ask": "0.34"
                },
                {
                    "time001": "2020-02-27 08:16:00",
                    "bid": "0.73",
                    "ask": "0.93"
                },
                {
                    "time001": "2020-02-27 08:17:00",
                    "bid": "0.30",
                    "ask": "0.23"
                },
                {
                    "time001": "2020-02-27 08:18:00",
                    "bid": "0.17",
                    "ask": "0.28"
                },
                {
                    "time001": "2020-02-27 08:19:00",
                    "bid": "0.07",
                    "ask": "4.01"
                },
                {
                    "time001": "2020-02-27 08:20:00",
                    "bid": "6.43",
                    "ask": "0.06"
                },
                {
                    "time001": "2020-02-27 08:21:00",
                    "bid": "3.06",
                    "ask": "1.45"
                },
                {
                    "time001": "2020-02-27 08:22:00",
                    "bid": "3.09",
                    "ask": "3.71"
                },
                {
                    "time001": "2020-02-27 08:23:00",
                    "bid": "0.34",
                    "ask": "7.51"
                },
                {
                    "time001": "2020-02-27 08:24:00",
                    "bid": "1.66",
                    "ask": "11.34"
                },
                {
                    "time001": "2020-02-27 08:25:00",
                    "bid": "3.62",
                    "ask": "2.99"
                },
                {
                    "time001": "2020-02-27 08:26:00",
                    "bid": "1.31",
                    "ask": "1.52"
                },
                {
                    "time001": "2020-02-27 08:27:00",
                    "bid": "0.06",
                    "ask": "6.98"
                },
                {
                    "time001": "2020-02-27 08:28:00",
                    "bid": "0.01",
                    "ask": "1.86"
                },
                {
                    "time001": "2020-02-27 08:29:00",
                    "bid": "0.24",
                    "ask": "1.10"
                },
                {
                    "time001": "2020-02-27 08:30:00",
                    "bid": "3.63",
                    "ask": "0.47"
                },
                {
                    "time001": "2020-02-27 08:31:00",
                    "bid": "1.50",
                    "ask": "2.08"
                },
                {
                    "time001": "2020-02-27 08:32:00",
                    "bid": "0.47",
                    "ask": "1.52"
                }
            ],
            "BAIAN": [
                {
                    "time001": "2020-02-27 08:00:00",
                    "bid": "0.00",
                    "ask": "3.20"
                },
                {
                    "time001": "2020-02-27 08:01:00",
                    "bid": "0.00",
                    "ask": "3.01"
                },
                {
                    "time001": "2020-02-27 08:02:00",
                    "bid": "0.00",
                    "ask": "1.81"
                },
                {
                    "time001": "2020-02-27 08:03:00",
                    "bid": "0.00",
                    "ask": "6.90"
                },
                {
                    "time001": "2020-02-27 08:04:00",
                    "bid": "0.13",
                    "ask": "3.61"
                },
                {
                    "time001": "2020-02-27 08:05:00",
                    "bid": "0.67",
                    "ask": "2.54"
                },
                {
                    "time001": "2020-02-27 08:06:00",
                    "bid": "0.24",
                    "ask": "0.88"
                },
                {
                    "time001": "2020-02-27 08:07:00",
                    "bid": "0.03",
                    "ask": "1.59"
                },
                {
                    "time001": "2020-02-27 08:08:00",
                    "bid": "0.04",
                    "ask": "0.48"
                },
                {
                    "time001": "2020-02-27 08:09:00",
                    "bid": "0.07",
                    "ask": "0.26"
                },
                {
                    "time001": "2020-02-27 08:10:00",
                    "bid": "0.02",
                    "ask": "1.26"
                },
                {
                    "time001": "2020-02-27 08:11:00",
                    "bid": "0.33",
                    "ask": "1.06"
                },
                {
                    "time001": "2020-02-27 08:12:00",
                    "bid": "0.06",
                    "ask": "1.04"
                },
                {
                    "time001": "2020-02-27 08:13:00",
                    "bid": "0.01",
                    "ask": "0.00"
                },
                {
                    "time001": "2020-02-27 08:14:00",
                    "bid": "0.12",
                    "ask": "0.09"
                },
                {
                    "time001": "2020-02-27 08:15:00",
                    "bid": "0.40",
                    "ask": "0.34"
                },
                {
                    "time001": "2020-02-27 08:16:00",
                    "bid": "0.73",
                    "ask": "0.93"
                },
                {
                    "time001": "2020-02-27 08:17:00",
                    "bid": "0.30",
                    "ask": "0.23"
                },
                {
                    "time001": "2020-02-27 08:18:00",
                    "bid": "0.17",
                    "ask": "0.28"
                },
                {
                    "time001": "2020-02-27 08:19:00",
                    "bid": "0.07",
                    "ask": "4.01"
                },
                {
                    "time001": "2020-02-27 08:20:00",
                    "bid": "6.43",
                    "ask": "0.06"
                },
                {
                    "time001": "2020-02-27 08:21:00",
                    "bid": "3.06",
                    "ask": "1.45"
                },
                {
                    "time001": "2020-02-27 08:22:00",
                    "bid": "3.09",
                    "ask": "3.71"
                },
                {
                    "time001": "2020-02-27 08:23:00",
                    "bid": "0.34",
                    "ask": "7.51"
                },
                {
                    "time001": "2020-02-27 08:24:00",
                    "bid": "1.66",
                    "ask": "11.34"
                },
                {
                    "time001": "2020-02-27 08:25:00",
                    "bid": "3.62",
                    "ask": "2.99"
                },
                {
                    "time001": "2020-02-27 08:26:00",
                    "bid": "1.31",
                    "ask": "1.52"
                },
                {
                    "time001": "2020-02-27 08:27:00",
                    "bid": "0.06",
                    "ask": "6.98"
                },
                {
                    "time001": "2020-02-27 08:28:00",
                    "bid": "0.01",
                    "ask": "1.86"
                },
                {
                    "time001": "2020-02-27 08:29:00",
                    "bid": "0.24",
                    "ask": "1.10"
                },
                {
                    "time001": "2020-02-27 08:30:00",
                    "bid": "3.63",
                    "ask": "0.47"
                },
                {
                    "time001": "2020-02-27 08:31:00",
                    "bid": "1.50",
                    "ask": "2.08"
                },
                {
                    "time001": "2020-02-27 08:32:00",
                    "bid": "0.47",
                    "ask": "1.52"
                }
            ]
        }
    }
    )
  }

  getData = (values = '') => {
    getChartData(values).then((res) => {
      if (res.code === 1200) {
      // const res  = this.getRes()
        const data = res.obj;
        const obj = {
          // BINANCE: {
          //   bid: [],
          //   ask: [],
          // },
          // composite: {
          //   bid: [],
          //   ask: [],
          // },
          // HUOBI: {
          //   bid: [],
          //   ask: [],
          // },
          // OKEX: {
          //   bid: [],
          //   ask: [],
          // },
        }
        _.map(data, (item, index) => {
          obj[index] = {};
          obj[index]['ask'] = [];
          obj[index]['bid'] = [];
          _.map(item, (it) => {
            const timestamp = it.time001 ? it.time001 : it.createdAt - 0;
            // console.log('obj[`key${index}`]', obj[`key${index}`], index, `key${index}`)
            obj[index].bid.push([
              timestamp,
              _.isNull(it.bid) ? null : it.bid - 0,
            ]);
            obj[index].ask.push([
              timestamp,
              _.isNull(it.ask) ? null : it.ask - 0,
            ]);
          })
        });
        // console.log('obj', obj, data);
        const bidData = {};
        const askData = {};
        _.map(data, (item, key) => {
          bidData[`${key}_bid`] = obj[key].bid;
          askData[`${key}_ask`] = obj[key].ask;
        })
        // console.log('bid ask', bidData, askData)
        if (this.mounted) {
          this.setState({
            bidData,
            askData
          })
        }
      }
    })
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
      this.getData(values);
    });
  };


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
      <React.Fragment>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>&nbsp;</Breadcrumb.Item>
        </Breadcrumb>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Row gutter={8}>
            <Col span={3}>
              <Form.Item label="cType">
                {getFieldDecorator('cType', {
                  initialValue: 'C1',
                  rules: [{ required: true, message: 'Please input the cType you got!' }],
                })(
                  <Select>
                    <Option value="C1">C1</Option>
                    <Option value="C0">C0</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="sType">
                {getFieldDecorator('sType', {
                  initialValue: 'S1',
                  rules: [{ required: true, message: 'Please input the sType you got!' }],
                })(
                  <Select>
                    <Option value="S1">S1</Option>
                    <Option value="S0">S0</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              < Form.Item label="grpType" >
                {getFieldDecorator('grpType', {
                  rules: [{ required: true, message: 'Please input the grpType you got!' }],
                })(<Input placeholder="" />)}
              </Form.Item >
            </Col>
            <Col span={6}>
              < Form.Item label="交易所" >
                {getFieldDecorator('exchange', {
                  rules: [{ required: true, message: 'Please input the exchange you got!' }],
                })(<Input placeholder="HUOBI,composite,BINANCE,OKEX" />)}
              </Form.Item >
            </Col>
            <Col span={3}>
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 8 },
                }}
              >
                <Button type="primary" htmlType="submit">
                  执行
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form >

        <Charts askData={this.state.askData} bidData={this.state.bidData} textX="basePrice"/>
      </React.Fragment >

    )
  }
}

export default Form.create()(indexPage);

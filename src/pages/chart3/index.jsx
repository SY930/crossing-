import React, { Component } from 'react'
import { Breadcrumb, Form, Row, Col, Button, Input, Select } from 'antd';
import Charts from '../../components/Charts';
import _ from 'lodash';
import moment from 'moment';
import { getChart3Data } from '../../api/home'

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

  getData = (values = '') => {
    getChart3Data(values).then((res) => {
      if (res.code === 1200) {
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
        console.log('obj', obj);
        const bidData = {
        };
        const askData = {};
        _.map(data, (item, key) => {
          bidData[`${key}_bid`] = obj[key].bid;
          askData[`${key}_ask`] = obj[key].ask;
        })
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
            <Col span={4}>
              < Form.Item label="grpType" >
                {getFieldDecorator('grpType', {
                  rules: [{ required: true, message: 'Please input the grpType you got!' }],
                })(<Input placeholder="" />)}
              </Form.Item >
            </Col>
            <Col span={4}>
              < Form.Item label="交易所" >
                {getFieldDecorator('exchange', {
                  rules: [{ required: true, message: 'Please input the exchange you got!' }],
                })(<Input placeholder="HUOBI,composite,BINANCE,OKEX" />)}
              </Form.Item >
            </Col>
            <Col span={4}>
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

        <Charts askData={this.state.askData} bidData={this.state.bidData} textX="queryBps" />
      </React.Fragment >

    )
  }
}

export default Form.create()(indexPage);

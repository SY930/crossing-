import React, { Component } from 'react'
import { Breadcrumb, Form, Row, Col, Button, Input } from 'antd';
import ReactHighcharts from 'react-highcharts';
import _ from 'lodash';
import {
  getChartOneData, getChartTwoData, getChartThreeData,
  getChartFourData, getChartFiveData, getChartSixData
} from '../../api/home'
import { chartColors } from '../../utils/enum';

const ChartRef1 = React.createRef();

class indexPage extends Component {
  constructor() {
    super();
    this.state = {
      avgOneData: {},
      avgTwoData: {},
      avgThreeData: {},
      avgFourData: {},
      avgFiveData: {},
      avgSixData: {},
    };
    this.mounted = false;
    this.timer = {
      handler: '',
      interval: '5000',
    }
    this.height = 600;
  }

  componentDidMount() {
    this.mounted = true;
    // this.height = document.documentElement.clientHeight || document.body.clientHeight || window.innerHeight
    this.getData();
    // const self = this;
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

  getChartConfig = (sData = [], text) => {
    // console.log('sData======', sData);
    const orignData = sData;
   
    let compareNames = _.map(sData, (item, key) => (key));
    const max = _.max(_.map(sData, (item) => (item.length)));
    const values = _.mapValues(sData, function (o) { return o.length; }); 
    if (compareNames.length > 1 && !_.isEmpty(values)) {
      for (let index = 1; index < compareNames.length; index++) {
        if (values[compareNames[index]] === max) {
          compareNames.unshift(compareNames[index])
          break;
        }
      }
    }
    const prepareData = (data = []) => {
      const obj = {
        list: _.map(data, item => item[1]),
      };
      // console.log(obj);
      obj.min = _.min(obj.list);
      obj.max = _.max(obj.list);
      return obj;
    };
    const categories = _.map(orignData[compareNames[0]], item => (item[0] - 0));
    // console.log('categories', categories);

    const names = _.map(sData, (item, key) => (key));
    const data = {};
    _.map(names, (item) => {
      data[item] = prepareData(orignData[item])
    })
    // console.log(data)

    const series = _.map(orignData, (item, key) => (
      {
        name: key,
        type: 'spline',
        // yAxis: 7,
        visible: data[`${key}`].list[0] !== null,
        data: data[`${key}`].list,
      }
    ))
    const config = {
      credits: {
        enabled: false,
      },
      chart: {
        type: 'line',
        zoomType: 'x',
        // height: 388,
        // width: 840,
      },
      colors: chartColors,
      plotOptions: {
        series: {
          animation: false,
          marker: {
            enabled: false,
          },
          // states: {
          //   hover: {
          //     enabled: false,
          //   },
          // },
        },
      },
      title: {
        text: '',
        align: 'left',
      },
      rangeSelector: {
        enabled: false,
      },
      navigator: {
        enabled: false,
      },
      scrollbar: {
        enabled: false,
      },
      legend: {
        enabled: true,
      },
      tooltip: {
        shared: true,
        xDateFormat: '%Y-%m-%d %H:%M:%S',
      },
      xAxis: [{
        categories: categories,
        type: 'datetime',
        title: {
          text: '扫单量',
        },
        crosshair: true,
        labels: {
          formatter() {
            return this.value - 0; // eslint-disable-line
          },
        },
      }],
      yAxis: {
        title: {
          text: `与comp的价格差 ${text}`,
        },
        // startOnTick: true,
        // endOnTick: true,
        // min: yAxisData().min,
        // max: yAxisData().max,
        minPadding: 0,
        maxPadding: 0,
        showEmpty: false,
      },
      series,
    };
    return config;
  }


  getRes = () => (
    {
      "code": 1200,
      "msg": "请求成功",
      "obj": {
        "BITSTAMP": [{
          "exchange": "BITSTAMP",
          "avg": 4.09,
          "qty": 1,
          "count": 8450
        }, {
          "exchange": "BITSTAMP",
          "avg": 4.40,
          "qty": 2,
          "count": 8450
        }, {
          "exchange": "BITSTAMP",
          "avg": 4.68,
          "qty": 3,
          "count": 8450
        }, {
          "exchange": "BITSTAMP",
          "avg": 4.92,
          "qty": 4,
          "count": 8450
        }, {
          "exchange": "BITSTAMP",
          "avg": 5.16,
          "qty": 5,
          "count": 8450
        }, {
          "exchange": "BITSTAMP",
          "avg": 5.41,
          "qty": 6,
          "count": 8450
        }, {
          "exchange": "BITSTAMP",
          "avg": 5.68,
          "qty": 7,
          "count": 8450
        }, {
          "exchange": "BITSTAMP",
          "avg": 5.95,
          "qty": 8,
          "count": 8449
        }, {
          "exchange": "BITSTAMP",
          "avg": 7.30,
          "qty": 13,
          "count": 8370
        }, {
          "exchange": "BITSTAMP",
          "avg": 7.77,
          "qty": 15,
          "count": 8149
        }, {
          "exchange": "BITSTAMP",
          "avg": 8.30,
          "qty": 18,
          "count": 7294
        }, {
          "exchange": "BITSTAMP",
          "avg": 8.66,
          "qty": 21,
          "count": 5833
        }, {
          "exchange": "BITSTAMP",
          "avg": 8.97,
          "qty": 26,
          "count": 3156
        }, {
          "exchange": "BITSTAMP",
          "avg": 9.00,
          "qty": 30,
          "count": 1511
        }, {
          "exchange": "BITSTAMP",
          "avg": 8.92,
          "qty": 35,
          "count": 362
        }],
        "OKCOIN": [{
          "exchange": "OKCOIN",
          "avg": 3.44,
          "qty": 1,
          "count": 8450
        }, {
          "exchange": "OKCOIN",
          "avg": 3.89,
          "qty": 2,
          "count": 8450
        }, {
          "exchange": "OKCOIN",
          "avg": 4.50,
          "qty": 3,
          "count": 8450
        }, {
          "exchange": "OKCOIN",
          "avg": 5.08,
          "qty": 4,
          "count": 8450
        }, {
          "exchange": "OKCOIN",
          "avg": 5.65,
          "qty": 5,
          "count": 8450
        }, {
          "exchange": "OKCOIN",
          "avg": 6.21,
          "qty": 6,
          "count": 8450
        }, {
          "exchange": "OKCOIN",
          "avg": 6.76,
          "qty": 7,
          "count": 8450
        }, {
          "exchange": "OKCOIN",
          "avg": 7.28,
          "qty": 8,
          "count": 8450
        }, {
          "exchange": "OKCOIN",
          "avg": 9.55,
          "qty": 13,
          "count": 8365
        }, {
          "exchange": "OKCOIN",
          "avg": 10.35,
          "qty": 15,
          "count": 8175
        }, {
          "exchange": "OKCOIN",
          "avg": 11.26,
          "qty": 18,
          "count": 6994
        }, {
          "exchange": "OKCOIN",
          "avg": 12.29,
          "qty": 21,
          "count": 4292
        }, {
          "exchange": "OKCOIN",
          "avg": 19.37,
          "qty": 26,
          "count": 451
        }, {
          "exchange": "OKCOIN",
          "avg": 30.50,
          "qty": 30,
          "count": 66
        }, {
          "exchange": "OKCOIN",
          "avg": 37.07,
          "qty": 35,
          "count": 6
        }],
        "COINBASE": [{
          "exchange": "COINBASE",
          "avg": 1.25,
          "qty": 1,
          "count": 8446
        }, {
          "exchange": "COINBASE",
          "avg": 1.48,
          "qty": 2,
          "count": 8445
        }, {
          "exchange": "COINBASE",
          "avg": 1.71,
          "qty": 3,
          "count": 8442
        }, {
          "exchange": "COINBASE",
          "avg": 1.92,
          "qty": 4,
          "count": 8438
        }, {
          "exchange": "COINBASE",
          "avg": 2.13,
          "qty": 5,
          "count": 8428
        }, {
          "exchange": "COINBASE",
          "avg": 2.33,
          "qty": 6,
          "count": 8420
        }, {
          "exchange": "COINBASE",
          "avg": 2.54,
          "qty": 7,
          "count": 8399
        }, {
          "exchange": "COINBASE",
          "avg": 2.73,
          "qty": 8,
          "count": 8370
        }, {
          "exchange": "COINBASE",
          "avg": 3.61,
          "qty": 13,
          "count": 7762
        }, {
          "exchange": "COINBASE",
          "avg": 3.94,
          "qty": 15,
          "count": 7030
        }, {
          "exchange": "COINBASE",
          "avg": 4.25,
          "qty": 18,
          "count": 5279
        }, {
          "exchange": "COINBASE",
          "avg": 4.32,
          "qty": 21,
          "count": 3134
        }, {
          "exchange": "COINBASE",
          "avg": 4.35,
          "qty": 26,
          "count": 1055
        }, {
          "exchange": "COINBASE",
          "avg": 4.45,
          "qty": 30,
          "count": 394
        }, {
          "exchange": "COINBASE",
          "avg": 4.11,
          "qty": 35,
          "count": 118
        }, {
          "exchange": "COINBASE",
          "avg": 4.26,
          "qty": 50,
          "count": 9
        }],
        "composite": [{
          "exchange": "composite",
          "avg": 0.58,
          "qty": 1,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 0.79,
          "qty": 2,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 1.01,
          "qty": 3,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 1.20,
          "qty": 4,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 1.39,
          "qty": 5,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 1.56,
          "qty": 6,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 1.72,
          "qty": 7,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 1.87,
          "qty": 8,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 2.55,
          "qty": 13,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 2.79,
          "qty": 15,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 3.14,
          "qty": 18,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 3.48,
          "qty": 21,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 4.04,
          "qty": 26,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 4.48,
          "qty": 30,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 5.04,
          "qty": 35,
          "count": 8450
        }, {
          "exchange": "composite",
          "avg": 6.74,
          "qty": 50,
          "count": 8285
        }]
      }
    }
  )


  getData = (value = '') => {
    getChartOneData(value).then((res) => {
    // const res = this.getRes();
    if (res.code === 1200) {
      const data = res.obj;
      const obj = {};
      _.map(data, (item, index) => {
        // obj[index] = {};
        obj[index] = [];
        _.map(item, (it) => {
          const qty = it.qty ? it.qty : 0;
          obj[index].push([
            qty,
            _.isNull(it.avg) ? null : it.avg - 0,
          ]);
        })
      });
      _.map(obj, (item, key) => {
        // const length = item.length;
        // console.log(length)
        obj[key] = _.orderBy(item, item => item[0]);
        // obj[key]['length'] = length;
      })
      console.log(obj)
      if (this.mounted) {
        this.setState({
          avgOneData: obj
        })
      }
    }
    })

    getChartTwoData(value).then((res) => {
      if (res.code === 1200) {
        const data = res.obj;
        const obj = {};
        _.map(data, (item, index) => {
          // obj[index] = {};
          obj[index] = [];
          _.map(item, (it) => {
            const qty = it.qty ? it.qty : 0;
            obj[index].push([
              qty,
              _.isNull(it.avg) ? null : it.avg - 0,
            ]);
          })
        });
        _.map(obj, (item, key) => {
          obj[key] = _.orderBy(item, item => item[0])
        })
        if (this.mounted) {
          this.setState({
            avgTwoData: obj
          })
        }
      }
    })


    getChartThreeData(value).then((res) => {
      if (res.code === 1200) {
        const data = res.obj;
        const obj = {};
        _.map(data, (item, index) => {
          // obj[index] = {};
          obj[index] = [];
          _.map(item, (it) => {
            const qty = it.qty ? it.qty : 0;
            obj[index].push([
              qty,
              _.isNull(it.avg) ? null : it.avg - 0,
            ]);
          })
        });
        _.map(obj, (item, key) => {
          obj[key] = _.orderBy(item, item => item[0])
        })
        if (this.mounted) {
          this.setState({
            avgThreeData: obj
          })
        }
      }
    })

    getChartFourData(value).then((res) => {
      if (res.code === 1200) {
        const data = res.obj;
        const obj = {};
        _.map(data, (item, index) => {
          // obj[index] = {};
          obj[index] = [];
          _.map(item, (it) => {
            const qty = it.qty ? it.qty : 0;
            obj[index].push([
              qty,
              _.isNull(it.avg) ? null : it.avg - 0,
            ]);
          })
        });
        _.map(obj, (item, key) => {
          obj[key] = _.orderBy(item, item => item[0])
        })
        if (this.mounted) {
          this.setState({
            avgFourData: obj
          })
        }
      }
    })


    getChartFiveData(value).then((res) => {
      if (res.code === 1200) {
        const data = res.obj;
        const obj = {};
        _.map(data, (item, index) => {
          // obj[index] = {};
          obj[index] = [];
          _.map(item, (it) => {
            const qty = it.qty ? it.qty : 0;
            obj[index].push([
              qty,
              _.isNull(it.avg) ? null : it.avg - 0,
            ]);
          })
        });
        _.map(obj, (item, key) => {
          obj[key] = _.orderBy(item, item => item[0])
        })
        console.log(obj)
        if (this.mounted) {
          this.setState({
            avgFiveData: obj
          })
        }
      }
    })


    getChartSixData(value).then((res) => {
      if (res.code === 1200) {
        const data = res.obj;
        const obj = {};
        _.map(data, (item, index) => {
          // obj[index] = {};
          obj[index] = [];
          _.map(item, (it) => {
            const qty = it.qty ? it.qty : 0;
            obj[index].push([
              qty,
              _.isNull(it.avg) ? null : it.avg - 0,
            ]);
          })
        });
        _.map(obj, (item, key) => {
          obj[key] = _.orderBy(item, item => item[0])
        })
        if (this.mounted) {
          this.setState({
            avgSixData: obj
          })
        }
      }
    })
  }

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, fieldsValue) => {
  //     if (err) {
  //       return;
  //     }
  //     const values = {
  //       ...fieldsValue,
  //     };
  //     this.getData(values);
  //   });
  // };


  handleSubmit = (e) => {
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
  }


  render() {
    console.log(this.height)
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
      <div style={{ minHeight: this.height }}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{ marginTop: 20 }}>
          <Row gutter={8}>
            <Col span={6}>
              <Form.Item label="grpType" >
                {getFieldDecorator('grpType', {
                })(<Input placeholder="" />)}
              </Form.Item >
            </Col>
            <Col span={3}>
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 8 },
                }}
              >
                <Button type="primary" htmlType="submit">执行</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form >
        <Breadcrumb style={{ margin: '0 0 5px 0' }}>
          <Breadcrumb.Item>税后</Breadcrumb.Item>
        </Breadcrumb>

        <div className="chart-12">
          <Row gutter={8}>
            <Col span={8}>
              <ReactHighcharts config={this.getChartConfig(this.state.avgOneData, 'bid')} ref={ChartRef1} />
            </Col>
            <Col span={8}>
              <ReactHighcharts config={this.getChartConfig(this.state.avgTwoData, 'ask')} ref={ChartRef1} />
            </Col>
            <Col span={8}>
              <ReactHighcharts config={this.getChartConfig(this.state.avgThreeData, 'all')} ref={ChartRef1} />
            </Col>
          </Row>
          <Breadcrumb style={{ margin: '20px 0 5px 0' }}>
            <Breadcrumb.Item>税前</Breadcrumb.Item>
          </Breadcrumb>
          <Row gutter={8} style={{ marginTop: 20 }}>
            <Col span={8}>
              <ReactHighcharts config={this.getChartConfig(this.state.avgFourData, 'bid')} ref={ChartRef1} />
            </Col>
            <Col span={8}>
              <ReactHighcharts config={this.getChartConfig(this.state.avgFiveData, 'ask')} ref={ChartRef1} />
            </Col>
            <Col span={8}>
              <ReactHighcharts config={this.getChartConfig(this.state.avgSixData, 'all')} ref={ChartRef1} />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Form.create()(indexPage);

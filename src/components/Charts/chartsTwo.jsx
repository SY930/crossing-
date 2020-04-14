import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts';
import _ from 'lodash';
import moment from 'moment';
import { chartColors } from '../../utils/enum';
import { Row, Col } from 'antd';

const ChartRef0 = React.createRef();
const ChartRef1 = React.createRef();

class indexPage extends Component {
    constructor() {
        super();
        this.state = {
        };
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
    }


    componentWillUnmount() {
        const self = this;
        self.mounted = false;
        // if (self.timer.handler) {
        //   clearInterval(self.timer.handler);
        //   self.timer.handler = null;
        // }
    }

    getChartConfigs = (sData = [], bData = []) => {

        const Snames = _.map(sData, (item, key) => (key));
        const Bnames = _.map(bData, (item, key) => (key));
        const prepareData = (data = []) => {
            const obj = {
                list: _.map(data, item => item[1]),
            };
            // console.log(obj);
            obj.min = _.min(obj.list);
            obj.max = _.max(obj.list);
            return obj;
        };

        const categories = _.map(sData[Snames[0]], item => (item[0] - 0));
        // console.log('categories', categories);
    
        const data = {};
        _.map(Snames, (item) => {
          data[item] = prepareData(sData[item])
        })
        const dataBid = {}
        _.map(Bnames, (item) => {
            dataBid[item] = prepareData(bData[item])
          })

        const series1 = _.map(sData, (item, key) => (
           {
            name: key,
            type: 'spline',
            // yAxis: 7,
            visible: data[`${key}`].list[0] !== null,
            data: data[`${key}`].list,
          }
        ));

        const series2 = _.map(bData, (item, key) => (
            {
             name: key,
             type: 'spline',
             // yAxis: 7,
             visible: dataBid[`${key}`].list[0] !== null,
             data: dataBid[`${key}`].list,
           }
         ));

         const series = _.concat(series1, series2);
     
        // const categories = _.map(sData[`BINANCE_${Sname}`], item => (item[0] - 0));
        // // console.log('categories', categories);
        // const data = {
        //     BINANCE: prepareData(sData[`BINANCE_${Sname}`]),
        //     composite: prepareData(sData[`composite_${Sname}`]),
        //     HUOBI: prepareData(sData[`HUOBI_${Sname}`]),
        //     OKEX: prepareData(sData[`OKEX_${Sname}`]),
        // };
        // const dataBid = {
        //     BINANCE: prepareData(bData[`BINANCE_${Bname}`]),
        //     composite: prepareData(bData[`composite_${Bname}`]),
        //     HUOBI: prepareData(bData[`HUOBI_${Bname}`]),
        //     OKEX: prepareData(bData[`OKEX_${Bname}`]),
        // };
        // console.log('data.binanceAsk.list', data, data[`BINANCE_${Sname}`])

        const config = {
            credits: {
                enabled: false,
            },
            chart: {
                type: 'line',
                zoomType: 'x',
                height: 560,
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
                crosshair: true,
                labels: {
                    formatter() {
                        return this.value; // eslint-disable-line
                    },
                },
            }],
            yAxis: {
                title: {
                    text: '各个市场与comp的价格差',
                },
                minPadding: 0,
                maxPadding: 0,
                showEmpty: false,
            },
            series,
        };
        return config;
    }

    getChartConfig = (sData = [], name) => {
        // console.log('sData======', sData);
        const names = _.map(sData, (item, key) => (key));
        const prepareData = (data = []) => {
            const obj = {
                list: _.map(data, item => item[1]),
            };
            // console.log(obj);
            obj.min = _.min(obj.list);
            obj.max = _.max(obj.list);
            return obj;
        };
        const categories = _.map(sData[names[0]], item => (item[0] - 0));
        // console.log('categories', categories);
    
        const data = {};
        _.map(names, (item) => {
          data[item] = prepareData(sData[item])
        })
        // console.log(data)
      
        const series = _.map(sData, (item, key) => (
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
                height: 260,
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
                crosshair: true,
                labels: {
                    formatter() {
                        return this.value; // eslint-disable-line
                    },
                },
            }],
            yAxis: {
                title: {
                    text: '',
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

    render() {
        return (
            <React.Fragment>
                <Row gutter={8}>
                    <Col span={12}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        {
                            !_.isEmpty(this.props.askData) ? (
                                <div style={{ borderBottom: '1px solid black' }}>
                                    <ReactHighcharts config={this.getChartConfigs(this.props.askData, this.props.bidData)} ref={ChartRef1} />
                                </div>
                            ) : ''
                        }
                        </div>
                    </Col>
                    <Col span={12}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                            {
                                !_.isEmpty(this.props.askData) ? (
                                    <div style={{ borderBottom: '1px solid black' }}>
                                        <ReactHighcharts config={this.getChartConfig(this.props.askData, 'ask')} ref={ChartRef1} />
                                    </div>
                                ) : ''
                            }
                            {
                                !_.isEmpty(this.props.bidData) ? (
                                    <div style={{ marginTop: '40px', borderBottom: '1px solid black' }}>
                                        <ReactHighcharts config={this.getChartConfig(this.props.bidData, 'bid')} ref={ChartRef0} />
                                    </div>
                                ) : ''
                            }

                        </div>
                    </Col>
                </Row>
            </React.Fragment>

        )
    }
}

export default indexPage;

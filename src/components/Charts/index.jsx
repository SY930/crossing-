import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts';
import _ from 'lodash';
import moment from 'moment';
import { chartColors } from '../../utils/enum';

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

  getChartConfig = (sData = [], name, textY, textX) => {
    const orignData = sData;
    // console.log(orignData)
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
    const categories = _.map(orignData[compareNames[0]], item => (item[0]));
    console.log('categories', categories);

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
        zoomType: 'x'
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
        title: {
          text: textX,
        },
        categories: categories,
        type: 'datetime',
        crosshair: true,
        labels: {
          formatter() {
            return this.value // eslint-disable-line
          },
        },
      }],
      yAxis: {
        title: {
          text: textY,
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
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          {
              !_.isEmpty(this.props.askData) ? (
                <div style={{ borderBottom: '1px solid black' }}>
                <ReactHighcharts config={this.getChartConfig(this.props.askData, 'ask', this.props.textY, this.props.textX)} ref={ChartRef1} />
                </div>
              ) : ''
            }
            {
              !_.isEmpty(this.props.bidData) ? (
                  <div style={{  marginTop: '40px', borderBottom: '1px solid black' }}>
                  <ReactHighcharts config={this.getChartConfig(this.props.bidData, 'bid', this.props.textY, this.props.textX)} ref={ChartRef0} />
                  </div>
              ) : ''
            }
           
          </div>
      </React.Fragment>

    )
  }
}

export default indexPage;

indexPage.defaultProps = {
  textY: '与comp 的价格差',
  textX: '',
}
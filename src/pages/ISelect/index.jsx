import React, { Component } from 'react';
import { Select } from 'antd';
import _ from 'lodash';

const Option = Select.Option;

class IndexPage extends Component {
  // fix bug: 数据频繁刷新导致下拉列表选择不易
  shouldComponentUpdate(nextProps, nextState) {
    if (!_.isEqual(nextProps, this.props)
      || !_.isEqual(nextState, this.state)) {
      console.log('shouldUpdateTimestamp-select: 数据变化');
      return true;
    }
    return false;
  }

  handleChangeSym = (value) => {
  
    this.props.handleChange(value);
  }

  render() {
    return (
      <Select 
      defaultValue={this.props.defaultValue}
      value={this.props.value}
      style={{ width: '70%' }}
      onChange={this.handleChangeSym}>
      {
          _.map(this.props.optSelect || [], (item) => (<Option key={`${item.sym}`} value={`${item.sym}`}>{item.sym}</Option>))
      }
  </Select>
    );
  }
}

export default IndexPage;

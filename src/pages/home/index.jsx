import React, { Component } from 'react'
import { List } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class indexPage extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                {
                    title: 'BTC_USDT',
                },
                {
                    title: 'VET_USDT',
                }
            ]
        };
        this.mounted = false;
        this.timer = {
            handler: '',
            interval: '5000',
        }
    }

    componentDidMount() {
        this.mounted = true;
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
            }
        )
    }

    getData = (values = '') => {

        const res = this.getRes()
        const data = res.obj;
        const obj = {

        };
        if (this.mounted) {
            this.setState({

            })
        }
    }

    handleSubmit = e => {
        e.preventDefault();

    };


    render() {
        // const { getFieldDecorator } = this.props.form;
        // const formItemLayout = {
        //     labelCol: {
        //         xs: { span: 24 },
        //         sm: { span: 8 },
        //     },
        //     wrapperCol: {
        //         xs: { span: 24 },
        //         sm: { span: 16 },
        //     },
        // };
        return (
            <div className="main-page">
                <div className="list-title">
                    <List
                        size="small"
                        bordered
                        dataSource={this.state.data}
                        renderItem={item => <List.Item><Link to={`/symbol/${item.title}`}>{item.title}</Link></List.Item>}
                    />
                </div>

            </div>

        )
    }
}

export default indexPage;

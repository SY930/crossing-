import React,{Component} from 'react';
import { Layout } from 'antd';
import Tab from "../components/Tab/index";
const {Footer, Content} = Layout;

export default class App extends Component{
    render(){
        return (
          <Layout className="layout">
                <Tab/>
                <Content style={{ padding: '0 50px' }}>
                {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        )
    }
}
import React from 'react';
import { Menu, Layout } from 'antd';

const { Header } = Layout;
const { SubMenu } = Menu;

class Tab extends React.Component {
    state = {
        selectedKeys: [],
        current: '1',
    };

    componentDidMount() {
        this.navActive();
        window.onhashchange = () => {
            this.navActive();
        }
    }

    navActive = () => {
        const current = [];
        const hash = window.location.hash.split('/');
        if (hash[hash.length - 1] === '') {
            current.push('01');
        } else {
            console.log(hash[hash.length - 1].substr(2));
            current.push(hash[hash.length - 1].substr(-2));
        }
        this.setState({
            current
        })
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    onClick={this.handleClick}
                    defaultOpenKeys={['01']}
                    selectedKeys={this.state.current}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="01">
                        <a href="#/">basePrice</a>
                    </Menu.Item>
                    <Menu.Item key="02">
                        <a href="#/chart02">baseQty</a>
                    </Menu.Item>
                    <Menu.Item key="03">
                        <a href="#/chart03">queryBps</a>
                    </Menu.Item>
                    <Menu.Item key="04">
                        <a href="#/chart04">queryBtc</a>
                    </Menu.Item>
                    <Menu.Item key="05">
                        <a href="#/option05">操作</a>
                    </Menu.Item>
                    <Menu.Item key="11">
                        <a href="#/chart11">对比</a>
                    </Menu.Item>
                    <Menu.Item key="12">
                        <a href="#/chart12">增量</a>
                    </Menu.Item>
                    <SubMenu key="params" title="表格">
                        <Menu.Item key="06">
                            <a href="#/table06">表格</a>
                        </Menu.Item>
                        <Menu.Item key="07">
                            <a href="#/table07">basePrice表格</a>
                        </Menu.Item>
                        <Menu.Item key="08">
                            <a href="#/table08">baseQty表格</a>
                        </Menu.Item>
                        <Menu.Item key="09">
                            <a href="#/table09">queryBps表格</a>
                        </Menu.Item>
                        <Menu.Item key="10">
                            <a href="#/table10">queryBtc表格</a>
                        </Menu.Item>
                        <Menu.Item key="13">
                            <a href="#/download13">下载记录</a>
                        </Menu.Item>
                        <Menu.Item key="14">
                            <a href="#/config14">配置</a>
                        </Menu.Item>
                    </SubMenu>
                  
                </Menu>
            </Header>
        );
    }
}
export default Tab;
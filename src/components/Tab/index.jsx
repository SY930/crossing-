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
                        <a href="#/">home</a>
                    </Menu.Item>
                </Menu>
            </Header>
        );
    }
}
export default Tab;
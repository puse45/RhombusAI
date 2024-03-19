import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import LogoutComponent from "../../components/UserAccount/Form/LogoutComponent";

const { Sider } = Layout;

const Sidebar = () => {
    const location = useLocation();

    return (
        <Sider width={200} style={{ background: '#fff' }}>
            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                style={{ height: '100%', borderRight: 0 }}
            >
                <Menu.Item key="/">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="/dashboard">
                    <Link to="/document/create/">Create Form</Link>
                </Menu.Item>
                <Menu.Item key="/logout">
                    <LogoutComponent />
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;

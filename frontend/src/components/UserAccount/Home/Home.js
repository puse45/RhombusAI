import React, {useCallback, useEffect, useState} from 'react';
import Cookies from 'js-cookie'

import {Breadcrumb, Button, Layout, Menu, message, Table, theme} from 'antd';
import axios from "axios";
import {Link} from 'react-router-dom';
import Sidebar from '../../../view/Siderbar/Sidebar';

const { Header, Content, Footer, Sider } = Layout;


const App = () => {

    const baseUrl = process.env.REACT_APP_BACKEND_URL;
    const token = Cookies.get('token')
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const column_headers =[{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',

    },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Button type="link">
                    <Link to={`/document/edit/${record.id}`}>View Details</Link>
                </Button>
            ),
        },
    ]

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const loadData = useCallback(async () => { // TODO refactor this for improvements
        setLoading(true)
        try {
            // Make API request to fetch documents
            const route = "/api/documents/";
            const response = await axios.get(baseUrl + route, headers);
            setData(response.data.results);
            setLoading(false)
        } catch (error) {
            // Handle error
            message.error('Failed to fetch documents. Please try again.');
            setLoading(false)
        }
    }, []);


    useEffect(() => {
        // Load data when the component mounts
        loadData();
    }, [loadData]);

    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}

                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                />

            </Header>

            <Content
                style={{
                    margin: '24px 16px 0',
                    overflow: 'initial',
                }}
            >
                <Breadcrumb
                    style={{
                        margin: '16px 0',
                    }}
                >
                    <Breadcrumb.Item>
                        <Link to="/">
                            Home
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Layout
                    style={{
                        padding: '24px 24px',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Sidebar />

                    <Sider
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{
                                height: '100%',
                            }}

                        />
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                        </Content>

                    </Sider>

                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        <Table
                            dataSource={data}
                            columns={column_headers}
                            loading={loading}
                        />
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
            </Footer>
        </Layout>
    );
};
export default App;

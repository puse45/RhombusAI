import React, { useState } from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Button, Upload, message, Form, Col, Input,Breadcrumb, Layout, Menu, theme} from 'antd';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Sidebar from "../../../view/Siderbar/Sidebar";
const { Header, Content, Footer, Sider } = Layout;
const baseUrl = process.env.REACT_APP_BACKEND_URL;
const App = () => {

    const token = Cookies.get('token')
    const navigate = useNavigate();
    const [form] = Form.useForm();


    const [file, setFile] = useState(null);

    const onFinish = async (values) => { // TODO refactor this for improvements
        try {
            const formData = new FormData();
            if(values.name){
                formData.append('name', values.name);
            }
            formData.append('file', file);
            const route = "/api/documents/";
            await axios.post(baseUrl + route, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            message.success('Uploaded successfully!');
            // Redirect to home page
            navigate('/');
        } catch (error) {
            message.error('Failed to upload document. Please try again.');
            form.resetFields()
        }
    };

    const beforeUpload = (file) => {
        const fileType = file.type;
        if (fileType !== 'text/csv' && fileType !== 'application/vnd.ms-excel' && fileType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            message.error('You can only upload CSV or XLSX files!');
            return false;
        }
        return true;
    };

    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleFileChange = (info) => {
        setFile(info.file.originFileObj);
    };
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
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        <Col
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Form
                                layout="horizontal"
                                form={form} name="user_form" onFinish={onFinish} initialValues={{ remember: true }}
                                onFinishFailed={onSubmitFailed} autoComplete="off"
                            >
                                <Form.Item
                                    label="Name"
                                    name="name"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="File"
                                    name="file"
                                    rules={[{ required: true, message: 'Please upload a file!' }]}
                                >
                                    <Upload
                                        beforeUpload={beforeUpload}
                                        onChange={handleFileChange}
                                        maxCount={1}
                                        multiple={false}
                                        accept=".csv,.xls,.xlsx"
                                    >
                                        <Button icon={<UploadOutlined />}>Upload File</Button>
                                    </Upload>
                                </Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>

                            </Form>
                        </Col>
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

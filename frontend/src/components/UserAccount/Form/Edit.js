import React, { useState, useEffect } from 'react';
import {Col, Input, Form, Button, Upload, message, Menu, Breadcrumb, Layout, theme, Select,Tabs} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "../../../view/Siderbar/Sidebar";
const { TabPane } = Tabs;
const { Header, Content, Footer, Sider } = Layout;
const baseUrl = process.env.REACT_APP_BACKEND_URL;
const { Option } = Select;
const EditObjectForm = ({ objectId }) => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const [columnDataTypes, setColumnDataTypes] = useState({});
    const [readMoreLink, setReadMoreLink] = useState(null);
    const [file, setFile] = useState(null);
    const [objectData, setObjectData] = useState(null);
    const token = Cookies.get('token')
    const headers = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const fetchObjectData = async () => {
        try {
            const route = "/api/documents/";
            const response = await axios.get(baseUrl+`${route}${id}/`,headers);
            const mappedData = {
                name: response.data.name,
                created_at: response.data.created_at,
                is_archived: response.data.is_archived,
                status: response.data.status
            };
            setReadMoreLink(response.data.file)
            setObjectData(mappedData);
            setColumnDataTypes(response.data.column_data_types);

        } catch (error) {
            console.error('Failed to fetch object data:', error);
        }
    };

    const onFinish = async (values) => { // TODO refactor this for improvements
        try {
            const formData = new FormData();
            if(values.name){
                formData.append('name', values.name);
            }
            if(file){
                formData.append('file', file);
            }
            const columnDataTypeValues = {};
            Object.entries(columnDataTypes).forEach(([fieldName, fieldType]) => {
                const formFieldName = `column_data_types.${fieldName}`;
                const fieldValue = form.getFieldValue(formFieldName);
                if(fieldValue){
                    columnDataTypeValues[fieldName] = fieldValue;
                }
            });
            if(columnDataTypeValues){
                formData.append('column_data_types', JSON.stringify(columnDataTypeValues));
            }
            const route = "/api/documents/";
            await axios.patch(baseUrl+`${route}${id}/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            });
            message.success('Updated successfully!');

        } catch (error) {
            message.error('Failed to update. Please try again.');
        }
    };

    const beforeUpload = (file) => {
        return true;
    };



    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleFileChange = (info) => {
        setFile(info.file.originFileObj);
    };

    const renderFormField = (fieldName, fieldType) => {
        switch (fieldType) {
            case 'int64':
            case 'int32':
            case 'int16':
            case 'int8':
                return (
                <Select value="int64" defaultValue="Number">
                    <Option value="object">Text</Option>
                    <Option value="datetime64[ns]">Date</Option>
                    <Option value="bool">Boolean</Option>
                    <Option value="float64">Float</Option>
                    <Option value="category">Category</Option>
                    <Option value="complex128">Complex</Option>
                    <Option value="timedelta[ns]">Time</Option>
                </Select>
            );
            case 'float64':
            case 'float32':
                return (
                    <Select value="float64" defaultValue="Float">
                        <Option value="int64">Number</Option>
                        <Option value="object">Text</Option>
                        <Option value="datetime64[ns]">Date</Option>
                        <Option value="bool">Boolean</Option>
                        <Option value="category">Category</Option>
                        <Option value="complex128">Complex</Option>
                        <Option value="timedelta[ns]">Time</Option>
                    </Select>
                );
            case 'datetime64[ns]':
                return (
                    <Select value="datetime64[ns]" defaultValue="Date">
                        <Option value="int64">Number</Option>
                        <Option value="object">Text</Option>
                        <Option value="bool">Boolean</Option>
                        <Option value="float64">Float</Option>
                        <Option value="category">Category</Option>
                        <Option value="complex128">Complex</Option>
                        <Option value="timedelta[ns]">Time</Option>
                    </Select>
                );
            case 'timedelta[ns]':
                return (
                    <Select value="timedelta[ns]" defaultValue="Time">
                        <Option value="int64">Number</Option>
                        <Option value="object">Text</Option>
                        <Option value="datetime64[ns]">Date</Option>
                        <Option value="bool">Boolean</Option>
                        <Option value="float64">Float</Option>
                        <Option value="category">Category</Option>
                        <Option value="complex128">Complex</Option>
                    </Select>
                );
            case 'object':
                return (
                    <Select value="object" defaultValue="Text">
                        <Option value="int64">Number</Option>
                        <Option value="datetime64[ns]">Date</Option>
                        <Option value="bool">Boolean</Option>
                        <Option value="float64">Float</Option>
                        <Option value="category">Category</Option>
                        <Option value="complex128">Complex</Option>
                        <Option value="timedelta[ns]">Time</Option>
                    </Select>
                );
            case 'bool':
                return (
                    <Select value="bool" defaultValue="Boolean">
                        <Option value="int64">Number</Option>
                        <Option value="object">Text</Option>
                        <Option value="datetime64[ns]">Date</Option>
                        <Option value="float64">Float</Option>
                        <Option value="category">Category</Option>
                        <Option value="complex128">Complex</Option>
                        <Option value="timedelta[ns]">Time</Option>
                    </Select>
                );
            case 'category':
                return (
                    <Select value="category" defaultValue="Category">
                        <Option value="int64">Number</Option>
                        <Option value="object">Text</Option>
                        <Option value="datetime64[ns]">Date</Option>
                        <Option value="bool">Boolean</Option>
                        <Option value="float64">Float</Option>
                        <Option value="complex128">Complex</Option>
                        <Option value="timedelta[ns]">Time</Option>
                    </Select>
                );
            case 'complex128':
                return (
                    <Select value="complex128" defaultValue="Complex">
                        <Option value="int64">Number</Option>
                        <Option value="object">Text</Option>
                        <Option value="datetime64[ns]">Date</Option>
                        <Option value="bool">Boolean</Option>
                        <Option value="float64">Float</Option>
                        <Option value="category">Category</Option>
                        <Option value="timedelta[ns]">Time</Option>
                    </Select>
                );
            default:
                return <Input />;
        }
    };

    useEffect(() => {
        form.setFieldsValue(objectData);
    }, [form, objectData]);
    useEffect(() => {
        fetchObjectData();
    }, []);

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

                                alignItems: 'center',
                            }}
                        >

                            <Form form={form} name="edit_object_form" onFinish={onFinish} layout="horizontal">
                                <Tabs defaultActiveKey="2">
                                    <TabPane tab="Form Fields" key="1">
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    style={{ width: '30%' }}
                                    rules={[{ required: false, message: 'Please input the name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                        <Form.Item
                                            label="File Link"
                                        >
                                            {readMoreLink && (
                                                <a href={readMoreLink} target="_blank" rel="noopener noreferrer">
                                                    Open File
                                                </a>
                                            )}
                                        </Form.Item>
                                        <Form.Item
                                            label="File"
                                            name="file"
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
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Edit
                                            </Button>
                                        </Form.Item>

                                    </TabPane>
                                    <TabPane tab="Column Headers" key="2">
                                {Object.entries(columnDataTypes).map(([fieldName, fieldType]) => (
                                    <Form.Item key={fieldName} label={fieldName} name={`column_data_types.${fieldName}`} style={{ width: '30%' }}>
                                        {renderFormField(fieldName, fieldType)}
                                    </Form.Item>
                                ))}
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Edit
                                            </Button>
                                        </Form.Item>
                                    </TabPane>
                                    <TabPane tab="Read Only" key="3">
                                        <Form.Item
                                            label="Status"
                                            name="status"
                                            style={{ width: '30%' }}
                                        >
                                            <Input disabled />
                                        </Form.Item>
                                <Form.Item label="Archived" name="is_archived" valuePropName="checked" style={{ width: '30%' }}>
                                    <Input type="checkbox" disabled/>
                                </Form.Item>
                                        <Form.Item label="Created At" name="created_at" style={{ width: '30%' }}>
                                            <Input type="datetime" disabled/>
                                        </Form.Item>

                                    </TabPane>
                                </Tabs>
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

export default EditObjectForm;

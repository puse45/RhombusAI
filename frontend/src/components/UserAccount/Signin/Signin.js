import './Signin.css';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Col, Form, Input, message, Row, Typography} from 'antd';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
const baseUrl = process.env.REACT_APP_BACKEND_URL;



const Sign_in = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm()
    const onFinish = async (values) => { // TODO refactor this for improvements
        try {
            // Make API request to login user
            const route = "/api/token/"
            const response = await axios.post(baseUrl+route, values);
            Cookies.set('token', response.data.access_token,{ expires: 1 })
            message.success('Logged In Successful!');

            // Redirect to home page
            navigate('/');
        } catch (error) {
            // Handle login error
            message.error('Login failed. Please try again.');
            form.resetFields()
        }
    };
    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div>
        <Form
            form={form}
            layout="vertical"
            name="normal_login"
            className="siginin-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onSubmitFailed} autoComplete="off"
        >
            <Row justify="center">
                <Col>
                    <Typography.Title level={4}>
                        Sign In
                    </Typography.Title>
                </Col>
            </Row>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>

                <a className="login-form-forgot" href="/signup">Register</a>
            </Form.Item>
        </Form>
        </div>
    );
}

export default Sign_in

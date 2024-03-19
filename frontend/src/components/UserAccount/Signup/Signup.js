import './Signup.css';

import {
    Button,
    Col,
    Form,
    Input,
    Row,
    message,
    Typography
} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const Signup = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm()
    const onSubmitFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = async (values) => { // TODO refactor this for improvements
        try {
            // Make API request to register user
            const route = "/api/users/"
            const response = await axios.post(baseUrl+route, values);
            message.success('Registration successful!');
            console.log('Registered Successful',response.data)
            // Redirect to home page
            navigate('/');
        } catch (error) {
            // Handle registration error
            console.error('Registration failed:', error.response);
            message.error('Registration failed. Please try again.');
            form.resetFields()
        }
    };

    return(
        <div>
            <Form
                layout="vertical"
                name="register"
                onFinish={onFinish}
                initialValues={{
                    remember: true,
                }}
                className="signup-form" onFinishFailed={onSubmitFailed} autoComplete="off" form={form}
                scrollToFirstError
            >
                <Row justify="center">
                    <Col>
                        <Typography.Title level={4}>
                            Sign Up
                        </Typography.Title>
                        </Col>
                </Row>
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            message: 'The input is not valid Username!',
                        },
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                      <a href="/signin">Sign In</a>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Signup

import React, { useContext, useState } from "react";
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    Checkbox,
    Card,
    Spin,
    Modal,
    Typography,
    Alert,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthContext } from "../AuthContext";

export default props => {
    const auth = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const presetUsername = auth.getStoredUsername();

    const onLogin = async ({ username, password, remember }) => {
        if (remember) {
            auth.storeUsername(username);
        } else {
            auth.unstoreUsername();
        }

        setLoading(true);
        try {
            await auth.login(username, password);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                visible={loading}
                closable={false}
                footer={null}
                centered={true}
                style={{ textAlign: "center" }}>
                <Typography.Title>
                    <Spin size="large"></Spin>&nbsp;&nbsp;&nbsp;Logging in...
                </Typography.Title>
            </Modal>
            <Row style={{ marginTop: 50 }}>
                <Col lg={{ span: 10, offset: 7 }} sm={{ span: 22, offset: 1 }}>
                    <Card
                        title={
                            <div style={{ textAlign: "center" }}>
                                <h1>Login</h1>
                                <h3>
                                    <a href="https://exanion.de/exalicense">
                                        ExaLicense
                                    </a>{" "}
                                    - Open Source Licensing Solution
                                </h3>
                            </div>
                        }>
                        {error ? (
                            <>
                                <Alert
                                    type="error"
                                    message="Login Error"
                                    description={error}
                                />
                                <br />
                                <br />
                            </>
                        ) : null}
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{
                                username: presetUsername,
                                remember: true,
                            }}
                            onFinish={onLogin}>
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Username!",
                                    },
                                ]}>
                                <Input
                                    prefix={
                                        <UserOutlined className="site-form-item-icon" />
                                    }
                                    placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Password!",
                                    },
                                ]}>
                                <Input
                                    prefix={
                                        <LockOutlined className="site-form-item-icon" />
                                    }
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item
                                    name="remember"
                                    valuePropName={
                                        presetUsername ? "checked" : ""
                                    }
                                    noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    style={{ float: "right" }}>
                                    Log in
                                </Button>
                            </Form.Item>
                        </Form>
                        <div style={{ textAlign: "center" }}>
                            <h4>
                                Powered by{" "}
                                <a
                                    href="https://exanion.de"
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    <big>Exanion</big>
                                </a>
                            </h4>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

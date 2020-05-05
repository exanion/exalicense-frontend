import React, { useState } from "react";
import { Card, Typography, Form, Input, Spin, Button, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Queries from "../../Queries";
import { useMutation } from "@apollo/react-hooks";

export default function ChangeOwnPassword() {
    const [form] = Form.useForm();

    const [setOwnPassword, { loading }] = useMutation(Queries.SET_OWN_PASSWORD);
    const [showButtons, setShowButtons] = useState(false);

    return (
        <Spin spinning={loading}>
            <Card>
                <Typography.Title level={2}>Change Password</Typography.Title>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={v =>
                        setOwnPassword({ variables: v })
                            .then(v => {
                                message.success("Changed Password");
                                setShowButtons(false);
                                form.resetFields();
                            })
                            .catch(e =>
                                message.error("Couldn't change password")
                            )
                    }>
                    <Form.Item
                        name="currentPassword"
                        label="Current Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input a password!",
                            },
                        ]}
                        hasFeedback>
                        <Input.Password onChange={() => setShowButtons(true)} />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input a password!",
                            },
                        ]}
                        hasFeedback>
                        <Input.Password onChange={() => setShowButtons(true)} />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Confirm New Password"
                        dependencies={["newPassword"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm the password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (
                                        !value ||
                                        getFieldValue("newPassword") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        "The password confirmation doesn't match!"
                                    );
                                },
                            }),
                        ]}>
                        <Input.Password onChange={() => setShowButtons(true)} />
                    </Form.Item>
                    <Form.Item>
                        {showButtons ? (
                            <>
                                <Button
                                    icon={<CheckOutlined />}
                                    style={{
                                        float: "right",
                                        marginLeft: "8px",
                                    }}
                                    htmlType="submit">
                                    Save
                                </Button>
                                <Button
                                    htmlType="button"
                                    icon={<CloseOutlined />}
                                    style={{ float: "right" }}
                                    onClick={() => {
                                        setShowButtons(false);
                                        form.resetFields();
                                    }}>
                                    Cancel
                                </Button>
                            </>
                        ) : null}
                    </Form.Item>
                </Form>
            </Card>
        </Spin>
    );
}

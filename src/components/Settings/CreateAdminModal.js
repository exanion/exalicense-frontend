import React, { useState } from "react";
import { Modal, Form, Input, message, Spin } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export default function CreateAdminModal({
    visible,
    onSave = () => null,
    onCancel = () => null,
    loading = false,
}) {
    const [form] = Form.useForm();
    const [didEditName, setDidEditName] = useState(false);

    return (
        <Modal
            visible={visible ? visible : false}
            title="Create new Administrator"
            okButtonProps={{ icon: <CheckOutlined /> }}
            cancelButtonProps={{ icon: <CloseOutlined /> }}
            okText="Save"
            cancelText="Cancel"
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            onOk={() => {
                form.validateFields()
                    .then(values => {
                        onSave(values);
                        form.resetFields();
                    })
                    .catch(err => {
                        console.error(err);
                        let msg =
                            ((err.errorFields || [])[0] || {}).errors || [];
                        if (msg[0]) {
                            message.error(msg[0]);
                        } else {
                            message.error("Can't save the data!");
                        }
                    });
            }}>
            <Spin spinning={loading}>
                <Form form={form} layout="vertical">
                    <Form.Item name="displayname" label="Description">
                        <Input
                            onChange={e => {
                                if (!didEditName) {
                                    form.setFieldsValue({
                                        username: form
                                            .getFieldValue("displayname")
                                            .toLowerCase()
                                            .replace(" ", "_")
                                            .replace(/[^a-z0-9_\-.]/gi, ""),
                                    });
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[
                            { required: true, message: "A name is required!" },
                            {
                                validator: (r, v) =>
                                    /^[a-zA-Z0-9_\-.]+$/.test(v)
                                        ? Promise.resolve()
                                        : Promise.reject("x"),
                                message:
                                    "The username may only consist of alphanumeric character, underscores, dots and dashes!",
                            },
                        ]}>
                        <Input onChange={e => setDidEditName(true)} />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid Email!",
                            },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Initial Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input a password!",
                            },
                        ]}
                        hasFeedback>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={["password"]}
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
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        "The password confirmation doesn't match!"
                                    );
                                },
                            }),
                        ]}>
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
}

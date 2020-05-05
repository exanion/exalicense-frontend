import React, { useState } from "react";
import { Modal, Form, Input, message, Spin } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export default function NameDisplaynameEditModal({
    title,
    visible,
    defaultName,
    defaultDisplayname,
    onSave = () => null,
    onCancel = () => null,
    loading = false,
}) {
    const [form] = Form.useForm();
    const [didEditName, setDidEditName] = useState(defaultName ? true : false);
    
    return (
        <Modal
            visible={visible ? visible : false}
            title={title}
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
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        name: defaultName,
                        displayname: defaultDisplayname,
                    }}>
                    <Form.Item name="displayname" label="Description">
                        <Input
                            onChange={e => {
                                if (!didEditName) {
                                    form.setFieldsValue({
                                        name: form
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
                        name="name"
                        label="Name"
                        rules={[
                            { required: true, message: "A name is required!" },
                            {
                                validator: (r, v) =>
                                    /^[a-zA-Z0-9_\-.]+$/.test(v)
                                        ? Promise.resolve()
                                        : Promise.reject("x"),
                                message:
                                    "The name may only consist of alphanumeric character, underscores, dots and dashes!",
                            },
                        ]}>
                        <Input onChange={e => setDidEditName(true)} />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
}

import React, { useState } from "react";
import { Card, Typography, Form, Input, Spin, Button, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Queries from "../../Queries";
import { useQuery, useMutation } from "@apollo/react-hooks";

export default function EditPersonalDetails() {
    const [form] = Form.useForm();
    const { data: adminRaw, loading: isAdminLoading } = useQuery(
        Queries.ADMIN_SELF_GET,
        {
            onCompleted: data => form.setFieldsValue(data.adminSelf || {}),
        }
    );
    const [updateAdmin, { loading: isAdminUpdating }] = useMutation(
        Queries.ADMIN_UPDATE,
        {
            refetchQueries: ["getOrganization", "getAdminSelf"],
        }
    );
    const admin = (adminRaw || {}).adminSelf || {};
    const [showButtons, setShowButtons] = useState(false);

    return (
        <Spin spinning={isAdminLoading || isAdminUpdating}>
            <Card>
                <Typography.Title level={2}>
                    Edit personal details
                </Typography.Title>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={admin}
                    onFinish={v =>
                        updateAdmin({ variables: { id: admin.id, ...v } })
                            .then(v => {
                                message.success("Saved details");
                                setShowButtons(false);
                            })
                            .catch(e => message.error("Couldn't save details"))
                    }>
                    <Form.Item name="displayname" label="Name">
                        <Input onChange={() => setShowButtons(true)} />
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
                        <Input onChange={() => setShowButtons(true)} />
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
                        <Input onChange={() => setShowButtons(true)} />
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

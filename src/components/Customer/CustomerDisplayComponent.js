import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Space, Descriptions } from "antd";
import nl2br from "react-nl2br";
import React from "react";

export default function CustomerDisplayComponent({
    customer,
    onEditClick,
    onDeleteClick,
}) {
    return (
        <>
            <Row>
                <Col>
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Name">
                            {customer.displayname}
                        </Descriptions.Item>
                        {customer.contactName ? (
                            <Descriptions.Item label="Contact">
                                {customer.contactName}
                            </Descriptions.Item>
                        ) : null}
                        {customer.contactMail ? (
                            <Descriptions.Item label="Mail">
                                <a href={`mailto:${customer.contactMail}`}>
                                    {customer.contactMail}
                                </a>
                            </Descriptions.Item>
                        ) : null}
                        {customer.contactPhone ? (
                            <Descriptions.Item label="Phone">
                                <a href={`tel:${customer.contactPhone}`}>
                                    {customer.contactPhone}
                                </a>
                            </Descriptions.Item>
                        ) : null}
                        {customer.comment ? (
                            <Descriptions.Item label="Comment">
                                {nl2br(customer.comment)}
                            </Descriptions.Item>
                        ) : null}
                    </Descriptions>
                </Col>
            </Row>
            <Row justify="end">
                <Col style={{ marginTop: 30 }}>
                    <Space direction="horizontal" align="end">
                        <Button
                            type="primary"
                            onClick={() => onEditClick(customer)}
                            icon={<EditOutlined />}
                            style={{ marginTop: 0 }}>
                            Edit
                        </Button>
                        <Popconfirm
                            title="Are you sure to delete this customer?"
                            onConfirm={() => onDeleteClick(customer)}>
                            <Button
                                type="primary"
                                icon={<DeleteOutlined />}
                                danger>
                                Delete
                            </Button>
                        </Popconfirm>
                    </Space>
                </Col>
            </Row>
        </>
    );
}

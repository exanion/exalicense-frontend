import {
    PlusOutlined,
    UsergroupAddOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Card,
    Col,
    Empty,
    message,
    Row,
    Typography,
} from "antd";
import React, { useState } from "react";
import CustomerAdd from "./CustomerAdd";
import CustomerItem from "./CustomerItem";

export default function ({ customers }) {
    const [isAdding, setIsAdding] = useState(false);

    if ((!customers || !customers.length) && !isAdding) {
        return (
            <Card style={{ backgroundColor: "#fff" }}>
                <Empty
                    description={
                        <>
                            <Typography.Text>
                                No customers were created
                            </Typography.Text>
                            <br />
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setIsAdding(true)}>
                                New Customer
                            </Button>
                        </>
                    }
                />
            </Card>
        );
    }

    return (
        <>
            <Row>
                <Col>
                    <Typography.Title level={2}>Customers</Typography.Title>
                </Col>
            </Row>
            <Row>
                {customers.map(customer => {
                    return (
                        <Col style={{ padding: 20 }} span={6} key={customer.id}>
                            <Card>
                                <Card.Meta
                                    title={
                                        <>
                                            <Avatar icon={<UserOutlined />} />
                                            &nbsp;&nbsp;
                                            {customer.displayname}
                                        </>
                                    }
                                    description={
                                        <CustomerItem customer={customer} />
                                    }
                                />
                            </Card>
                        </Col>
                    );
                })}
                <Col
                    style={{ padding: 20, height: "100%" }}
                    span={6}
                    key="newbox">
                    <Card>
                        {isAdding ? (
                            <Card.Meta
                                title={
                                    <>
                                        <Avatar icon={<PlusOutlined />} />
                                        &nbsp;&nbsp;New Customer
                                    </>
                                }
                                description={
                                    <CustomerAdd
                                        onCancel={() => setIsAdding(false)}
                                        onSaveFailed={e => {
                                            message.error(
                                                "Couldn't create new customer!"
                                            );
                                        }}
                                        onSaveSuccess={() => {
                                            message.success(
                                                "Customer created successfully!"
                                            );
                                            setIsAdding(false);
                                        }}
                                    />
                                }
                            />
                        ) : (
                            <Empty
                                description={
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={() => setIsAdding(true)}>
                                        New Customer
                                    </Button>
                                }
                                image={
                                    <UsergroupAddOutlined
                                        style={{ fontSize: "60px" }}
                                    />
                                }
                            />
                        )}
                    </Card>
                </Col>
            </Row>
        </>
    );
}

import React, { useState } from "react";
import { Card, List, Empty, Typography, Row, Col, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import LicenseItem from "./LicenseItem";
import LicenseAdd from "./LicenseAdd";

export default function ({ licenses }) {
    //"create new license" view is shown
    const [isAdding, setIsAdding] = useState(false);

    if ((!licenses || !licenses.length) && !isAdding) {
        return (
            <Card style={{ backgroundColor: "#fff" }}>
                <Empty
                    description={
                        <>
                            <Typography.Text>
                                No license keys were created
                            </Typography.Text>
                            <br />
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setIsAdding(true)}>
                                New License
                            </Button>
                        </>
                    }
                />
            </Card>
        );
    }

    return (
        <List
            bordered
            header={
                <>
                    <Typography.Title level={2}>Licenses</Typography.Title>
                </>
            }
            dataSource={["add"].concat(licenses)}
            renderItem={license => {
                if (license === "add") {
                    if (isAdding) {
                        return (
                            <List.Item style={{borderWidth: 5, borderStyle: "solid", borderColor: "green"}}>
                                <LicenseAdd
                                    onCancel={() => setIsAdding(false)}
                                    onSaveFailed={(e) => {
                                        message.error("Couldn't create new license!");
                                    }}
                                    onSaveSuccess={() => {
                                        message.success("License created successfully!");
                                        setIsAdding(false);
                                    }}
                                />
                            </List.Item>
                        );
                    }
                    return (
                        <List.Item>
                            <Row style={{ width: "100%" }} justify="end">
                                <Col>
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={() => setIsAdding(true)}>
                                        New License
                                    </Button>
                                </Col>
                            </Row>
                        </List.Item>
                    );
                }
                return (
                    <List.Item>
                        <LicenseItem license={license} />
                    </List.Item>
                );
            }}
        />
    );
}

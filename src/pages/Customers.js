import { ReloadOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import { Alert, Button, Col, Row, Space, Spin } from "antd";
import React from "react";
import Queries from "../Queries";
import CustomerList from "../components/Customer/CustomerList";

export default function (props) {
    const { loading, data, refetch } = useQuery(Queries.CUSTOMERS_GET);
    const customers = (data || {}).customers || [];

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Alert
                type="info"
                showIcon
                message="About Customers"
                description="Use this menu to update and create customer contacts"
            />
            <Row justify="end">
                <Col>
                    <Button
                        type="primary"
                        size="large"
                        icon={<ReloadOutlined />}
                        loading={loading}
                        onClick={() => refetch()}>
                        Reload
                    </Button>
                </Col>
            </Row>
            <Spin spinning={loading} style={{ width: "100%" }}>
                <CustomerList customers={customers} />
            </Spin>
        </Space>
    );
}

import { ReloadOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import { Alert, Button, Col, Row, Space, Spin } from "antd";
import React from "react";
import ProductList from "../components/Products/ProductList";
import Queries from "../Queries";

export default function Products(props) {
    const { loading, data, refetch } = useQuery(Queries.PRODUCTS_GET);
    const products = (data || {}).products || [];

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Alert
                type="info"
                showIcon
                message="About Products"
                description={
                    <ul>
                        <li>
                            Define on or more products here. Licenses (and
                            leases) will be created for one or more features of
                            your product
                        </li>
                        <li>
                            In order to create licenses for your product, it has
                            to have at least one feature
                        </li>
                    </ul>
                }
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
                <ProductList products={products} />
            </Spin>
        </Space>
    );
}

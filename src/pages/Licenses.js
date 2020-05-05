import { ReloadOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/react-hooks";
import { Alert, Button, Col, Row, Space, Spin } from "antd";
import React from "react";
import LicenseList from "../components/License/LicenseList";
import Queries from "../Queries";

export default function (props) {
    const { loading, data, refetch } = useQuery(Queries.LICENSES_GET);
    const licenses = (data || {}).licenses || [];

    return (
        <Space direction="vertical" style={{width: "100%"}}>
            <Alert
                type="info"
                showIcon
                message="About Licenses"
                description={
                    <ul>
                        <li>You may create license codes here. You can define alternative license codes referencing the same license. The license keys are intended to be distributed to your customer.</li>
                        <li>A license key is used by the application to obtain a lease. Depending on the implementation, a lease is required to use the application or certain features.</li>
                        <li>A license can have an expiry date. No more leases will be generated after its expiry date</li>
                        <li>A license can have a limit on the concurrent number of available leases. For instance, this might limit the instances your customer is concurrently using of the application</li>
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
                <LicenseList licenses={licenses}></LicenseList>
            </Spin>
        </Space>
    );
}

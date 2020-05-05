import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, Space, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import LeaseDisplayModal from "./LeaseDisplayModal";
import nl2br from 'react-nl2br';

export default function LicenseDisplayComponent({
    license,
    onEditClick,
    onDeleteClick,
}) {
    const [
        licenseForLeasesDetailModal,
        setLicenseForLeasesDetailModal,
    ] = useState(null);

    /**
     * update for re-fetch of lease modal
     * @todo this is incredibly ugly
     * Probably, the leaseModal shall query it's own state for proper updating.
     */
    if(licenseForLeasesDetailModal && JSON.stringify(licenseForLeasesDetailModal) !== JSON.stringify(license))
        setLicenseForLeasesDetailModal(license);

    return (
        <>
            <Row>
                {license.comment ? (
                    <Col span={24}>
                        <b>Comment:</b> {nl2br(license.comment)}
                    </Col>
                ) : null}
                <Col span={4} style={{ padding: 5, overflow: "auto" }}>
                    <b>Key Codes</b>
                    <p>
                        {license.licenseKeys.map(l => (
                            <Tag key={l}>{l}</Tag>
                        ))}
                    </p>
                </Col>
                <Col span={4} style={{ padding: 5, overflow: "auto" }}>
                    <b>Valid for Features</b>
                    <p>
                        {license.features.map(f => (
                            <Tag
                                key={f.id}>{`${f.product.name}.${f.name}`}</Tag>
                        ))}
                    </p>
                </Col>
                <Col span={4} style={{ padding: 5, overflow: "auto" }}>
                    <b>For Customer</b>
                    <p>{license.customer.displayname}</p>
                </Col>
                <Col span={4} style={{ padding: 5 }}>
                    <b>Lease Count Limit</b>
                    <p>
                        {license.leaseCountLimit
                            ? `<= ${license.leaseCountLimit} Leases`
                            : "Unlimited"}{" "}
                        <Tooltip title="Show lease details">
                            <Button
                                type="link"
                                onClick={() =>
                                    setLicenseForLeasesDetailModal(license)
                                }>
                                (
                                {
                                    (license.leases || []).filter(
                                        l => l.isValid
                                    ).length
                                }{" "}
                                in use)
                            </Button>
                        </Tooltip>
                    </p>
                </Col>
                <Col span={4} style={{ padding: 5 }}>
                    <b>Status</b>
                    <p>
                        {!license.isExpired ? (
                            <Tag color="green">Active</Tag>
                        ) : (
                            <Tag color="red">Expired</Tag>
                        )}
                        <br />
                        {license.expiry
                            ? "Expiry: " +
                              new Date(license.expiry).toLocaleString()
                            : "No Expiry"}
                    </p>
                </Col>
                <Col flex="1 1 auto" style={{ paddingLeft: 20 }}>
                    <Space
                        direction="vertical"
                        style={{ width: "100%" }}
                        align="end">
                        <Button
                            type="primary"
                            onClick={() => onEditClick(license)}
                            icon={<EditOutlined />}
                            style={{ marginTop: 0 }}>
                            Edit
                        </Button>
                        <Popconfirm
                            title="Are you sure to delete this license and all of its leases?"
                            onConfirm={() => onDeleteClick(license)}>
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
            <LeaseDisplayModal
                license={licenseForLeasesDetailModal}
                onClose={() => setLicenseForLeasesDetailModal(null)}
            />
        </>
    );
}

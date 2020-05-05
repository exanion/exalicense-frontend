import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Input } from "antd";
import React, { useState } from "react";
import CustomerSelect from "../CustomerSelect";
import FeaturesSelect from "../FeaturesSelect";
import LeaseCountLimitInput from "../LeaseCountLimitInput";
import LicenseExpiryPicker from "../LicenseExpiryPicker";
import EditableTagGroup from "../EditableTagGroup";

export default function LicenseEditComponent({
    license,
    onSave,
    onCancel,
    style,
}) {
    const [comment, setComment] = useState(license.comment);
    const [keys, setKeys] = useState(license.licenseKeys);
    const [features, setFeatures] = useState(license.features.map(f => f.id));
    const [customer, setCustomer] = useState(license.customer.id);
    const [leaseCountLimit, setLeaseCountLimit] = useState(
        license.leaseCountLimit
    );
    const [expiry, setExpiry] = useState(license.expiry);

    //craft the editedLicense out of the state objects
    const deriveEditedLicense = () => {
        let editedLicense = {};
        if ((license || {}).id) editedLicense.id = license.id;
        editedLicense.comment = comment;
        editedLicense.licenseKeys = keys.map(k => k.toString().trim());
        editedLicense.features = features;
        editedLicense.customer = customer;
        editedLicense.leaseCountLimit = leaseCountLimit;
        editedLicense.expiry = expiry;
        return editedLicense;
    };

    return (
        <Row style={style}>
            <Col span={24} style={{marginBottom: "8px"}}>
                <b>Comment:</b>
                <Input.TextArea
                    defaultValue={license.comment}
                    onChange={v => setComment(v.target.value)}
                />
            </Col>
            <Col span={4} style={{ padding: 5, overflow: "auto" }}>
                <b>Key Codes (one per line)</b>
                <EditableTagGroup
                    initialValues={license.licenseKeys}
                    onChange={e => setKeys(e)}
                />
            </Col>
            <Col span={4} style={{ padding: 5, overflow: "auto" }}>
                <b>Licensed Features</b>
                <FeaturesSelect
                    initialFeatures={license.features.map(f => f.id)}
                    onChange={v => setFeatures(v)}
                />
            </Col>
            <Col span={4} style={{ padding: 5, overflow: "auto" }}>
                <b>Customer</b>
                <CustomerSelect
                    initialCustomer={license.customer.id}
                    onChange={v => setCustomer(v)}
                />
            </Col>
            <Col span={4} style={{ padding: 5 }}>
                <b>Lease Count Limit</b>
                <LeaseCountLimitInput
                    initialLimit={license.leaseCountLimit}
                    onChange={v => setLeaseCountLimit(v)}
                />
            </Col>
            <Col span={4} style={{ padding: 5 }}>
                <b>Expiry</b>
                <LicenseExpiryPicker
                    initialExpiry={license.expiry}
                    onChange={v => setExpiry(v)}
                />
            </Col>
            <Col flex="1 1 auto" style={{ paddingLeft: 20 }}>
                <Space
                    direction="vertical"
                    style={{ width: "100%" }}
                    align="end">
                    <Button
                        icon={<CheckOutlined />}
                        style={{ marginTop: 0 }}
                        onClick={() => {
                            if (onSave) onSave(deriveEditedLicense());
                        }}>
                        Save
                    </Button>
                    <Button icon={<CloseOutlined />} onClick={onCancel}>
                        Cancel
                    </Button>
                </Space>
            </Col>
        </Row>
    );
}

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Col, Row, Space, Descriptions, Input } from "antd";
import React, { useState } from "react";

export default function CustomerEditComponent({
    customer,
    onSave,
    onCancel,
    style,
}) {
    const [displayname, setDisplayname] = useState(customer.displayname);
    const [contactName, setContactName] = useState(customer.contactName);
    const [contactMail, setContactMail] = useState(customer.contactMail);
    const [contactPhone, setContactPhone] = useState(customer.contactPhone);
    const [comment, setComment] = useState(customer.comment);

    const deriveEditedCustomer = () => {
        let c = {};
        if ((customer || {}).id) c.id = customer.id;
        c.displayname = displayname;
        c.contactName = contactName;
        c.contactMail = contactMail;
        c.contactPhone = contactPhone;
        c.comment = comment;
        return c;
    };

    return (
        <>
            <Row>
                <Col>
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Name">
                            <Input
                                defaultValue={customer.displayname}
                                placeholder="Name"
                                onChange={v => setDisplayname(v.target.value)}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Contact">
                            <Input
                                defaultValue={customer.contactName}
                                placeholder="Contact Name"
                                onChange={v => setContactName(v.target.value)}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Mail">
                            <Input
                                defaultValue={customer.contactMail}
                                placeholder="Contact Mail"
                                onChange={v => setContactMail(v.target.value)}
                                type="email"
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone">
                            <Input
                                defaultValue={customer.contactPhone}
                                placeholder="Contact Phone"
                                onChange={v => setContactPhone(v.target.value)}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Comment">
                            <Input.TextArea
                                defaultValue={customer.comment}
                                placeholder="Comment"
                                rows={3}
                                onChange={v => setComment(v.target.value)}
                            />
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
            <Row justify="end">
                <Col style={{ marginTop: 30 }}>
                    <Space direction="horizontal" align="end">
                        <Button
                            icon={<CheckOutlined />}
                            style={{ marginTop: 0 }}
                            onClick={() => {
                                if (onSave) onSave(deriveEditedCustomer());
                            }}>
                            Save
                        </Button>
                        <Button icon={<CloseOutlined />} onClick={onCancel}>
                            Cancel
                        </Button>
                    </Space>
                </Col>
            </Row>
        </>
    );
}

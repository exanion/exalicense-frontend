import React from "react";
import { Modal, Table, Tag, Button, message } from "antd";
import { DisconnectOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import Queries from "../../Queries";

export default function LeaseDisplayModal({ license, onClose }) {
    const [releaseLease, { loading: releaseLeaseLoading }] = useMutation(
        Queries.LEASE_RELEASE,
        {
            refetchQueries: ["licensesGet"],
            awaitRefetchQueries: true,
        }
    );

    const visible = license ? true : false;
    if (!license) license = { licenseKeys: [], leases: [] };

    const columns = [
        {
            title: "Status",
            key: "status",
            dataIndex: "status",
            filters: [
                { text: "Active", value: true },
                { text: "Inactive", value: false },
            ],
            onFilter: (value, record) => record.status.isValid === value,
            render: l => (
                <>
                    <Tag closable={false} color={l.isValid ? "green" : "red"}>
                        {l.isValid ? "Active" : "Inactive"}
                    </Tag>
                    {l.isReleased ? <Tag color="orange">Released</Tag> : null}
                </>
            ),
        },
        { title: "Created At", key: "createdAt", dataIndex: "createdAt" },
        { title: "Expiry", key: "expiry", dataIndex: "expiry" },
        { title: "Client Identifier", key: "clientId", dataIndex: "clientId" },
        {
            title: "Lease Key",
            key: "leaseKey",
            dataIndex: "leaseKey",
            ellipsis: true,
        },
        {
            title: "Actions",
            key: "actions",
            dataIndex: "actions",
            align: "right",
            render: l =>
                l.isValid ? (
                    <Button
                        type="primary"
                        icon={<DisconnectOutlined />}
                        onClick={() =>
                            releaseLease({
                                variables: { isReleased: true, id: l.id },
                            })
                                .then(v =>
                                    message.success(
                                        "Lease deactivated successfully"
                                    )
                                )
                                .catch(e =>
                                    message.error("Couldn't deactive lease")
                                )
                        }>
                        Release
                    </Button>
                ) : null,
        },
    ];
    const mapLeasesToTableData = leases =>
        leases.map(l => ({
            key: l.id,
            status: l,
            createdAt: new Date(l.createdAt).toLocaleString(),
            expiry: new Date(l.expiry).toLocaleString(),
            clientId: l.clientId,
            leaseKey: l.leaseKey,
            actions: l,
        }));

    return (
        <Modal
            title={
                "Leases" +
                ((license.licenseKeys || []).length
                    ? ` for ${license.licenseKeys[0]}`
                    : "")
            }
            width="70%"
            visible={visible}
            onCancel={onClose}
            footer={null}>
            <Table
                bordered
                loading={releaseLeaseLoading}
                columns={columns}
                dataSource={mapLeasesToTableData(license.leases)}
            />
        </Modal>
    );
}

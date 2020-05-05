import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
    Descriptions,
    Typography,
    Spin,
    Input,
    Button,
    Table,
    Space,
    Row,
    Col,
    Tooltip,
    message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Queries from "../Queries";
import DeleteConfirmButton from "../components/DeleteConfirmButton";
import CreateAdminModal from "../components/Settings/CreateAdminModal";
import EditPersonalDetails from "../components/Settings/EditPersonalDetails";
import ChangeOwnPassword from "../components/Settings/ChangeOwnPassword";

export default function Settings() {
    const { data: orgRawData, loading: orgLoading } = useQuery(
        Queries.ORGANIZATION_GET
    );
    const [deleteAdmin] = useMutation(Queries.ADMIN_DELETE, {
        refetchQueries: ["getOrganization"],
        awaitRefetchQueries: true,
    });
    const [addAdmin, { loading: addAdminLoading }] = useMutation(
        Queries.ADMIN_ADD,
        {
            refetchQueries: ["getOrganization"],
            awaitRefetchQueries: true,
        }
    );
    const [isAddingAdmin, setIsAddingAdmin] = useState(false);

    const org = (orgRawData || {}).organization || {};

    const adminCols = [
        { title: "Display Name", dataIndex: "displayname", key: "displayname" },
        { title: "Username", dataIndex: "username", key: "username" },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: x => <a href={`mailto:${x}`}>{x}</a>,
        },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            align: "right",
            render: x =>
                x.isSelf ? null : (
                    <DeleteConfirmButton
                        confirmMessage={`Are you sure to delete "${
                            x.displayname || x.username
                        }"?`}
                        onConfirm={() =>
                            deleteAdmin({ variables: { id: x.id } })
                                .then(v =>
                                    message.success(
                                        "Admin deleted successfully!"
                                    )
                                )
                                .catch(e =>
                                    message.error("Couldn't delete admin")
                                )
                        }
                    />
                ),
        },
    ];
    const mapAdminData = admins =>
        admins.map(a => ({
            key: a.id,
            displayname: a.displayname,
            username: a.username,
            email: a.email,
            actions: a,
        }));

    return (
        <Spin spinning={orgLoading}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Typography.Title level={2}>
                    Organization Details
                </Typography.Title>
                <Descriptions bordered>
                    <Descriptions.Item label="Organization Name">
                        {org.displayname}
                    </Descriptions.Item>
                    <Descriptions.Item label="Licensing Endpoint">
                        <Tooltip title="API endpoint to use in client/ application to check keys, obtain leases etc.">
                            <Input value={org.licensingEndpoint} readOnly />
                        </Tooltip>
                    </Descriptions.Item>
                    <Descriptions.Item label="Signing Key">
                        <Tooltip title="Public key of keypair used for signing leases">
                            <Input.TextArea value={org.signingKey} readOnly />
                        </Tooltip>
                    </Descriptions.Item>
                </Descriptions>
                <Row>
                    <Col span={12} style={{ padding: "8px" }}>
                        <EditPersonalDetails />
                    </Col>
                    <Col span={12} style={{ padding: "8px" }}>
                        <ChangeOwnPassword />
                    </Col>
                </Row>

                <Typography.Title level={2}>Administrators</Typography.Title>
                <CreateAdminModal
                    visible={isAddingAdmin}
                    loading={addAdminLoading}
                    onCancel={() => {
                        setIsAddingAdmin(false);
                    }}
                    onSave={v =>
                        addAdmin({
                            variables: v,
                        })
                            .then(v => {
                                message.success("Admin saved!");
                                setIsAddingAdmin(false);
                            })
                            .catch(e => {
                                message.error("Couldn't save admin!");
                            })
                    }
                />
                <Table
                    bordered
                    columns={adminCols}
                    title={() => (
                        <Row style={{ width: "100%" }} justify="end">
                            <Col>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => setIsAddingAdmin(true)}>
                                    New Administrator
                                </Button>
                            </Col>
                        </Row>
                    )}
                    dataSource={mapAdminData((org || {}).admins || [])}
                />
            </Space>
        </Spin>
    );
}

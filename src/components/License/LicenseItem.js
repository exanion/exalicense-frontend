import { PaperClipOutlined } from "@ant-design/icons";
import { Avatar, Col, List, Row, message, Spin } from "antd";
import React, { useState } from "react";
import LicenseEditComponent from "./LicenseEditComponent";
import LicenseDisplayComponent from "./LicenseDisplayComponent";
import { useMutation } from "@apollo/react-hooks";
import Queries from "../../Queries";

export default function LicenseItem({ license }) {
    const [deleteLic] = useMutation(Queries.LICENSE_DELETE, {
        update(cache, { data: { licenseDelete } }) {
            if (!licenseDelete.success) {
                return;
            }
            const { licenses } = cache.readQuery({
                query: Queries.LICENSES_GET,
            });
            cache.writeQuery({
                query: Queries.LICENSES_GET,
                data: { licenses: licenses.filter(l => l.id !== license.id) },
            });
        },
    });
    const [updateLic, { loading: updateLicLoading }] = useMutation(
        Queries.LICENSE_UPDATE,
        {
            update(cache, { data: { licenseUpdate } }) {
                const { licenses } = cache.readQuery({
                    query: Queries.LICENSES_GET,
                });
                cache.writeQuery({
                    query: Queries.LICENSES_GET,
                    data: {
                        licenses: licenses.map(v => {
                            if (v.id === licenseUpdate.id) {
                                return licenseUpdate;
                            } else {
                                return v;
                            }
                        }),
                    },
                });
            },
        }
    );

    const [editing, setEditing] = useState(false);

    return (
        <List.Item.Meta
            avatar={<Avatar icon={<PaperClipOutlined />} />}
            title={
                <big>
                    <b>
                        {license.licenseKeys[0]
                            ? `Key "${license.licenseKeys[0]}"`
                            : "Unnamed Key"}
                    </b>
                </big>
            }
            description={
                <>
                    {editing ? (
                        <Spin
                            spinning={updateLicLoading}
                            wrapperClassName="width100p">
                            <LicenseEditComponent
                                license={license}
                                onCancel={() => setEditing(false)}
                                onSave={v =>
                                    updateLic({ variables: v })
                                        .then(v => {
                                            message.success("Saved changes");
                                            setEditing(false);
                                        })
                                        .catch(e =>
                                            message.error(
                                                "Couldn't save license changes!"
                                            )
                                        )
                                }
                            />
                        </Spin>
                    ) : (
                        <LicenseDisplayComponent
                            license={license}
                            onEditClick={() => setEditing(true)}
                            onDeleteClick={() =>
                                deleteLic({ variables: { id: license.id } })
                                    .then(v =>
                                        message.success(
                                            "License deleted successfully"
                                        )
                                    )
                                    .catch(e =>
                                        message.error("Couldn't delete license")
                                    )
                            }
                        />
                    )}
                    <Row justify="end">
                        <Col style={{ textAlign: "right" }}>
                            <p style={{ lineHeight: 1.1 }}>
                                <small>
                                    Created At:&nbsp;
                                    {new Date(
                                        license.createdAt
                                    ).toLocaleString()}
                                    <br />
                                    Last Update:&nbsp;
                                    {new Date(
                                        license.updatedAt
                                    ).toLocaleString()}
                                </small>
                            </p>
                        </Col>
                    </Row>
                </>
            }
        />
    );
}

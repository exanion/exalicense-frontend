import { PlusOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { Avatar, List, Row, Spin } from "antd";
import React from "react";
import Queries from "../../Queries";
import LicenseEditComponent from "./LicenseEditComponent";

export default function LicenseAdd({ onCancel, onSaveFailed, onSaveSuccess }) {
    const [create, { loading }] = useMutation(Queries.LICENSE_ADD, {
        update(cache, { data: { licenseCreate } }) {
            const { licenses } = cache.readQuery({
                query: Queries.LICENSES_GET,
            });
            cache.writeQuery({
                query: Queries.LICENSES_GET,
                data: { licenses: licenses.concat([licenseCreate.license]) },
            });
        },
    });

    const emptyLicense = {
        customer: {},
        features: [],
        licenseKeys: [],
    };

    return (
        <Spin spinning={loading} wrapperClassName="width100p">
            <List.Item.Meta
                avatar={<Avatar icon={<PlusOutlined />} />}
                title={
                    <big>
                        <b>New License</b>
                    </big>
                }
                description={
                    <>
                        <LicenseEditComponent
                            license={emptyLicense}
                            onCancel={onCancel}
                            onSave={l =>{
                                console.log(l);
                                create({
                                    variables: l,
                                })
                                    .then(v => {
                                        if (
                                            onSaveSuccess &&
                                            ((v.data || {}).licenseCreate || {})
                                                .success
                                        )
                                            onSaveSuccess(
                                                v.data.licenseCreate.license
                                            );
                                    })
                                    .catch(e => {
                                        if (onSaveFailed) onSaveFailed(e);
                                    });}
                            }
                        />
                        <Row></Row>
                    </>
                }
            />
        </Spin>
    );
}

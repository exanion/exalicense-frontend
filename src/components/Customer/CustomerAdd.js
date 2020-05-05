import { useMutation } from "@apollo/react-hooks";
import { Spin } from "antd";
import React from "react";
import Queries from "../../Queries";
import CustomerEditComponent from "./CustomerEditComponent";

export default function CustomerAdd({ onCancel, onSaveFailed, onSaveSuccess }) {
    const [create, { loading }] = useMutation(Queries.CUSTOMER_ADD, {
        update(cache, { data: { customerCreate } }) {
            const { customers } = cache.readQuery({
                query: Queries.CUSTOMERS_GET,
            });
            cache.writeQuery({
                query: Queries.CUSTOMERS_GET,
                data: {
                    customers: customers.concat([customerCreate.customer]),
                },
            });
        },
    });

    return (
        <Spin spinning={loading} wrapperClassName="width100p">
            <CustomerEditComponent
                onCancel={onCancel}
                customer={{}}
                onSave={l => {
                    create({
                        variables: l,
                    })
                        .then(v => {
                            if (
                                onSaveSuccess &&
                                ((v.data || {}).customerCreate || {}).success
                            )
                                onSaveSuccess(v.data.customerCreate.customer);
                        })
                        .catch(e => {
                            if (onSaveFailed) onSaveFailed(e);
                        });
                }}
            />
        </Spin>
    );
}

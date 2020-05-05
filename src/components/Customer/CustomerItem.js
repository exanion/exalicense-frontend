import { Col, Row, message, Spin } from "antd";
import React, { useState } from "react";
//import LicenseEditComponent from "./LicenseEditComponent";
import CustomerDisplayComponent from "./CustomerDisplayComponent";
import { useMutation } from "@apollo/react-hooks";
import Queries from "../../Queries";
import CustomerEditComponent from "./CustomerEditComponent";

export default function CustomerItem({ customer }) {
    const [deleteCustomer] = useMutation(Queries.CUSTOMER_DELETE, {
        update(cache, { data: { customerDelete } }) {
            if (!customerDelete.success) {
                return;
            }
            const { customers } = cache.readQuery({
                query: Queries.CUSTOMERS_GET,
            });
            cache.writeQuery({
                query: Queries.CUSTOMERS_GET,
                data: {
                    customers: customers.filter(l => l.id !== customer.id),
                },
            });
        },
    });
    const [updateCustomer, { loading: updateCustomerLoading }] = useMutation(
        Queries.CUSTOMER_UPDATE,
        {
            update(cache, { data: { customerUpdate } }) {
                const { customers } = cache.readQuery({
                    query: Queries.CUSTOMERS_GET,
                });
                cache.writeQuery({
                    query: Queries.CUSTOMERS_GET,
                    data: {
                        customers: customers.map(v => {
                            if (v.id === customerUpdate.id) {
                                return customerUpdate;
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
        <>
            {editing ? (
                <Spin
                    spinning={updateCustomerLoading}
                    wrapperClassName="width100p">
                    <CustomerEditComponent
                        customer={customer}
                        onCancel={() => setEditing(false)}
                        onSave={v =>
                            updateCustomer({ variables: v })
                                .then(v => {
                                    message.success("Saved changes");
                                    setEditing(false);
                                })
                                .catch(e =>
                                    message.error(
                                        "Couldn't save customer changes: " +
                                            e.message
                                    )
                                )
                        }
                    />
                </Spin>
            ) : (
                <CustomerDisplayComponent
                    customer={customer}
                    onEditClick={() => setEditing(true)}
                    onDeleteClick={() =>
                        deleteCustomer({ variables: { id: customer.id } })
                            .then(({ data: { customerDelete } }) => {
                                if (!customerDelete.success) {
                                    throw new Error(customerDelete.message);
                                } else {
                                    message.success(
                                        "Customer deleted successfully"
                                    );
                                }
                            })
                            .catch(e =>
                                message.error(
                                    "Couldn't delete customer: " + e.message
                                )
                            )
                    }
                />
            )}
            <Row justify="end">
                <Col style={{ textAlign: "right", marginTop: 10 }}>
                    <p style={{ lineHeight: 1.1 }}>
                        <small>
                            Created At:&nbsp;
                            {new Date(customer.createdAt).toLocaleString()}
                            <br />
                            Last Update:&nbsp;
                            {new Date(customer.updatedAt).toLocaleString()}
                        </small>
                    </p>
                </Col>
            </Row>
        </>
    );
}

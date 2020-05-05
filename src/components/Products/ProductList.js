import React, { useState } from "react";
import { Table, Button, Space, message, Row, Col } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import DeleteConfirmButton from "../DeleteConfirmButton";
import Queries from "../../Queries";
import { useMutation } from "@apollo/react-hooks";
import ProductCreateEditDialog from "./ProductCreateEditDialog";
import FeatureCreateEditDialog from "./FeatureCreateEditDialog";

export default function ProductList({ products }) {
    const [deleteFeature] = useMutation(Queries.FEATURE_DELETE, {
        refetchQueries: ["productsGet", "productsSimple"],
        awaitRefetchQueries: true,
    });
    const [deleteProduct] = useMutation(Queries.PRODUCT_DELETE, {
        refetchQueries: ["productsGet", "productsSimple"],
        awaitRefetchQueries: true,
    });
    const [productEditDialog, setProductEditDialog] = useState(null);
    const [featureEditDialog, setFeatureEditDialog] = useState(null);

    const tableColumns = [
        { title: "Description", dataIndex: "displayname", key: "displayname" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Licenses", dataIndex: "licenses", key: "licenses" },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            align: "right",
        },
    ];

    const tableData = products.map(p => ({
        key: p.id,
        displayname: p.displayname ? p.displayname : p.name,
        name: p.name,
        actions: (
            <Space direction="horizontal">
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setFeatureEditDialog({ product: p })}>
                    Feature
                </Button>
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => setProductEditDialog(p)}
                />
                <DeleteConfirmButton
                    confirmMessage="Are you sure to delete this product?"
                    onConfirm={() =>
                        deleteProduct({ variables: { id: p.id } })
                            .then(v =>
                                message.success("Product deleted successfully")
                            )
                            .catch(e =>
                                message.error("Couldn't delete product")
                            )
                    }
                />
            </Space>
        ),
        children: p.features.map(f => ({
            key: f.id,
            displayname: f.displayname ? f.displayname : f.name,
            name: f.name,
            licenses: `${f.licenses.length} Licenses Created`,
            actions: (
                <Space direction="horizontal">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => setFeatureEditDialog(f)}
                    />
                    <DeleteConfirmButton
                        confirmMessage="Are you sure to delete this feature?"
                        onConfirm={() =>
                            deleteFeature({ variables: { id: f.id } })
                                .then(v =>
                                    message.success(
                                        "Feature deleted successfully"
                                    )
                                )
                                .catch(e =>
                                    message.error("Couldn't delete feature")
                                )
                        }
                    />
                </Space>
            ),
        })),
    }));

    return (
        <>
            {productEditDialog ? (
                <ProductCreateEditDialog
                    product={
                        productEditDialog === "new" ? null : productEditDialog
                    }
                    onDone={() => setProductEditDialog(null)}
                />
            ) : null}
            {featureEditDialog ? (
                <FeatureCreateEditDialog
                    feature={featureEditDialog}
                    onDone={() => setFeatureEditDialog(null)}
                />
            ) : null}
            <Table
                columns={tableColumns}
                dataSource={tableData}
                bordered
                title={() => (
                    <Row style={{ width: "100%" }} justify="end">
                        <Col>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => setProductEditDialog("new")}>
                                New Product
                            </Button>
                        </Col>
                    </Row>
                )}
            />
        </>
    );
}

import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import NameDisplaynameEditModal from "./NameDisplaynameEditModal";
import Queries from "../../Queries";
import { message } from "antd";

export default function ProductCreateEditDialog({ product, onDone }) {
    const [modalVisible, setModalVisible] = useState(true);
    const [createProduct, { loading: createLoading }] = useMutation(
        Queries.PRODUCT_ADD,
        {
            refetchQueries: ["productsGet", "productsSimple"],
            awaitRefetchQueries: true,
        }
    );
    const [updateProduct, { loading: updateLoading }] = useMutation(
        Queries.PRODUCT_UPDATE,
        {
            refetchQueries: ["productsGet", "productsSimple"],
            awaitRefetchQueries: true,
        }
    );

    const doCreate = product ? false : true;
    onDone = onDone ? onDone : () => null;

    return (
        <NameDisplaynameEditModal
            title={doCreate ? "Create new product" : "Edit product"}
            visible={modalVisible}
            loading={createLoading || updateLoading}
            onCancel={() => {
                setModalVisible(false);
                onDone();
            }}
            onSave={v =>
                ((product || {}).id
                    ? updateProduct({ variables: { id: product.id, ...v } })
                    : createProduct({ variables: v })
                )
                    .then(v => {
                        onDone();
                        message.success("Product saved!");
                    })
                    .catch(e => {
                        message.error("Couldn't save product!");
                    })
            }
            defaultName={(product || {}).name}
            defaultDisplayname={(product || {}).displayname}
        />
    );
}

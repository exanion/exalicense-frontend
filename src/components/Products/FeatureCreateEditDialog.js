import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import NameDisplaynameEditModal from "./NameDisplaynameEditModal";
import Queries from "../../Queries";
import { message } from "antd";

export default function FetureCreateEditDialog({ feature, onDone }) {
    const [modalVisible, setModalVisible] = useState(true);
    const [createFeature, { loading: createLoading }] = useMutation(
        Queries.FEATURE_ADD,
        {
            refetchQueries: ["productsGet", "productsSimple"],
            awaitRefetchQueries: true,
        }
    );
    const [updateFeature, { loading: updateLoading }] = useMutation(
        Queries.FEATURE_UPDATE,
        {
            refetchQueries: ["productsGet", "productsSimple"],
            awaitRefetchQueries: true,
        }
    );

    const doCreate = (feature || {}).id ? false : true;
    onDone = onDone ? onDone : () => null;

    return (
        <NameDisplaynameEditModal
            title={doCreate ? "Create new feature" : "Edit feature"}
            visible={modalVisible}
            loading={createLoading || updateLoading}
            onCancel={() => {
                setModalVisible(false);
                onDone();
            }}
            onSave={v =>
                ((feature || {}).id
                    ? updateFeature({
                          variables: {
                              id: feature.id,
                              ...v,
                          },
                      })
                    : createFeature({
                          variables: { product: feature.product.id, ...v },
                      })
                )
                    .then(v => {
                        onDone();
                        message.success("Feature saved!");
                    })
                    .catch(e => {
                        message.error("Couldn't save feature!");
                    })
            }
            defaultName={(feature || {}).name}
            defaultDisplayname={(feature || {}).displayname}
        />
    );
}

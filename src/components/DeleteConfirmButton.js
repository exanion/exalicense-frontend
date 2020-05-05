import React from "react";
import { Popconfirm, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function DeleteConfirmButton({
    onConfirm,
    onCancel,
    confirmMessage,
    icon,
    children,
}) {
    return (
        <Popconfirm
            title={confirmMessage ? confirmMessage : "Are you sure?"}
            onConfirm={onConfirm}
            onCancel={onCancel}>
            <Button
                type="primary"
                icon={icon ? icon : <DeleteOutlined />}
                danger>
                {children}
            </Button>
        </Popconfirm>
    );
}

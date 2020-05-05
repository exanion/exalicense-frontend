import { InputNumber, Switch } from "antd";
import React, { useState } from "react";

export default function CustomerSelect({ onChange, initialLimit }) {
    const [limit, setLimit] = useState(initialLimit);
    return (
        <div style={{ width: "100%" }}>
            <Switch
                defaultChecked={limit ? true : false}
                onChange={c => {
                    let newLimit = null;
                    if (c) {
                        newLimit = initialLimit ? initialLimit : 20;
                    }
                    setLimit(newLimit);
                    if (onChange) onChange(newLimit);
                }}
            />
            &nbsp;&nbsp;Enable Limit
            {limit ? (
                <>
                    <br />
                    <InputNumber
                        defaultValue={limit}
                        min={1}
                        style={{ width: "100%", marginTop: 5 }}
                        onChange={v => {
                            v = parseInt(v);
                            setLimit(v);
                            if (onChange) onChange(v);
                        }}
                    />
                </>
            ) : null}
        </div>
    );
}

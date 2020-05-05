import { DatePicker, Switch } from "antd";
import React, { useState } from "react";
import moment from "moment";

export default function LicenseExpiryPicker({ onChange, initialExpiry }) {
    const [expiry, setExpiry] = useState(initialExpiry);

    const changeExpiry = e => {
        setExpiry(e);
        if (onChange) onChange(e);
    };

    return (
        <div style={{ width: "100%" }}>
            <Switch
                defaultChecked={expiry ? true : false}
                checked={expiry ? true : false}
                onChange={c => {
                    if (c)
                        changeExpiry(
                            initialExpiry ? initialExpiry : new Date()
                        );
                    else changeExpiry(null);
                }}
            />
            &nbsp;&nbsp;Enable Expiry
            {expiry ? (
                <>
                    <br />
                    <DatePicker
                        style={{ width: "100%", marginTop: 5 }}
                        defaultValue={moment(expiry)}
                        showTime
                        onChange={v => {
                            changeExpiry(v ? v:null);
                        }}
                        onOk={v => changeExpiry(v.toDate())}
                    />
                </>
            ) : null}
        </div>
    );
}

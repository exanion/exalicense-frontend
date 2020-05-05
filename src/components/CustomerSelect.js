import { useQuery } from "@apollo/react-hooks";
import { Select, Spin } from "antd";
import React from "react";
import Queries from "../Queries";

export default function CustomerSelect({ onChange, initialCustomer }) {
    const { loading, data } = useQuery(Queries.CUSTOMERS_SIMPLE);

    const customers = (data || {}).customers || [];

    return (
        <Spin spinning={loading}>
            <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a customer"
                optionFilterProp="children"
                defaultValue={initialCustomer}
                onChange={onChange}
                filterOption={(input, option) =>
                    option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                }>
                {customers.map(c => (
                    <Select.Option key={c.id} value={c.id} title={c.comment}>
                        {c.displayname}
                    </Select.Option>
                ))}
            </Select>
        </Spin>
    );
}

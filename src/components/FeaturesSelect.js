import { useQuery } from "@apollo/react-hooks";
import { Spin, TreeSelect } from "antd";
import React, { useState } from "react";
import Queries from "../Queries";

function FeaturesPickerComponent({
    defaultValue,
    value,
    onChange,
    products = [],
    loading = false,
}) {
    const treeData = products.map(p => {
        return {
            title: p.name,
            value: `prod_${p.id}`,
            children: p.features.map(f => {
                return {
                    title: `${p.name}.${f.name}`,
                    value: f.id,
                };
            }),
        };
    });

    return (
        <Spin spinning={loading}>
            <TreeSelect
                style={{ width: "100%" }}
                value={value}
                onChange={onChange}
                treeCheckable={true}
                disabled={loading}
                defaultValue={defaultValue}
                treeData={treeData}
            />
        </Spin>
    );
}

export default function FeaturesSelect({ onChange, initialFeatures }) {
    const [features, setFeatures] = useState(initialFeatures || []);
    const {
        loading: productsLoading,
        data: rawProducts,
    } = useQuery(Queries.PRODUCTS_SIMPLE);

    const products = (rawProducts || {}).products || [];

    return (
        <FeaturesPickerComponent
            defaultValue={initialFeatures}
            loading={productsLoading}
            products={products}
            onChange={v => {
                setFeatures(v);
                onChange(v);
            }}
            value={features}
        />
    );
}

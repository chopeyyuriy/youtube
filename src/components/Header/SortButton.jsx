import React from "react";
import { Button } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

export const SortButton = ({ title, options, activeOption, onChangeActiveSort }) => {

    const handleChangeOption = () => {
        onChangeActiveSort(activeOption === options.down ? options.up : options.down)
    }
    return (
        <Button
            type="default"
            onClick={handleChangeOption}
            style={{ marginRight: '10px' }}
        >
            {title}
            {
                (options.down === activeOption || options.up === activeOption) &&
                <>
                    {options.down === activeOption ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                </>
            }
        </Button>
    )
}
import React, { useState } from "react";
import styled from "styled-components";
import { SettingOutlined } from '@ant-design/icons';
import { Modal } from "antd";
import useGettingCategories from "../../hooks/categories/useGettingCategories";
import useToggleMainPageCategory from "../../hooks/categories/useToggleMainPageCategory";
import { Checkbox } from "./Checkbox";

export const Settings = () => {
    const { categories } = useGettingCategories();
    const [modal, setModal] = useState(false);

    const handleToggleModal = (value) => setModal(value);


    return (
        <>
            <Modal
                title="Редагування показу категорій на головній сторінці"
                visible={modal}
                onCancel={() => handleToggleModal(false)}
                destroyOnClose
                footer={null}
            >
                <div>
                    {
                        categories?.length > 0 &&
                        categories.map((category, i) => (
                            <Checkbox category={category} key={i} />
                        ))
                    }
                </div>
            </Modal>
            <StyledSetting>
                <SettingOutlined onClick={() => handleToggleModal(true)} />
            </StyledSetting>
        </>
    )
}

const StyledSetting = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 20px;
    cursor: pointer;
`;

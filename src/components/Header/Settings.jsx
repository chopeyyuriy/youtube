import React, { useState } from "react";
import styled from "styled-components";
import { SettingOutlined } from '@ant-design/icons';
import { Checkbox, Modal } from "antd";
import useGettingCategories from "../../hooks/categories/useGettingCategories";
import useToggleMainPageCategory from "../../hooks/categories/useToggleMainPageCategory";

export const Settings = () => {
    const { categories } = useGettingCategories();
    const { toggleMainPageCategory } = useToggleMainPageCategory();
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
                            <StyledCategory 
                            key={i} 
                            className="category"
                            onClick={() => toggleMainPageCategory({id: category.id})}
                            >
                                <Checkbox defaultChecked={category?.main_page === '1'} />
                                <span className="category-title">{category?.name}</span>
                            </StyledCategory>
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

const StyledCategory = styled.div`
   display: flex;
   align-items: center;
   font-size: 15px;
   .category-title {
       margin-left: 10px;
   }
`;
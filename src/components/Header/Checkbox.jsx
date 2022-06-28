import React from "react";
import styled from "styled-components";
import { Checkbox as CheckboxComponent } from "antd";
import useToggleMainPageCategory from "../../hooks/categories/useToggleMainPageCategory";
import { useState } from "react";

export const Checkbox = ({category}) => {
  const [checked, setChecked] = useState(category?.main_page === '1');
  const { toggleMainPageCategory } = useToggleMainPageCategory();

  const handleCheck = async () => {
    const resp = await toggleMainPageCategory({id: category.id});
    setChecked(resp?.data?.status?.status === "activated")
  }
  
  return (
    <StyledCheckbox 
    className="category"
    onClick={handleCheck}
    >
        <CheckboxComponent checked={checked}/>
        <span className="category-title">{category?.name}</span>
    </StyledCheckbox>
  )
}

const StyledCheckbox = styled.div`
   display: flex;
   align-items: center;
   font-size: 15px;
   .category-title {
       margin-left: 10px;
   }
`;
import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import useCreatingCategory from "../../hooks/categories/useAddCategory";

export const CreatePlaylist = () => {
    const [create, setCreate] = useState(false);
    const [createInput, setCreateInput] = useState('');
    const [creating, setCreating] = useState(false);
    const [createInputError, setCreateInputError] = useState(false);
    const { createCategory } = useCreatingCategory();

    const handleCloseCreating = () => {
        setCreate(false);
        setCreateInput('');
    }
    const handleCreateItem = async () => {
        if (createInput.length > 0) {
            setCreating(true);
            setCreateInputError(false)
            const resp = await createCategory({ name: createInput });
            if(resp) {
                setCreating(false);
                handleCloseCreating();
            }
        } else {
            setCreateInputError(true)
        }
    }

    return (
        <StyledCreatePlaylist>
            {
                create ?
                    <>
                        <Input
                            className="sidebar-create-item-input"
                            value={createInput}
                            onChange={e => setCreateInput(e.target.value)}
                            status={createInputError && 'error'}
                        />

                        {
                            creating
                                ? <Button
                                    type="loading"
                                    className="sidebar-create-item-botton"
                                    loading
                                />
                                : <>
                                    <Button
                                        type="primary"
                                        icon={<CheckOutlined />}
                                        className="sidebar-create-item-botton"
                                        onClick={handleCreateItem}

                                    />
                                    <Button
                                        type="danger"
                                        icon={<CloseOutlined />}
                                        className="sidebar-create-item-botton"
                                        onClick={handleCloseCreating}
                                    />
                                </>
                        }
                    </>
                    : <Button
                        type="primary"
                        block
                        onClick={() => setCreate(true)}
                    >
                        Нова категорія
                    </Button>
            }
        </StyledCreatePlaylist>
    )
}


const StyledCreatePlaylist = styled.div`
    display: flex;
    margin: 10px;
    button {
        flex-shrink: 0;
        border-radius: 0;
        &:last-child {
            border-radius: 0 2px 2px 0;
        }
    }
`;
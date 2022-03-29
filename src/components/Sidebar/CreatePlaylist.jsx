import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input } from "antd";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

export const CreatePlaylist = ({ onCreate }) => {
    const [creating, setCreating] = useState(false);
    const [createInput, setCreateInput] = useState('');
    const [createInputError, setCreateInputError] = useState(false);

    const handleCloseCreating = () => {
        setCreating(false);
        setCreateInput('');
    }
    const handleCreateItem = () => {
        if (createInput.length > 0) {
            setCreateInputError(false)
            onCreate({ label: createInput })
            handleCloseCreating();
        } else {
            setCreateInputError(true)
        }
    }

    return (
        <StyledCreatePlaylist>
            {
                creating ?
                    <>
                        <Input
                            className="sidebar-create-item-input"
                            value={createInput}
                            onChange={e => setCreateInput(e.target.value)}
                            status={createInputError && 'error'}
                        />

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
                    : <Button
                        type="primary"
                        block
                        onClick={() => setCreating(true)}
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
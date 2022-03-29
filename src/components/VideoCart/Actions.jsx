import { Button, Popconfirm, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CopyOutlined, CheckOutlined, CaretRightOutlined, DeleteOutlined } from '@ant-design/icons';
import useRemoveVideo from "../../hooks/videos/useRemoveVideo";

export const Actions = ({
    visible,
    onSelectVideo,
    videoId,
    link,
    index
}) => {
    const [copy, setCopy] = useState(false);
    const [remove, setRemove] = useState(false);
    const [removeLabel, setRemoveLabel] = useState(false);
    const { removeVideo } = useRemoveVideo();

    const handleCopyLink = () => {
        const videoLink = document.createElement("input");
        videoLink.value = `https://www.youtube.com/watch?v=${link}`;
        document.body.appendChild(videoLink);
        videoLink.select();
        document.execCommand("copy");
        document.body.removeChild(videoLink);
        setCopy(true);
    }

    const handlePlayVideo = () => {
        onSelectVideo(link)
    }

    const handleRemove = () => {
        removeVideo(videoId);
        setRemove(false);
    }

    useEffect(() => {
        if (visible) {
            setCopy(false);
        } else {
            setRemove(false);
        }
    }, [visible])

    return (
        <StyledActions visible={visible}>
            <Tooltip
                title={copy ? 'Силку скопійовано' : 'Скопіювати силку'}
                color={copy && 'green'}
            >
                <Button
                    shape="circle"
                    onClick={handleCopyLink}
                    color="green"
                >
                    {copy ? <CheckOutlined /> : <CopyOutlined />}
                </Button>
            </Tooltip>
            <Tooltip title="Перегляд відео">
                <Button
                    shape="circle"
                    onClick={() => handlePlayVideo(videoId)}
                >
                    <CaretRightOutlined />
                </Button>
            </Tooltip>
            <Tooltip title="Видалити" color="red" visible={!remove && removeLabel}>
                <Popconfirm
                    title="Ви точно хочете видалити відео?"
                    onConfirm={handleRemove}
                    onCancel={() => setRemove(false)}
                    okText="Так"
                    cancelText="Ні"
                    visible={remove}
                >
                    <Button
                        shape="circle"
                        onClick={() => setRemove(true)}
                        onMouseEnter={() => setRemoveLabel(true)}
                        onMouseLeave={() => setRemoveLabel(false)}
                    >
                        <DeleteOutlined />
                    </Button>
                </Popconfirm>
            </Tooltip>
        </StyledActions>
    )
}

const StyledActions = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom:0;
    left:0;
    border-radius: 2px;
    transition: all .5s;
    backdrop-filter: blur(3px);
    background: #1890ff6b;
    opacity: ${props => props.visible ? '1' : '0'};
    visibility : ${props => props.visible ? 'visible' : 'hidden'};
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    button {
        height: 60px;
        width: 60px;
        margin-top: ${props => props.visible ? '0' : '30%'};
        &:not(:last-child) {
            margin-right: 10%;
        }
        @media (min-width: 1000px) {
            height: 40px;
            width: 40px;
        }
        @media (min-width: 1200px) {
            height: 60px;
            width: 60px;
        }
        &:last-child {
            &:hover,&:focus {
                color: red;
                border-color: red;
            }
        }
    }
`;
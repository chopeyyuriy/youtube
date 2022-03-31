import { Button, Popconfirm, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
    CopyOutlined,
    CheckOutlined,
    CaretRightOutlined,
    DeleteOutlined,
    ReloadOutlined,
    StarOutlined,
    StarFilled
} from '@ant-design/icons';
import useRemoveVideo from "../../hooks/videos/useRemoveVideo";
import { useLocation } from "react-router-dom";
import { ARCHIVE, FAVORITES } from "../../constats/types";
import useToggleFavorite from "../../hooks/favorites/useToggleFavorite";

export const Actions = ({
    visible,
    onSelectVideo,
    videoId,
    link,
    isFavorite,
    changeFavorite
}) => {
    const [copy, setCopy] = useState(false);
    const [remove, setRemove] = useState(false);
    const [removeLabel, setRemoveLabel] = useState(false);
    const { removeVideo } = useRemoveVideo();
    const { toggleFavorite } = useToggleFavorite();
    const location = useLocation();
    const pathname = location.pathname.split('/')[1];
    const isArchive = pathname === ARCHIVE;
    const isFavorites = pathname === FAVORITES;
    
    const handleCopyLink = () => {
        const videoLink = document.createElement("input");
        videoLink.value = `https://www.youtube.com/watch?v=${link}`;
        document.body.appendChild(videoLink);
        videoLink.select();
        document.execCommand("copy");
        document.body.removeChild(videoLink);
        setCopy(true);
    }

    const handleFavorite = async() => {
        const resp = await toggleFavorite({id: videoId, favorites: isFavorites});
        changeFavorite(resp)
    }
    const handlePlayVideo = () => {
        onSelectVideo(link)
    }

    const handleRemove = () => {
        removeVideo({ videoId, archive: isArchive });
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
        <StyledActions visible={visible} isArchive={isArchive}>
            <Tooltip
                title={copy ? 'Скопійовано !' : 'Копіювати посилання'}
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
            <Tooltip title={isFavorite ? 'Видалити із вибраного' : "Додати до вибраного"}>
                <Button
                    shape="circle"
                    onClick={handleFavorite}
                >
                   {isFavorite ? <StarFilled style={{color: '#FCD535'}} /> : <StarOutlined /> }
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
            <Tooltip
                title={isArchive ? 'Відновити' : "Видалити"}
                color={!isArchive && 'red'}
                visible={!remove && removeLabel}
            >
                <Popconfirm
                    title={isArchive ? 'Відновити це відео?' : "Перемістити в архів?"}
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
                        {
                            isArchive
                                ? <ReloadOutlined />
                                : <DeleteOutlined />
                        }
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
        height: 40px;
        width: 40px;
        margin-top: ${props => props.visible ? '0' : '30%'};
        &:not(:last-child) {
            margin-right: 10%;
        }
        ${props => !props.isArchive && `
        &:last-child {
            &:hover,&:focus {
                color: red;
                border-color: red;
            }
        }
        `
    }
    }
`;
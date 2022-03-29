import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "antd";
import { SearchVideo } from "../SearchVideo/SearchVideo";
import { VideosTable } from "../VideosTable/VideosTable";
import useGettingVideos from "../../hooks/videos/useGettingVideos";
import useGettingCategories from "../../hooks/categories/useGettingCategories";

export const Playlist = () => {
    const { activeCategory } = useGettingCategories();
    const { videos } = useGettingVideos();
    // const [videos, setVideos] = useState([])
    const [searching, setSearching] = useState(false)
    const [title, setTitle] = useState('Назва розділу');

    const handleCloseSearching = () => setSearching(false);

    const handleAddVideo = (video) => {
        // setVideos([video, ...videos]);
        handleCloseSearching();
    }

    const handleRemoveVideo = (videoId) => {
        const filteredVideos = videos.filter((video, index) => index !== videoId);
        // setVideos(filteredVideos)
        localStorage.setItem('videos', JSON.stringify(filteredVideos))
        handleCloseSearching();
    }

    const handleChangePlaylistName = (value) => {
        value.length > 0 && setTitle(value);
    }

    return (
        <div>
            <SearchVideo
                visible={searching}
                onClose={handleCloseSearching}
                onAddVideo={handleAddVideo}
            />
            <StyledHeader>
                <Typography.Title
                    level={2}
                // editable={{
                //     tooltip: 'Редагувати назву розділу',
                //     onChange: handleChangePlaylistName,
                //     triggerType: ['icon', 'text']
                // }}
                >
                    {activeCategory?.name}
                </Typography.Title>
                <Button onClick={() => setSearching(true)}>
                    + Добавити нове відео
                </Button>
            </StyledHeader>
            <VideosTable videos={videos} onRemoveVideo={handleRemoveVideo} />
        </div>
    )
}

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    h2 {
        word-break: break-all;
    }
    svg {
        font-size: 20px;
    }
`;
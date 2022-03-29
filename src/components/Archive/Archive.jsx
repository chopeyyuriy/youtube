import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "antd";
import { SearchVideo } from "../SearchVideo/SearchVideo";
import { VideosTable } from "../VideosTable/VideosTable";
import useGettingVideos from "../../hooks/videos/useGettingVideos";
import useGettingArchive from "../../hooks/archive/useGettingArchive";

export const Archive = () => {
    const { archive } = useGettingArchive();
    const [title, setTitle] = useState('Архів');

    const handleRemoveVideo = (videoId) => {
        // const filteredVideos = videos.filter((video, index) => index !== videoId);
        // setVideos(filteredVideos)
    }
    
    return (
        <div>
            <StyledHeader>
                <Typography.Title level={2}                >
                    {title}
                </Typography.Title>
            </StyledHeader>
            <VideosTable videos={archive} onRemoveVideo={handleRemoveVideo} />
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
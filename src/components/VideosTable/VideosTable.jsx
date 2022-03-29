import { PageHeader } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { VideoCart } from "../VideoCart/VideoCart";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { Empty } from 'antd';

export const VideosTable = ({ videos }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleSelectVideo = (videoId) => setSelectedVideo(videoId);
    const handleCloseVideoPlayer = () => setSelectedVideo(null);

    return (
        <StyledVideosTable>
            <VideoPlayer
                videoId={selectedVideo}
                onClose={handleCloseVideoPlayer}
            />
            {
                videos?.length > 0
                    ? <StyledVideos>
                        {
                            videos.map((video, i) => (
                                <VideoCart
                                    key={i}
                                    video={video}
                                    onSelectVideo={handleSelectVideo}
                                />
                            ))
                        }
                    </StyledVideos>
                    : <Empty description="Немає збережених відео"/>
            }
        </StyledVideosTable>
    )
}

const StyledVideosTable = styled.div`
    padding: 20px;
`;

const StyledVideos = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
    @media (min-width:700px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width:1000px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width:1400px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width:1750px) {
        grid-template-columns: repeat(5, 1fr);
    }
    @media (min-width:1760px) {
        width: 1600px;
    }
`;
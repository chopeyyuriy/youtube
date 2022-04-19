import React, { useState } from "react";
import styled from "styled-components";
import { VideoCart } from "../VideoCart/VideoCart";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { Empty } from 'antd';
import moment from "moment";

export const VideosTable = ({ videos, sortActiveOption, search }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleSelectVideo = (videoId) => setSelectedVideo(videoId);
    const handleCloseVideoPlayer = () => setSelectedVideo(null);

    const handleFilterVideos = (videos) => {
        if (sortActiveOption) {
            switch (sortActiveOption) {
                case 'old':
                    return videos.sort((a, b) => Date.parse(a.date_add) - Date.parse(b.date_add))
                    break;
                case 'new':
                    return videos.sort((a, b) => Date.parse(b.date_add) - Date.parse(a.date_add))
                    break;
                case 'short':
                    return videos.sort((a, b) => moment.duration(a.duration)._milliseconds - moment.duration(b.duration)._milliseconds);
                    break;
                case 'long':
                    return videos.sort((a, b) => moment.duration(b.duration)._milliseconds - moment.duration(a.duration)._milliseconds);
                    break;
                default:
                    return videos;
            }
        } else {
            return videos;
        }
    }

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
                            handleFilterVideos(videos)
                                .filter(video => search ?
                                    video.name.toLowerCase().includes(search.toLowerCase()) || video.channel_name.toLowerCase().includes(search.toLowerCase())
                                    : true
                                )
                                .map((video, i) => (
                                    <VideoCart
                                        key={i}
                                        video={video}
                                        onSelectVideo={handleSelectVideo}
                                    />
                                ))
                        }
                    </StyledVideos>
                    : <Empty description="Немає збережених відео" />
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
    margin: 0 auto;
    @media (min-width:700px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width:1000px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width:1400px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media (min-width:1790px) {
        grid-template-columns: repeat(5, 1fr);
    }
    @media (min-width:1850px) {
        width: 1600px;
    }
`;
import React from "react";
import styled from "styled-components";
import { Info } from "./Info";
import { Preview } from "./Preview";

export const VideoCart = ({
    video,
    onSelectVideo,
    onRemoveVideo,
}) => {
    const { name, image, link, channel_name, channel_link, duration, id } = video;

    return (
        <StyledVideoCart>
            <Preview
                image={image}
                duration={duration}
                onSelectVideo={onSelectVideo}
                videoId={id}
                link={link}
                onRemoveVideo={onRemoveVideo}
                id={id}
            />
            <Info
                title={name}
                channelName={channel_name}
                channelId={channel_link}
            />
        </StyledVideoCart>
    )
}

const StyledVideoCart = styled.div`
    width: 100%;
    height: 100%;
`;
import React from "react";
import styled from "styled-components";
import { Info } from "./Info";
import { Preview } from "./Preview";

export const VideoCart = ({
    video,
    onSelectVideo,
}) => {
    const { name, image, link, channel_name, channel_link, duration, id, image_channel } = video;

    return (
        <StyledVideoCart>
            <Preview
                image={image}
                duration={duration}
                onSelectVideo={onSelectVideo}
                videoId={id}
                link={link}
                id={id}
            />
            <Info
                title={name}
                channelName={channel_name}
                logo={image_channel}
                channelId={channel_link}
            />
        </StyledVideoCart>
    )
}

const StyledVideoCart = styled.div`
    width: 100%;
    height: 100%;
`;
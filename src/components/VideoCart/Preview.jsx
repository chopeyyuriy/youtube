import React, { useState } from "react";
import styled from "styled-components";
import { NoImage } from "./NoImage";
import { Actions } from "./Actions";
import { Image } from "./Image";

export const Preview = ({
    image,
    duration,
    onSelectVideo,
    videoId,
    link,
    index
}) => {
    const [visibleActions, setVisibleActions] = useState(false);

    return (
        <StyledPreview
            onMouseEnter={() => setVisibleActions(true)}
            onMouseLeave={() => setVisibleActions(false)}
        >
            <Actions
                visible={visibleActions}
                onSelectVideo={onSelectVideo}
                videoId={videoId}
                link={link}
                index={index}
            />
            {
                image
                    ? <Image
                        image={image}
                        duration={duration}
                        showDuration={!visibleActions}
                    />
                    : <NoImage duration={duration} showDuration={!visibleActions} />
            }
        </StyledPreview>
    )
}

const StyledPreview = styled.div`
    height: auto;
    position: relative;
    box-shadow: 4px 5px 11px -1px rgba(0,0,0,0.3);
`;

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
    index,
    favorites
}) => {
    const [visibleActions, setVisibleActions] = useState(false);
    const [isFavorite, setIsFavorite] = useState(favorites == 1)

    const handleChangeFavorite = (value) => setIsFavorite(value);

    return (
        <StyledPreview
            onMouseEnter={() => setVisibleActions(true)}
            onMouseLeave={() => setVisibleActions(false)}
            isFavorite={isFavorite}
        >
            <Actions
                visible={visibleActions}
                onSelectVideo={onSelectVideo}
                videoId={videoId}
                link={link}
                index={index}
                isFavorite={isFavorite}
                changeFavorite={handleChangeFavorite}
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
    ${
        props => props.isFavorite && `
        outline: 4px solid rgb(226, 223, 22);
        border-radius: 2px;
    `
    }
`;

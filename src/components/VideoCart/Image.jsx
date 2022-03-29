import React from "react";
import styled from "styled-components";
import { Duration } from "./Duration";

export const Image = ({ image, duration, showDuration }) => {
    return (
        <StyledImage image={image}>
            <Duration
                duration={duration}
                showDuration={showDuration}
            />
        </StyledImage>
    )
}

const StyledImage = styled.div`
    width: 100%;
    height: 200px;
    position: relative;
    border-radius: 2px;
    background-size: 125% !important;
    background: url(${props => props.image}) no-repeat center center/cover gainsboro;
    @media (min-width: 500px) {
        height: 300px;
    }
    @media (min-width: 700px) {
        height: 200px;
    }
    @media (min-width: 900px) {
        height: 220px;
    }
    @media (min-width: 1000px) {
        height: 160px;
    }
    @media (min-width: 1200px) {
        height: 170px;
    }
    @media (min-width: 1300px) {
        height: 190px;
    }
`;

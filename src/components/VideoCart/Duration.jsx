import React from "react";
import styled from "styled-components";
import moment from "moment";

export const Duration = ({ duration, showDuration }) => {
    const parsedDuration = moment.duration(duration)
    const hours = parsedDuration?._data.hours > 0 ? `${parsedDuration?._data.hours}:` : '';
    const minutes = parsedDuration?._data.minutes;
    const seconds = parsedDuration?._data.seconds;
    const videoDuration = `${hours}${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    return (
        <StyledDuration showDuration={showDuration}>
            {videoDuration}
        </StyledDuration>
    )
}

const StyledDuration = styled.div`
    position: absolute;
    bottom: 7px;
    right: 4px;
    font-size: 12px;
    font-weight: bold;
    color: #030303;
    padding: 3px 4px;
    border-radius: 2px;
    color: #fff;
    background-color: rgba(0, 21, 41,0.8);
    transition: all 1s;
    opacity: ${props => props.showDuration ? '1' : '0'};
`;
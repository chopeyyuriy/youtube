import React from "react";
import styled from "styled-components";
import { Duration } from "./Duration";
import { FileImageOutlined } from '@ant-design/icons';

export const NoImage = ({ duration, showDuration }) => {
    return (
        <StyledNoImage>
            <FileImageOutlined />
            <span>Немає фото</span>
            <Duration
                duration={duration}
                showDuration={showDuration}
            />
        </StyledNoImage>
    )
}

const StyledNoImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: gainsboro;
    font-size: 15px;
    width: 100%;
    height: 200px;
    position: relative;
    border-radius: 2px;
    svg {
        font-size: 30px;
        margin-bottom: 5px;
    }
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
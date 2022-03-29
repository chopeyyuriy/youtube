import React from "react";
import styled from "styled-components";
import { FileImageOutlined } from '@ant-design/icons';
import { Typography } from "antd";

export const FoundedVideo = ({ title, image }) => {
    return (
        <StyledFoundedVideo>
            {
                image
                    ? <StyledImage image={image} />
                    : <StyledNoImage>
                        <FileImageOutlined />
                        <span>Нет фото</span>
                    </StyledNoImage>
            }
            <StyledDescription>
                <StyledVideoTitle>
                    {title}
                </StyledVideoTitle>
            </StyledDescription>

        </StyledFoundedVideo>
    )
}

const StyledFoundedVideo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    flex-wrap: wrap;
`;

const StyledImage = styled.div`
    width: 100%;
    height: 254px;
    background: url(${props => props.image}) no-repeat center center/cover;
`;

const StyledNoImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 210px;
    background: gainsboro;
    font-size: 15px;
    svg {
        font-size: 30px;
        margin-bottom: 5px;
    }
`;

const StyledDescription = styled.div`
    padding: 20px 20px 0;
`;

const StyledVideoTitle = styled.div`
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: #030303;
`;
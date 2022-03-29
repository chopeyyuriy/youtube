import React from "react";
import styled from "styled-components";
import { Avatar } from "antd";

export const Info = ({ title, channelName, logo, channelId }) => {
    const channelLink = `https://www.youtube.com/channel/${channelId}`;

    return (
        <StyledInfo>
            <a
                href={channelLink}
                target="_blank"
                rel="noreferrer"
            >
                <Avatar
                    src={logo}
                    size={36}
                    draggable={false}
                />
            </a>
            <StyledDescription>
                <span>
                    {
                        title.length > 52
                            ? `${title.substring(0, 52)}...`
                            : title
                    }
                </span>
                <a
                    href={channelLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    {channelName}</a>
            </StyledDescription>
        </StyledInfo>
    )
}

const StyledInfo = styled.div`
    display: grid;
    padding: 12px 0 10px 0;
    justify-items: center;
    grid-template-columns: 15% 80%;
    span {
        flex-shrink: 0;
    }
`;

const StyledDescription = styled.div`
    padding-left: 10px;
    span {
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        color: #030303;
    }
    a {
        display: block;
        font-size: 12px;
        line-height: 18px;
        color: #606060;
        transition: all .5s;
        &:hover {
            color: #1890ff;
        }
    }
`;
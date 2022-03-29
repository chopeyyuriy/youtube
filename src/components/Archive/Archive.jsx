import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { VideosTable } from "../VideosTable/VideosTable";
import useGettingArchive from "../../hooks/archive/useGettingArchive";

export const Archive = () => {
    const { archive } = useGettingArchive();
    return (
        <div>
            <StyledHeader>
                <Typography.Title level={2}>
                    Архів
                </Typography.Title>
            </StyledHeader>
            <VideosTable videos={archive} />
        </div>
    )
}

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    h2 {
        word-break: break-all;
    }
    svg {
        font-size: 20px;
    }
`;
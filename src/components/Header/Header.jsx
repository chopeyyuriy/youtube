import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "antd";
import { SearchVideo } from "../SearchVideo/SearchVideo";
import { SortButton } from "./SortButton";

export const Header = ({ title, countVideos, addVideo, sortActiveOption, onChangeSort }) => {
    const [searching, setSearching] = useState(false);
    const handleCloseSearching = () => setSearching(false);

    const handleAddVideo = (resp) => {
        if (resp) {
            handleCloseSearching();
        }
    }

    useEffect(() => {
        onChangeSort(null)
    }, [title])

    return (
        <>
            <SearchVideo
                visible={searching}
                onClose={handleCloseSearching}
                onAddVideo={handleAddVideo}
            />
            <StyledHeader>
                <Typography.Title level={2}>
                    {title} 
                    {countVideos && <span className="videoCount">{countVideos}</span>}
                </Typography.Title>
                <div>
                    <SortButton
                        title="Cортувати за датою"
                        options={{ down: 'new', up: 'old' }}
                        onChangeActiveSort={onChangeSort}
                        activeOption={sortActiveOption}
                    />
                    {
                        addVideo &&
                        <Button onClick={() => setSearching(true)}>
                            + Додати нове відео
                        </Button>
                    }
                </div>
            </StyledHeader>
        </>
    )
}

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    .videoCount {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 1px 4px;
        font-size: 15px;
        vertical-align: super;
        background: #1890ff;
        border-radius: 5px;
        color: #fff;
    }
    h2 {
        word-break: break-all;
    }
    svg {
        margin-left: 5px;
    }
`;
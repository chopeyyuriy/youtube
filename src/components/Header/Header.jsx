import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "antd";
import { SearchVideo } from "../SearchVideo/SearchVideo";
import { SortButton } from "./SortButton";

export const Header = ({ title, addVideo, sortActiveOption, onChangeSort }) => {
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
                </Typography.Title>
                <div>
                    <StyledSortLabel>Сортувати за:</StyledSortLabel>
                    <SortButton
                        title="датою"
                        options={{ down: 'new', up: 'old' }}
                        onChangeActiveSort={onChangeSort}
                        activeOption={sortActiveOption}
                    />
                     <SortButton
                        title="тривалістю"
                        options={{ down: 'long', up: 'short' }}
                        onChangeActiveSort={onChangeSort}
                        activeOption={sortActiveOption}
                        last
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
    h2 {
        word-break: break-all;
    }
    svg {
        margin-left: 5px;
    }
`;

const StyledSortLabel = styled.span`
    margin-right: 10px;
    font-size: 16px;
`;
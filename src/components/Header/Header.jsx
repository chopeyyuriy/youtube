import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Input, Typography } from "antd";
import { SearchVideo } from "../SearchVideo/SearchVideo";
import { SortButton } from "./SortButton";
import { SearchOutlined } from '@ant-design/icons';

export const Header = ({
    title,
    addVideo,
    sortActiveOption,
    onChangeSort,
    search,
    onChangeSearch
}) => {
    const [searching, setSearching] = useState(false);
    const handleCloseSearching = () => setSearching(false);

    const handleAddVideo = (resp) => {
        if (resp) {
            handleCloseSearching();
        }
    }

    useEffect(() => {
        onChangeSort(null);
        onChangeSearch('');
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
                <Input
                    className="search-input"
                    placeholder="Пошук відео або каналу"
                    suffix={<SearchOutlined />}
                    value={search}
                    onChange={e => onChangeSearch(e.target.value)}
                />
                <StyledFooter>
                    {
                        addVideo &&
                        <Button onClick={() => setSearching(true)}>
                            + Додати нове відео
                        </Button>
                    }
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
                    </div>
                </StyledFooter>
            </StyledHeader>
        </>
    )
}

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    h2 {
        word-break: break-all;
    }
    svg {
        margin-left: 5px;
    }
    .search-input {
        width: 100%;
    }
    @media (min-width: 1900px) {
        .search-input {
            width: 1600px;
        }
    }
`;

const StyledSortLabel = styled.span`
    margin-right: 10px;
    font-size: 16px;
`;

const StyledFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    @media (max-width: 800px) {
        flex-direction: column;
        gap: 10px;
    }
    @media (min-width: 1900px) {
        width: 1600px;
    }
`;
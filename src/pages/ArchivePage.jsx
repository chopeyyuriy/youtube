import React, { useState } from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { VideosTable } from "../components/VideosTable/VideosTable";
import useGettingArchive from '../hooks/archive/useGettingArchive';
import { Header } from "../components/Header/Header";

export const ArchivePage = () => {
    const { archive } = useGettingArchive();
    const [sortActiveOption, setSortActiveOption] = useState(null);
    const handleChangeSortActiveOption = (value) => setSortActiveOption(value);

    return (
        <div>
            <Header
                title="Aрхів"
                countVideos={archive.length}
                sortActiveOption={sortActiveOption}
                onChangeSort={handleChangeSortActiveOption}
            />
            <VideosTable
                videos={archive}
                sortActiveOption={sortActiveOption}
            />
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
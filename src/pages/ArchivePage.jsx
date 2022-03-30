import React, { useState } from "react";
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
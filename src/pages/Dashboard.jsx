import React, { useState } from "react";
import { VideosTable } from "../components/VideosTable/VideosTable";
import useGettingVideos from "../hooks/videos/useGettingVideos";
import { Header } from "../components/Header/Header";

export const Dashboard = () => {
    const { videos } = useGettingVideos();
    //sorting videos
    const [sortActiveOption, setSortActiveOption] = useState(null);
    const handleChangeSortActiveOption = (value) => setSortActiveOption(value);
    //searching videos
    const [search, setSearch] = useState();
    const handleChangeSearch = (value) => setSearch(value);

    return (
        <div>
            <Header
                title="Головна"
                addVideo
                sortActiveOption={sortActiveOption}
                onChangeSort={handleChangeSortActiveOption}
                search={search}
                onChangeSearch={handleChangeSearch}
            />
            <VideosTable
                videos={videos}
                sortActiveOption={sortActiveOption}
                search={search}
            />
        </div>
    )
}

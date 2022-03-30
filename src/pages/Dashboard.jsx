import React, { useState } from "react";
import { VideosTable } from "../components/VideosTable/VideosTable";
import useGettingVideos from "../hooks/videos/useGettingVideos";
import { Header } from "../components/Header/Header";

export const Dashboard = () => {
    const { videos } = useGettingVideos();
    const [sortActiveOption, setSortActiveOption] = useState(null);
    const handleChangeSortActiveOption = (value) => setSortActiveOption(value);

    return (
        <div>
            <Header
                title="Головна"
                addVideo
                sortActiveOption={sortActiveOption}
                onChangeSort={handleChangeSortActiveOption}
                countVideos={videos.length}
            />
            <VideosTable
                videos={videos}
                sortActiveOption={sortActiveOption}
            />
        </div>
    )
}

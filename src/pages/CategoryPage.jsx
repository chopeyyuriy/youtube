import React, { useState } from "react";
import styled from "styled-components";
import { VideosTable } from "../components/VideosTable/VideosTable";
import useGettingVideos from "../hooks/videos/useGettingVideos";
import useGettingCategories from "../hooks/categories/useGettingCategories";
import { Header } from "../components/Header/Header";

export const CategoryPage = () => {
    const { activeCategory } = useGettingCategories();
    const { videos } = useGettingVideos();
    const [sortActiveOption, setSortActiveOption] = useState(null);
    const handleChangeSortActiveOption = (value) => setSortActiveOption(value);

    console.log(activeCategory)
    return (
        <div>
            <Header
                title={activeCategory?.name}
                sortActiveOption={sortActiveOption}
                onChangeSort={handleChangeSortActiveOption}
                countVideos={videos.length}
                addVideo
            />
            <VideosTable
                videos={videos}
                sortActiveOption={sortActiveOption}
            />
        </div>
    )
}
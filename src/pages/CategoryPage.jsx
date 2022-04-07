import React, { useState } from "react";
import { VideosTable } from "../components/VideosTable/VideosTable";
import useGettingVideos from "../hooks/videos/useGettingVideos";
import useGettingCategories from "../hooks/categories/useGettingCategories";
import { Header } from "../components/Header/Header";

export const CategoryPage = () => {
    const { activeCategory } = useGettingCategories();
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
                title={activeCategory?.name}
                sortActiveOption={sortActiveOption}
                onChangeSort={handleChangeSortActiveOption}
                search={search}
                onChangeSearch={handleChangeSearch}
                addVideo
            />
            <VideosTable
                videos={videos}
                sortActiveOption={sortActiveOption}
                search={search}
            />
        </div>
    )
}

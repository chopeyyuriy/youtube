import React, { useState } from "react";
import { VideosTable } from "../components/VideosTable/VideosTable";
import useGettingArchive from '../hooks/archive/useGettingArchive';
import { Header } from "../components/Header/Header";
import useGettingFavorites from "../hooks/favorites/useGettingFavorites";

export const FavoritePage = () => {
    const { favorites } = useGettingFavorites();
    const [sortActiveOption, setSortActiveOption] = useState(null);
    const handleChangeSortActiveOption = (value) => setSortActiveOption(value);

    return (
        <div>
            <Header
                title="Вибране"
                sortActiveOption={sortActiveOption}
                onChangeSort={handleChangeSortActiveOption}
            />
            <VideosTable
                videos={favorites}
                sortActiveOption={sortActiveOption}
                favorites
            />
        </div>
    )
}

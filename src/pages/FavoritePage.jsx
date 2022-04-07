import React, { useState } from "react";
import { VideosTable } from "../components/VideosTable/VideosTable";
import useGettingArchive from '../hooks/archive/useGettingArchive';
import { Header } from "../components/Header/Header";
import useGettingFavorites from "../hooks/favorites/useGettingFavorites";

export const FavoritePage = () => {
    const { favorites } = useGettingFavorites();
      //sorting videos
      const [sortActiveOption, setSortActiveOption] = useState(null);
      const handleChangeSortActiveOption = (value) => setSortActiveOption(value);
      //searching videos
      const [search, setSearch] = useState();
      const handleChangeSearch = (value) => setSearch(value);

    return (
        <div>
            <Header
                title="Вибране"
                sortActiveOption={sortActiveOption}
                onChangeSort={handleChangeSortActiveOption}
                search={search}
                onChangeSearch={handleChangeSearch}
            />
            <VideosTable
                videos={favorites}
                sortActiveOption={sortActiveOption}
                search={search}
                favorites
            />
        </div>
    )
}

import axios from "axios";
import { useQuery } from "react-query";
import { hostname } from "../../api/hostname";
import { FAVORITES } from "../../constats/types";


const useGettingFavorites = () => {

    const { data: favorites = [] } = useQuery(
        [FAVORITES],
        async () => (await axios.get(`${hostname}api/get_favorites_videos`)).data.videos,
    );

    return {
        favorites
    }
}

export default useGettingFavorites;
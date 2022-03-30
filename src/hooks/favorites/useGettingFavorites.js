import axios from "axios";
import { useQuery } from "react-query";
import { hostname } from "../../components/api/hostname";
import { FAVORITES } from "../../contants/types";


const useGettingFavorites = () => {

    const { data: favorites = [] } = useQuery(
        [FAVORITES],
        async () => (await axios.get(`${hostname}api/get_favorites`)).data,
    );

    return {
        favorites
    }
}

export default useGettingFavorites;
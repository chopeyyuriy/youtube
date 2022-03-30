import axios from "axios";
import { useQuery } from "react-query";
import { hostname } from "../../api/hostname";
import { ARCHIVE } from "../../constats/types";


const useGettingArchive = () => {
    const { data: archive = [] } = useQuery(
        [ARCHIVE],
        async () => (await axios.get(`${hostname}api/get_removed_videos`)).data.videos,
    );

    return {
        archive
    }
}

export default useGettingArchive;
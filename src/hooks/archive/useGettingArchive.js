import axios from "axios";
import { useQuery } from "react-query";
import { hostname } from "../../components/api/hostname";
import { ARCHIVE } from "../../contants/types";


const useGettingArchive = () => {
    const { data: archive = [] } = useQuery(
        [ARCHIVE],
        async () => (await axios.get(`${hostname}api/archive_video`)).data,
    );

    return {
        archive
    }
}

export default useGettingArchive;
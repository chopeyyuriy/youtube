import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { hostname } from "../../api/hostname";
import { VIDEOS } from "../../constats/types";


const useGettingVideos = () => {
    const { categoryId } = useParams();
    const { data: videos = [] } = useQuery(
        [VIDEOS, categoryId],
        async () => (await axios.get(`${hostname}api/get_videos/${categoryId ?? ''}`)).data.videos,
    );

    return {
        videos
    }
}

export default useGettingVideos;
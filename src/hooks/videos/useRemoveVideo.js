import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { hostname } from "../../components/api/hostname";
import { VIDEOS } from "../../contants/types";


const useRemoveVideo = () => {
    const client = useQueryClient();

    const { mutateAsync: asyncRemoveVideo, ...mutation } = useMutation(
        async (videoId) => (
          await axios.post(`${hostname}archive_video/${videoId}`)
        ),
      );
    
    const handleRemoveVideo = async (videoId) => {
        const resp = await asyncRemoveVideo(videoId);
        console.log(resp);

        const videosData = client.getQueryData(VIDEOS);
        const updatedVideosData = videosData?.filter(video => video.id !== videoId);
        client.setQueryData(VIDEOS, updatedVideosData);
    }

    return {
        removeVideo: handleRemoveVideo
    }
}

export default useRemoveVideo;
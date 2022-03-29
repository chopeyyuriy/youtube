import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { hostname } from "../../components/api/hostname";
import { VIDEOS } from "../../contants/types";


const useAddVideo = () => {
  const client = useQueryClient();

  const { mutateAsync: asyncAddVideo, ...mutation } = useMutation(
    async (data) => (
      await axios.post(`${hostname}api/add_video`, data,)
    ),
  );

  const handleAddVideo = async (data) => {
    const resp = await asyncAddVideo(data);
    console.log(resp);

    const videosData = client.getQueryData(VIDEOS);
    const updatedVideosData = [{ ...data, id: resp.data.id }, ...videosData];
    client.setQueryData(VIDEOS, updatedVideosData);
    return resp;
  }

  return {
    addVideo: handleAddVideo
  }
}

export default useAddVideo;
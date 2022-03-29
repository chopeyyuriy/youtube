import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { hostname } from "../../components/api/hostname";
import { VIDEOS } from "../../contants/types";


const useAddVideo = () => {
  const { categoryId } = useParams();
  const client = useQueryClient();

  const { mutateAsync: asyncAddVideo, ...mutation } = useMutation(
    async (data) => (
      await axios.post(`${hostname}api/add_video`, data)
    ),
  );

  const handleAddVideo = async (data) => {
    const sendData = new FormData();
    sendData.append('name', data.name);
    sendData.append('category_id', data.category_id)
    sendData.append('link', data.link)
    sendData.append('image', data.image)
    sendData.append('channel_link', data.channel_link)
    sendData.append('channel_name', data.channel_name)

    const resp = await asyncAddVideo(sendData);
    const videosData = client.getQueriesData(VIDEOS, categoryId);
    const updatedVideosData = [{ ...data, id: resp.data.id }, ...videosData[0][1]];
    client.setQueriesData(VIDEOS, updatedVideosData);
    return resp.status === 200;
  }

  return {
    addVideo: handleAddVideo
  }
}

export default useAddVideo;
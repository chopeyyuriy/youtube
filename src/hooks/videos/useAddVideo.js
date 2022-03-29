import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { hostname } from "../../components/api/hostname";
import { VIDEOS } from "../../contants/types";


const useAddVideo = () => {
  const { categoryId } = useParams();
  const client = useQueryClient();

  const { mutateAsync: asyncAddVideo } = useMutation(
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
    sendData.append('duration', data.duration)
    sendData.append('channel_link', data.channel_link)
    sendData.append('channel_name', data.channel_name)
    sendData.append('image_channel', data.image_channel)

    const resp = await asyncAddVideo(sendData);
    if (resp.status === 200 && data.category_id === categoryId) {
      let videosData = client.getQueriesData(VIDEOS, categoryId);

      if (videosData.length > 1) {
        videosData = videosData.filter(item => item[0].includes(categoryId))[0][1]
      } else {
        videosData = videosData[0][1];
      }

      const updatedVideosData = [{ ...data, id: resp.data.id }, ...videosData];
      client.setQueriesData(VIDEOS, updatedVideosData);
    }
    return resp.status === 200;
  }

  return {
    addVideo: handleAddVideo
  }
}

export default useAddVideo;
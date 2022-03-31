import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { hostname } from "../../api/hostname";
import { CATEGORIES, VIDEOS } from "../../constats/types";


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

    try {
      const resp = await asyncAddVideo(sendData);
      if (resp.status === 200 && (!categoryId || data.category_id === categoryId) &&
        resp.data.message !== 'already exists') {

        let videosData = client.getQueriesData(VIDEOS, categoryId);

        if (!categoryId) {
          videosData = videosData.filter(item => item[0][1] === undefined)[0][1]
        } else if (videosData.length > 1) {
          videosData = videosData.filter(item => item[0].includes(categoryId))[0][1]
        } else {
          videosData = videosData[0][1];
        }

        const updatedVideosData = [{ ...data, id: resp.data.id }, ...videosData];
        client.setQueriesData(VIDEOS, updatedVideosData);

        if (categoryId) {
          let categoriesData = client.getQueryData(CATEGORIES);
          const updatedCAtegories = categoriesData.map(category => {
            if (category.id === categoryId) {
              return ({ ...category, count_videos: 1 + Number(category.count_videos) })
            }
            return category
          })
          client.setQueriesData(CATEGORIES, updatedCAtegories);

        }
      }
      return resp.data.message;
    } catch {
      return 'error'
    }
  }

  return {
    addVideo: handleAddVideo
  }
}

export default useAddVideo;
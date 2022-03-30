import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { hostname } from "../../api/hostname";
import { ARCHIVE, VIDEOS } from "../../constats/types";


const useRemoveVideo = () => {
  const { categoryId } = useParams();
  const client = useQueryClient();

  const { mutateAsync: asyncRemoveVideo } = useMutation(
    async (data) => (
      await axios.post(`${hostname}api/archive_video`, data)
    ),
  );

  const handleRemoveVideo = async ({ videoId, archive }) => {
    const sendData = new FormData();
    sendData.append('id', videoId);
    const resp = await asyncRemoveVideo(sendData);
    
    if (resp.status === 200) {
      if (!categoryId && !archive) {
        let videosData = client.getQueriesData(VIDEOS, categoryId);
        if (videosData.length > 1) {
          videosData = videosData.filter(item => item[0][1] === undefined)[0][1]
        } else {
          videosData = videosData[0][1];
        }
        const updatedVideosData = videosData.filter(video => video.id !== videoId);
        client.setQueriesData(VIDEOS, updatedVideosData);
      } else if (archive) {
        const archiveData = client.getQueriesData(ARCHIVE, categoryId);
        const updatedArchiveData = archiveData[0][1].filter(video => video.id !== videoId);
        client.setQueriesData(ARCHIVE, updatedArchiveData);
      } else {
        let videosData = client.getQueriesData(VIDEOS, categoryId);
        if (videosData.length > 1) {
          videosData = videosData.filter(item => item[0].includes(categoryId))[0][1];
        } else {
          videosData = videosData[0][1];
        }
        const updatedVideosData = videosData.filter(video => video.id !== videoId);
        client.setQueriesData(VIDEOS, updatedVideosData);
      }

    }
  }

  return {
    removeVideo: handleRemoveVideo
  }
}

export default useRemoveVideo;
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { hostname } from "../../components/api/hostname";
import { ARCHIVE, VIDEOS } from "../../contants/types";


const useRemoveVideo = () => {
  const { categoryId } = useParams();
  const client = useQueryClient();

  const { mutateAsync: asyncRemoveVideo } = useMutation(
    async (videoId) => (
      await axios.post(`${hostname}api/archive_video/${videoId}`)
    ),
  );

  const handleRemoveVideo = async ({ videoId, archive }) => {
    const resp = await asyncRemoveVideo(videoId);
    if (resp.status === 200) {
      if (archive) {
        const archiveData = client.getQueriesData(ARCHIVE, categoryId);
        const updatedArchiveData = archiveData[0][1].filter(video => video.id !== videoId);
        client.setQueriesData(ARCHIVE, updatedArchiveData);
      } else {
        const videosData = client.getQueriesData(VIDEOS, categoryId);
        const updatedVideosData = videosData[0][1].filter(video => video.id !== videoId);
        client.setQueriesData(VIDEOS, updatedVideosData);

      }

    }
  }

  return {
    removeVideo: handleRemoveVideo
  }
}

export default useRemoveVideo;
import axios from "axios"
import { TOKEN } from "../contants/youtubeToken"

const useGetingVideo = () => {
    const handleGetVideoById = async ({ videoId }) => {
        const resp = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${TOKEN}&part=statistics`)
        return resp.data
    }
    return {
        getVideo: handleGetVideoById
    }
}

export default useGetingVideo;
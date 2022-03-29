import axios from "axios"
import { TOKEN } from "../contants/youtubeToken"

const useGetingChannel = () => {
    const handleGetChannelById = async ({ channelId }) => {
        const resp = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${TOKEN}&part=statistics`)
        return resp.data
    }
    return {
        getChannel: handleGetChannelById
    }
}

export default useGetingChannel;
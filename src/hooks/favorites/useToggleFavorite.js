import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { hostname } from "../../api/hostname";
import { CATEGORIES } from "../../constats/types";


const useToggleFavorite = () => {
  const client = useQueryClient();

  const { mutateAsync: asyncCreateCategory } = useMutation(
    async (data) => (
      await axios.post(`${hostname}api/set_favorites`, data)
    ),
  );

  const handleToggleFavorite = async (data) => {
    const sendData = new FormData();
    sendData.append('id', data.id);
    const resp = await asyncCreateCategory(sendData);

    if (resp.status === 200) {
      return resp.data.status.status === 'favorites';
    }
  }

  return {
    toggleFavorite: handleToggleFavorite
  }
}

export default useToggleFavorite;
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { hostname } from "../../api/hostname";
import { CATEGORIES } from "../../constats/types";


const useCreatingCategory = () => {
  const client = useQueryClient();

  const { mutateAsync: asyncCreateCategory } = useMutation(
    async (data) => (
      await axios.post(`${hostname}api/add_category`, data)
    ),
  );

  const handleCreateCategory = async (data) => {
    const sendData = new FormData();
    sendData.append('name', data.name);
    const resp = await asyncCreateCategory(sendData);

    if (resp.status === 200) {
      let categoriesData = client.getQueryData(CATEGORIES);

      const updatedCategoriesData = [{ ...data, id: resp.data.id }, ...categoriesData];
      client.setQueriesData(CATEGORIES, updatedCategoriesData);
    }
    return resp.status === 200;
  }

  return {
    createCategory: handleCreateCategory
  }
}

export default useCreatingCategory;
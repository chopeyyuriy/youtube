import axios from "axios";
import { useQueryClient } from "react-query";
import { hostname } from "../../api/hostname";
import { CATEGORIES } from "../../constats/types";


const useToggleMainPageCategory = () => {
  const client = useQueryClient();

  const handleToggleMainPageCategory = async ({ id }) => {
    const data = new FormData();
    data.append('id', id);
    const resp = await axios.post(`${hostname}api/main_page_category`, data);
    if (resp?.status == 200) {
      let categoriesData = client.getQueryData(CATEGORIES);
      const updatedCategoriesData = categoriesData.map(category => category.id === id ? ({ ...category, main_page: category.main_page === '1' ? '0' : '1' }) : category);
      client.setQueriesData(CATEGORIES, updatedCategoriesData);
      return resp
    }
  }

  return {
    toggleMainPageCategory: handleToggleMainPageCategory
  }
}

export default useToggleMainPageCategory;
import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { hostname } from "../../api/hostname";
import { CATEGORIES } from "../../constats/types";


const useGettingCategories = () => {
    const { categoryId } = useParams();

    const { data: categories = [] } = useQuery(
        [CATEGORIES],
        async () => (await axios.get(`${hostname}api/get_categories`)).data,
    );

    const handleActiveCategory = categoryId && categories.filter(c => c.id === categoryId)[0];

    return {
        categories,
        activeCategory: handleActiveCategory
    }
}

export default useGettingCategories;
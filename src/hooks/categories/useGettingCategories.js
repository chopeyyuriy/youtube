import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { hostname } from "../../components/api/hostname";
import { CATEGORIES } from "../../contants/types";


const useGettingCategories = () => {
    const { categoryId } = useParams();

    const { data: categories = [] } = useQuery(
        [CATEGORIES],
        async () => (await axios.get(`${hostname}/api/get_categories`)).data,
    );

    const handleActiveCategory = categories.filter(c => c.id === categoryId)[0];

    return {
        categories,
        activeCategory: handleActiveCategory
    }
}

export default useGettingCategories;
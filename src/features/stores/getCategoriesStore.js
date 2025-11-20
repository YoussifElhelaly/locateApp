import axiosInstance from "api/apiConfig";

export const getCategoriesStore = async (id) => {
    try {
        const response = await axiosInstance.get(`get-categories-by-store-type/${id}`);
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.error("Error fetching categories by store type:", error);
        throw error;
    }
};
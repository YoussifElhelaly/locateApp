import axiosInstance from "api/apiConfig";

export const getCategoryStores = async (id) => {
    try {
        const response = await axiosInstance.get(`get-stores-by-category/${id}`);
        return response.data.data.data;
    } catch (error) {
        console.error("Error fetching categories by store type:", error);
        throw error;
    }
};
import axiosInstance from "api/apiConfig";

export const getAllStores = async () => {
    try {
        const response = await axiosInstance.get('get-stores-types');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching stores:", error);
        throw error;
    }
};
import axiosInstance from "api/apiConfig";

export const getAllStoresTypes = async () => {
    try {
        const response = await axiosInstance.get('get-stores-types');
        return response.data.data;
    } catch (error) {
        console.error("Error fetching stores:", error);
        throw error;
    }
};
export const getAllStoresByType = async ({id}) => {
    try {
        const response = await axiosInstance.get(`get-stores-by-type/${id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching stores:", error);
        throw error;
    }
};
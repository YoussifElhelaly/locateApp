import axiosInstance from "api/apiConfig";

export const getStoreProducts = async (storeId) => {
    try {
        const response = await axiosInstance.get(`get-products-by-store/${storeId}`);
        return response?.data;
    } catch (error) {
        return error;
    }
};
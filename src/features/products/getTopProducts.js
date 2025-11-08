import axiosInstance from "api/apiConfig";

export const getTopProducts = async (storeId) => {
    try {
        const response = await axiosInstance.get(`get-top-products/`);
        
        return response?.data.data.data;
    } catch (error) {
        return error;
    }
};
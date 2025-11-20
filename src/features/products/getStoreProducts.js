import axiosInstance from "api/apiConfig";

export const getStoreProducts = async (storeId) => {
    try {
        console.log("fetch")
        const response = await axiosInstance.get(`get-products-by-store/${storeId}`);
        console.log(response)
        return response?.data?.data;
    } catch (error) {
        return error;
    }
};
import axiosInstance from "api/apiConfig";

export const getProducts = async (productName) => {
    const response = await axiosInstance.get(productName ? `get-products/${productName}` : `get-products/`);
    return response.data.data.data;
};
import axiosInstance from "api/apiConfig";

export const getProducts = async (productName) => {
    console.log(productName, "productName")
    const response = await axiosInstance.get(productName ? `get-products/${productName}` : `get-products/`);
    return response.data.data.data;
};
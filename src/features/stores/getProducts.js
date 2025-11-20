import axiosInstance from "api/apiConfig";

export const getProducts = async (productName) => {
    console.log(productName, "productName")
    const response = await axiosInstance.get(productName ? `get-products/${productName}` : `get-products/`);
    console.log(response)
    return response.data.data;
};
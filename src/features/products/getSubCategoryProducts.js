import axiosInstance from "api/apiConfig";

export const getSubCategoryProducts = async (subCategoryId , isMainCategory = false) => {
    try {
        const response = await axiosInstance.get(`get-products-by-sub-category/${subCategoryId}`);
        console.log(response)
        return response?.data.data.data;
    } catch (error) {
        console.log(error)
        return error;
    }
};
import axiosInstance from "api/apiConfig";

export const getSubCategoryProducts = async (subCategoryId) => {
    try {
        const response = await axiosInstance.get(`get-products-by-sub-category/${subCategoryId}`);
        return response?.data.data.data;
    } catch (error) {
        return error;
    }
};
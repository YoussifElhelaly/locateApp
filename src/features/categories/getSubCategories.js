import axiosInstance from "api/apiConfig";

export const getSubCategories = async (id) => {
    try {
        const response = await axiosInstance.get(`get-sub-categories-by-main-category/${id}`);
        return response.data.data;
    } catch (error) {
        return error;
    }
};
import axiosInstance from "api/apiConfig";

export const getMainCategories = async () => {
    try {
        const response = await axiosInstance("get-main-category");
        return response.data.data;
    } catch (error) {
        return error;
    }
};
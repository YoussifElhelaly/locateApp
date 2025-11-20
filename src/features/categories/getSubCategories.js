import axiosInstance from "api/apiConfig";

export const getSubCategories = async (id) => {
    try {
        const response = await axiosInstance.get(`get-sub-categories-by-main-category/${id}`);
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.log(error)
        // return error;
    }
};
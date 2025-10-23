import axiosInstance from "api/apiConfig";

export const getPersonalDetails = async () => {
    try {
        const response = await axiosInstance.get(`me`);
        return response.data;
    } catch (error) {
        return error;
    }
};
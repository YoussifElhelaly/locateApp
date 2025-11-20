import axiosInstance from "api/apiConfig";

export const getAds = async () => {
    try {
        const response = await axiosInstance.get(`ads`);

        return response.data.data;
    } catch (error) {
        console.log(error)
    }
};
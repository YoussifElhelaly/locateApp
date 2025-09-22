import axiosInstance from "api/apiConfig";

export const loginUser = async (phone, password) => {
    try {
        const params = {
            phone,
            password,
        };
        const response = await axiosInstance.post("login", params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

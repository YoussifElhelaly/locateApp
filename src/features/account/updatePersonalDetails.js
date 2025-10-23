import axiosInstance from "api/apiConfig";

export const updatePersonalDetails = async (data) => {
    try {
        const params = {
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone_number,
            email: data.email,
        };
        const response = await axiosInstance.put("me", params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

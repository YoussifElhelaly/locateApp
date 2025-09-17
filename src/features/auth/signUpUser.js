import axiosInstance from "api/apiConfig";

export const signUpUser = async (user_type, first_name, last_name, email, phone, password, password_confirmation) => {
    try {
        const params = {
            user_type,
            first_name,
            last_name,
            email,
            phone,
            password,
            password_confirmation,
        };
        const response = await axiosInstance.post("register", params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

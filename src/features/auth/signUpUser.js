import axiosInstance from "api/apiConfig";
import getFcmToken from "utils/getFcmToken";
import addTokenNotfication from "./notfication";

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
        const token = await getFcmToken()
        await addTokenNotfication(token)
        return response.data;
    } catch (error) {
        throw error;
    }
};

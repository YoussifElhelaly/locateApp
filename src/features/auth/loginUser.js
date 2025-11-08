import axiosInstance from "api/apiConfig";
import getFcmToken from "utils/getFcmToken";
import addTokenNotfication from "./notfication";
export const loginUser = async (phone, password) => {
     console.log("test")
    try {
        const params = {
            phone,
            password,
        };

        const response = await axiosInstance.post("login", params);
        console.log(response)
        const token = await getFcmToken()
        await addTokenNotfication(token, response.data.token)
        return response.data;
    } catch (error) {
        throw error;
    }
};

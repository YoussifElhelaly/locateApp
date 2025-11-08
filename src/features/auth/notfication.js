import axiosInstance from "api/apiConfig";

export default async function addTokenNotfication (token ,accessToken) {
    try {
        const response = await axiosInstance.post("device-tokens", { token } , {
            headers:{
                "Authorization": `Bearer ${accessToken}`
            }
        });
        console.log(response)
    }catch(e) {
        console.log(e)
    }
}
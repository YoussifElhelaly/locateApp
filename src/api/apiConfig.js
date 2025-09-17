import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://store.shinefy.co/api/",
    headers: {
        "Content-Type": "application/json",
        "Device-Type": "ios",
        "App-Version-Id": "1.0",
        "Accept-Language": "en",
        "Accept": "application/json",
    }
});

export default axiosInstance;
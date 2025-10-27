import axiosInstance from "../../api/apiConfig";

export const getCartItems = async () => {
    const response = await axiosInstance.get("/carts");
    console.log(response.data.data[0])
    return response.data.data[0];
};

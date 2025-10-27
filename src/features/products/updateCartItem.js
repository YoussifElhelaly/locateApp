import axiosInstance from '../../api/apiConfig';

export const updateCartItem = async ({ id, quantity }) => {
    const response = await axiosInstance.put(`/cart/items/${id}`, { quantity });
    return response.data;
};

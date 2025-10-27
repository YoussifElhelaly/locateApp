import axiosInstance from '../../api/apiConfig';

export const deleteCartItem = async (id) => {
    const response = await axiosInstance.delete(`/cart/items/${id}`);
    return response.data;
};

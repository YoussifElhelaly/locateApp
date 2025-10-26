import axiosInstance from 'api/apiConfig';

export const addToCart = async (cartData) => {
    try {
        const response = await axiosInstance.post('cart/items', cartData);
        return response.data;
    } catch (error) {
        console.error('Server Error:', error.response.data);
    }
};

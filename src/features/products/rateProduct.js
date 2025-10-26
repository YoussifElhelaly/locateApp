// api/orderService.js
import axiosInstance from 'api/apiConfig';

export const rateProduct = async (productId, ratingData) => {
    try {
        const response = await axiosInstance.post(
            `me/orders/${productId}/rating`,
            ratingData
        );
        return response.data;
    } catch (error) {
        console.log('Server Error:', error.response.data);
        throw error;
    }
};

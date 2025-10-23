import axiosInstance from 'api/apiConfig';

export const deleteDeliveryAddress = async addressId => {
    try {
        const response = await axiosInstance.delete(`me/addresses/${addressId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

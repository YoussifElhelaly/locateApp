import axiosInstance from 'api/apiConfig';

export const getDeliveryAddresses = async () => {
    try {
        const response = await axiosInstance.get('me/addresses');
        return response.data;
    } catch (error) {
        throw error;
    }
};

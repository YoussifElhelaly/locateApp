import axiosInstance from 'api/apiConfig';

export const addDeliveryAddress = async data => {
    try {
        const params = {
            label: data.label,
            receiver_name: 'John Doe',
            phone: '0100000000',
            country: 'Egypt',
            city: 'Cairo',
            area: 'New Cairo',
            street: 'Street 10',
            building: 'B12',
            flat: '5',
            latitude: data.latitude,
            longitude: data.longitude,
            is_default: false,
        };
        const response = await axiosInstance.post('me/addresses', params);
        return response.data;
    } catch (error) {
        throw error;
    }
};

import axiosInstance from 'api/apiConfig';

export const getOrders = async () => {
  const response = await axiosInstance.get('/me/orders');
  return response.data;
};
import axiosInstance from 'api/apiConfig';

export const getOrders = async () => {
  const response = await axiosInstance.get('/me/orders');
  console.log(response)
  return response.data;
};
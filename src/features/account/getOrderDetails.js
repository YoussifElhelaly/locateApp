import axiosInstance from 'api/apiConfig';
export const getOrderDetails = async (orderId) => {
  const response = await axiosInstance.get(`/me/orders/${orderId}`);

  return response.data.data;
};
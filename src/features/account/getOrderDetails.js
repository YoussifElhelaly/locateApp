import axiosInstance from 'api/apiConfig';
export const getOrderDetails = async (orderId) => {
  const response = await axiosInstance.get(`/me/orders/${orderId}`);
  console.log(response)
  return response.data.data;
};
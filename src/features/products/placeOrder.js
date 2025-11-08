import { api } from '../../api/apiConfig';
import axiosInstance from "../../api/apiConfig";

export const placeOrder = async (orderData) => {
console.log(orderData)
  const response = await axiosInstance.post('/make-order', orderData);
  console.log(response)
  return response.data;
};
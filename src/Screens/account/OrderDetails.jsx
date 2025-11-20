import React from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import BackButton from 'components/BackButton.jsx';
import CurrencyText from 'components/CurrencyText.jsx';
import { getOrderDetails } from '../../features/account/getOrderDetails';

const OrderDetails = ({ navigation, route }) => {
  const { orderId } = route.params;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['orderDetails', orderId],
    queryFn: () => getOrderDetails(orderId),
    enabled: !!orderId, // Only run the query if orderId is available
  });

  const order = data?.order;
  const items = data?.items || [];

  const getStatusColor = status => {
    switch (status) {
      case 0: // Assuming 0 is pending/processing
        return 'bg-yellow-100 text-yellow-700';
      case 1: // Assuming 1 is delivered
        return 'bg-green-100 text-green-700';
      case 2: // Assuming 2 is cancelled
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 0:
        return 'Processing';
      case 1:
        return 'Delivered';
      case 2:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getPaymentMethodText = method => {
    switch (method) {
      case 0:
        return 'Cash on Delivery';
      case 1:
        return 'Online Payment';
      default:
        return 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#D4A051" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-red-500 text-lg text-center">
          Error loading order details: {error.message}
        </Text>
      </View>
    );
  }

  if (!order) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-gray-500 text-lg text-center">
          Order not found.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
   

      <ScrollView className="flex-1 p-5">
        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold text-gray-800">Order #{order.order_no}</Text>
            <View
              className={`px-3 py-1 rounded-full ${getStatusColor(order.order_status).split(' ')[0]}`}
            >
              <Text
                className={`text-xs font-semibold ${getStatusColor(order.order_status).split(' ')[1]}`}
              >
                {getStatusText(order.order_status)}
              </Text>
            </View>
          </View>

          <View className="border-t border-gray-100 pt-3 mt-3 space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">Store:</Text>
              <Text className="text-sm text-gray-800 font-medium">{order.store_name}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">Customer:</Text>
              <Text className="text-sm text-gray-800 font-medium">{order.user_name}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">Phone:</Text>
              <Text className="text-sm text-gray-800 font-medium">{order.user_phone}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">Payment Method:</Text>
              <Text className="text-sm text-gray-800 font-medium">{getPaymentMethodText(order.payment_method)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-sm text-gray-600">Order Date:</Text>
              <Text className="text-sm text-gray-800 font-medium">{new Date(order.created_at).toLocaleString()}</Text>
            </View>
          </View>
        </View>

        <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Text className="text-lg font-bold text-gray-800 mb-3">Items</Text>
          {items.map((item, index) => (
            <View key={item.id || index} className="flex-row justify-between py-2 border-b border-gray-100 last:border-b-0">
              <Text className="text-sm text-gray-800">Product ID: {item.pro_id}</Text>
              <Text className="text-sm text-gray-800">Qty: {item.quantity}</Text>
              <CurrencyText 
                amount={item.item_cost}
                className="text-sm text-gray-800"
              />
            </View>
          ))}
        </View>

        <View className="bg-white p-4 rounded-lg shadow-sm">
          <Text className="text-lg font-bold text-gray-800 mb-3">Summary</Text>
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-base text-gray-600">Items Cost:</Text>
              <CurrencyText 
                amount={order.total_items_cost}
                className="text-base text-gray-800 font-medium"
              />
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base text-gray-600">Taxes:</Text>
              <CurrencyText 
                amount={order.total_taxes}
                className="text-base text-gray-800 font-medium"
              />
            </View>
            <View className="flex-row justify-between border-t border-gray-200 pt-2 mt-2">
              <Text className="text-lg font-bold text-gray-800">Total:</Text>
              <CurrencyText 
                amount={order.total_cost}
                className="text-lg font-bold text-gray-800"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetails;
import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import BackButton from 'components/BackButton.jsx';
import Svg, { Path, Rect } from 'react-native-svg';
import { getOrders } from '../../features/account/getOrders';

// Order Icon
const OrderIcon = ({ size = 48, color = '#D4A051' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      stroke={color}
      strokeWidth="2"
    />
    <Path
      d="M9 11h6M9 15h6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const MyOrders = ({ navigation }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['myOrders'],
    queryFn: getOrders,
  });

  const orders = data?.data?.data || [];

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
          Error loading orders: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">

      <ScrollView className="flex-1 p-5">
        {orders.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <OrderIcon size={64} color="#D1D5DB" />
            <Text className="text-gray-500 mt-4 text-center">
              No orders yet
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-1">
              Start shopping to see your orders here
            </Text>
          </View>
        ) : (
          orders.map((order, index) => (
            <TouchableOpacity
              key={order.order_id || index}
              className="mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
              onPress={() => {
                navigation.navigate('OrderDetails', { orderId: order.order_id });
              }}
            >
              {/* Order Header */}
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-base font-bold text-gray-800">
                  {order.order_no}
                </Text>
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

              {/* Order Details */}
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Date:</Text>
                  <Text className="text-sm text-gray-800 font-medium">
                    {new Date(order.created_at).toLocaleDateString()}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Store:</Text>
                  <Text className="text-sm text-gray-800 font-medium">
                    {order.store_name}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Total:</Text>
                  <Text className="text-base text-gray-800 font-bold">
                    ${parseFloat(order.total_cost).toFixed(2)}
                  </Text>
                </View>
              </View>

              {/* View Details */}
              <View className="mt-3 pt-3 border-t border-gray-100">
                <Text className="text-sm text-blue-600 font-medium text-center">
                  View Details →
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default MyOrders;

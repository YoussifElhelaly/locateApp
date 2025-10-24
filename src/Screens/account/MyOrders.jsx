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
  // Dummy data - replace with actual API call
  const orders = [
    {
      id: 1,
      order_number: '#ORD-2024-001',
      date: '2024-10-20',
      status: 'Delivered',
      total: '$45.99',
      items: 3,
    },
    {
      id: 2,
      order_number: '#ORD-2024-002',
      date: '2024-10-22',
      status: 'In Transit',
      total: '$78.50',
      items: 5,
    },
    {
      id: 3,
      order_number: '#ORD-2024-003',
      date: '2024-10-23',
      status: 'Processing',
      total: '$32.00',
      items: 2,
    },
  ];

  const getStatusColor = status => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'In Transit':
        return 'bg-blue-100 text-blue-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
        <View className="flex-row items-center gap-2">
          <BackButton />
          <Text className="text-lg font-semibold text-gray-800">My Orders</Text>
        </View>
      </View>

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
              key={order.id || index}
              className="mb-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
              onPress={() => {
                // Navigate to order details
                // navigation.navigate('OrderDetails', { orderId: order.id });
              }}
            >
              {/* Order Header */}
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-base font-bold text-gray-800">
                  {order.order_number}
                </Text>
                <View
                  className={`px-3 py-1 rounded-full ${getStatusColor(order.status).split(' ')[0]}`}
                >
                  <Text
                    className={`text-xs font-semibold ${getStatusColor(order.status).split(' ')[1]}`}
                  >
                    {order.status}
                  </Text>
                </View>
              </View>

              {/* Order Details */}
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Date:</Text>
                  <Text className="text-sm text-gray-800 font-medium">
                    {order.date}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Items:</Text>
                  <Text className="text-sm text-gray-800 font-medium">
                    {order.items} items
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Total:</Text>
                  <Text className="text-base text-gray-800 font-bold">
                    {order.total}
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

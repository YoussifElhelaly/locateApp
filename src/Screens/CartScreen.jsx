import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import CartItem from 'components/cart/CartItem.jsx';
import EmptyCart from 'components/cart/EmptyCart.jsx';
import LoadingSpinner from 'components/LoadingSpinner.jsx';
import { deleteCartItem } from 'features/products/deleteCartItem';
import { getCartItems } from 'features/products/getCartItems';
import { updateCartItem } from 'features/products/updateCartItem';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

export default function CartScreen({ navigation }) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['cartItems'],
    queryFn: getCartItems,
  });

  const cartItems = data?.items ?? [];
  const subtotal = data?.subtotal ?? 0;
  const totalItems = data?.items_count ?? 0;

  


  const updateCartItemMutation = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['cartItems']);
    },
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(['cartItems']);
    },
  });

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    updateCartItemMutation.mutate({ id: itemId, quantity: newQuantity });
  };

  const handleRemoveItem = itemId => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            deleteCartItemMutation.mutate(itemId);
          },
        },
      ],
    );
  };

  

  const calculateTotal = () => {
    return cartItems?.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getTotalItems = () => {
    return cartItems?.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert(
        'Empty Cart',
        'Please add items to your cart before checkout',
      );
      return;
    }
    navigation.navigate('Checkout', { total: subtotal, totalItems: totalItems, cartItems });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <EmptyCart
        onContinueShopping={() =>
          navigation?.goBack?.() || console.log('Continue shopping')
        }
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      

      <ScrollView
        className="flex-1 px-5 bg-gray-50"
        showsVerticalScrollIndicator={false}
      >
        <View className="py-4">
{cartItems.map((item, index) => (
            <CartItem
              key={item.id}
              item={item}
              itemNumber={index + 1}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
              isUpdating={
                updateCartItemMutation.isPending &&
                updateCartItemMutation.variables?.id === item.id
              }
            />
          ))}
        </View>
      </ScrollView>

      <View className="bg-white px-5 py-6 border-t border-gray-200">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-900 text-2xl font-bold">
              RS {subtotal?.toFixed(2)}
            </Text>
            <Text className="text-gray-500 text-sm">incl. VAT</Text>
          </View>

          <View className="bg-gray-100 px-4 py-2 rounded-lg">
            <Text className="text-gray-900 text-lg font-semibold">60</Text>
            <Text className="text-gray-500 text-sm">mins</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleCheckout}
          className="bg-blue-500 py-4 rounded-xl"
          activeOpacity={0.8}
        >
          <Text className="text-white text-lg font-semibold text-center">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

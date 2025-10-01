// Screens/CartScreen.jsx
import BackButton from 'components/BackButton.jsx';
import CartItem from 'components/cart/CartItem.jsx';
import EmptyCart from 'components/cart/EmptyCart.jsx';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

// Dummy cart data
const DUMMY_CART_ITEMS = [
  {
    id: 1,
    name: 'Panadol Advance 500mg',
    subtitle: 'Paracetamol for Pain & Fever Relief',
    description: '24 tablets',
    price: 224.0,
    quantity: 1,
    image:
      'https://stores.altarekit.com/storage/uploads/uYMsxvjQlqtY49Zwa9CLEIK3MByYhWVn4u3mQZoc.png',
  },
  {
    id: 2,
    name: 'Brufen 400mg',
    subtitle: 'Ibuprofen Anti-inflammatory',
    description: '20 tablets',
    price: 180.0,
    quantity: 2,
    image:
      'https://stores.altarekit.com/design/admin/assets/media/no_image.jpg',
  },
  {
    id: 3,
    name: 'Vitamin D3 Drops',
    subtitle: 'Daily Vitamin Supplement',
    description: '15ml bottle',
    price: 95.5,
    quantity: 1,
    image:
      'https://stores.altarekit.com/design/admin/assets/media/no_image.jpg',
  },
];

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState(DUMMY_CART_ITEMS);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
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
            setCartItems(prevItems =>
              prevItems.filter(item => item.id !== itemId),
            );
          },
        },
      ],
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => setCartItems([]),
        },
      ],
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert(
        'Empty Cart',
        'Please add items to your cart before checkout',
      );
      return;
    }
    Alert.alert(
      'Checkout',
      `Proceeding to checkout with ${getTotalItems()} items totaling EGP ${calculateTotal().toFixed(2)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => console.log('Checkout initiated') },
      ],
    );
  };

  // Show empty cart if no items
  if (cartItems.length === 0) {
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
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 py-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center gap-2">
          <BackButton />
          <Text className="text-gray-900 text-xl font-semibold">Items</Text>
        </View>
        <TouchableOpacity onPress={handleClearCart}>
          <Text className="text-red-500 text-base font-medium">Remove all</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
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
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Section - Total and Checkout */}
      <View className="bg-white px-5 py-6 border-t border-gray-200">
        {/* Total Section */}
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-gray-900 text-2xl font-bold">
              RS {calculateTotal().toFixed(2)}
            </Text>
            <Text className="text-gray-500 text-sm">incl. VAT</Text>
          </View>

          {/* Delivery Time */}
          <View className="bg-gray-100 px-4 py-2 rounded-lg">
            <Text className="text-gray-900 text-lg font-semibold">60</Text>
            <Text className="text-gray-500 text-sm">mins</Text>
          </View>
        </View>

        {/* Checkout Button */}
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

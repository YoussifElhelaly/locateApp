import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';

import { placeOrder } from '../features/products/placeOrder';
import { useMutation } from '@tanstack/react-query'
export default function CheckoutScreen({ route, navigation }) {
  const { total, totalItems , cartItems } = route.params;
  const [paymentMethod, setPaymentMethod] = useState('0');


  const { mutate, isPending :isLoading, isError, error } = useMutation( {
    mutationFn: placeOrder,
    onSuccess: (data) => {
      console.log('Order placed successfully:', data);
      Alert.alert('Success', 'Your order has been placed successfully!');
      // Optionally navigate to a success screen or clear the cart
    },
    onError: (err) => {
      console.error('Error placing order:', err.response ? err.response.data : err.message);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    },
  });

  const handlePlaceOrder = () => {
    const orderData = {
      store_id: 1, // Assuming a default store_id for now, or it should come from route.params or state
      payment_type: parseInt(paymentMethod), // Convert paymentMethod to integer
      user_name: "Test", // Placeholder, should come from user input or context
      user_phone: "010...", // Placeholder, should come from user input or context
      items: cartItems.map(item => ({
        pro_id: item.id, // Assuming item.id is the product ID
        quantity: item.quantity,
      })),
    };
    mutate(orderData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {isError && <Text style={{ color: 'red' }}>Error: {error.message}</Text>}

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
        <Text style={styles.summaryText}>Total Amount: EGP {total.toFixed(2)}</Text>
      </View>

      <View style={styles.paymentContainer}>
        <Text style={styles.paymentTitle}>Select Payment Method</Text>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === '0' && styles.selectedOption]}
          onPress={() => setPaymentMethod('0')}
          disabled={isLoading}
        >
          <Text style={styles.paymentText}>Cash on Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentOption, paymentMethod === '1' && styles.selectedOption]}
          onPress={() => setPaymentMethod('1')}
          disabled={isLoading}
        >
          <Text style={styles.paymentText}>Online Payment</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder} disabled={isLoading}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  paymentContainer: {
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentOption: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: '#007bff',
    backgroundColor: '#e6f2ff',
  },
  paymentText: {
    fontSize: 16,
  },
  placeOrderButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

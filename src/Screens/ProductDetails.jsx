import { useRoute, useNavigation } from '@react-navigation/native';
import BackButton from 'components/BackButton.jsx';
import CurrencyText from 'components/CurrencyText.jsx';
import { addToCart } from 'features/products/addToCart';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

const PlusIcon = ({ size = 20, color = '#666' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 8v8M8 12h8" stroke={color} strokeWidth="2" />
  </Svg>
);

const MinusIcon = ({ size = 20, color = '#666' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M8 12h8" stroke={color} strokeWidth="2" />
  </Svg>
);

const CartIcon = ({ size = 20, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 5H3m4 8v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6"
      stroke={color}
      strokeWidth="2"
    />
    <Circle cx="9" cy="20" r="1" stroke={color} strokeWidth="2" />
    <Circle cx="15" cy="20" r="1" stroke={color} strokeWidth="2" />
  </Svg>
);

const ProductDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productDetails } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  console.log(productDetails);

  if (!productDetails) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-600">No product details available</Text>
      </View>
    );
  }

  const hasDiscount =
    parseFloat(productDetails.product_item_price) >
    parseFloat(productDetails.product_item_price_after_discount);
  const currentPrice = hasDiscount
    ? productDetails.product_item_price_after_discount
    : productDetails.product_item_price;
  const isExpired = new Date(productDetails.expires_at) < new Date();
  const isOutOfStock = productDetails.product_item_quantity === 0;
  const maxQuantity = Math.min(
    productDetails.product_item_quantity,
    productDetails.product_item_quantity_limit ||
      productDetails.product_item_quantity,
  );

  const handleQuantityChange = change => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (isOutOfStock || isExpired) {
      Alert.alert('Unavailable', 'This product is currently unavailable.');
      return;
    }

    setIsAddingToCart(true);

    try {
      // Call API to add item to cart
      const cartData = {
        store_prod_id: productDetails.store_prod_id,
        quantity: quantity,
      };

      const response = await addToCart(cartData);

      console.log('Item added to cart:', response);

      // Show success message and navigate to cart
      Alert.alert('Success', 'Item added to cart successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Reset quantity
            setQuantity(1);
            // Navigate to cart screen
            navigation.navigate('CartScreen');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add item to cart. Please try again.', [
        { text: 'OK' },
      ]);
      console.error('Add to cart error:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
     

      {/* Product Image */}
      <View className="relative">
        <Image
          source={{ uri: productDetails.pro_img_obj }}
          className="w-full h-80"
          resizeMode="cover"
        />

        {/* Badges */}
        <View className="absolute top-4 left-4">
          {productDetails.is_top === 1 && (
            <View className="bg-green-500 px-3 py-1 rounded-full mb-2">
              <Text className="text-white text-xs font-bold">TOP PRODUCT</Text>
            </View>
          )}
          {isExpired && (
            <View className="bg-red-600 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-bold">EXPIRED</Text>
            </View>
          )}
        </View>
        <View className="absolute top-4 right-4">
          {hasDiscount && (
            <View className="bg-green-500 px-3 py-1 rounded-full mb-2">
              <Text className="text-white text-xs font-bold">ON SALE</Text>
            </View>
          )}
        </View>
      </View>

      {/* Product Info */}
      <View className="p-6">
        {/* Title and Code */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {productDetails.product_name}
          </Text>
          <Text className="text-sm text-gray-500">
            Code: {productDetails.product_code}
          </Text>
        </View>

        {/* Price */}
        <View className="flex-row items-center mb-4">
          <CurrencyText 
            amount={currentPrice}
            className="text-3xl font-bold text-green-600 mr-3"
          />
          {hasDiscount && (
            <CurrencyText 
              amount={productDetails.product_item_price}
              className="text-lg text-gray-400 line-through"
            />
          )}
        </View>

        {/* Description */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-2">
            Description
          </Text>
          <Text className="text-gray-600 leading-6">
            {productDetails.product_desc}
          </Text>
        </View>

        {/* Product Details */}
        <View className="bg-gray-50 rounded-2xl p-4 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Product Details
          </Text>

          <View className="space-y-2">
            <View className="flex-row justify-between py-2">
              <Text className="text-gray-600">Stock Available:</Text>
              <Text className="font-semibold text-gray-800">
                {productDetails.product_item_quantity} units
              </Text>
            </View>

            {productDetails.product_item_quantity_limit && (
              <View className="flex-row justify-between py-2">
                <Text className="text-gray-600">Purchase Limit:</Text>
                <Text className="font-semibold text-gray-800">
                  {productDetails.product_item_quantity_limit} units
                </Text>
              </View>
            )}

            <View className="flex-row justify-between py-2">
              <Text className="text-gray-600">Expires:</Text>
              <Text
                className={`font-semibold ${isExpired ? 'text-red-600' : 'text-gray-800'}`}
              >
                {formatDate(productDetails.expires_at)}
              </Text>
            </View>
          </View>
        </View>

        {/* Quantity Selector */}
        {!isOutOfStock && !isExpired && (
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-lg font-semibold text-gray-800">
              Quantity:
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className={`p-3 rounded-full border border-gray-300 ${quantity <= 1 ? 'opacity-50' : ''}`}
              >
                <MinusIcon size={16} color="#666" />
              </TouchableOpacity>

              <Text className="mx-4 text-xl font-bold text-gray-800 min-w-12 text-center">
                {quantity}
              </Text>

              <TouchableOpacity
                onPress={() => handleQuantityChange(1)}
                disabled={quantity >= maxQuantity}
                className={`p-3 rounded-full border border-gray-300 ${quantity >= maxQuantity ? 'opacity-50' : ''}`}
              >
                <PlusIcon
                  size={16}
                  color={quantity >= maxQuantity ? '#ccc' : '#666'}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Add to Cart Button */}
      <View className="p-6 pt-0">
        <TouchableOpacity
          onPress={handleAddToCart}
          disabled={isOutOfStock || isExpired || isAddingToCart}
          className={`rounded-2xl p-4 ${
            isOutOfStock || isExpired ? 'bg-gray-300' : 'bg-blue-500'
          }`}
        >
          <View className="flex-row items-center justify-center">
            {isAddingToCart ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <CartIcon
                  size={24}
                  color={isOutOfStock || isExpired ? '#666' : '#fff'}
                />
                <Text
                  className={`ml-3 text-lg font-semibold ${
                    isOutOfStock || isExpired ? 'text-gray-600' : 'text-white'
                  }`}
                >
                  {isOutOfStock
                    ? 'Out of Stock'
                    : isExpired
                      ? 'Product Expired'
                      : `Add to Cart - `}
                  {!isOutOfStock && !isExpired && (
                    <CurrencyText 
                    invert={true}
                    sizq

                      amount={(parseFloat(currentPrice) * quantity).toFixed(2)}
                      className={`text-lg font-semibold ${
                        isOutOfStock || isExpired ? 'text-gray-600' : 'text-white'
                      }`}
                    />
                  )}
                </Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

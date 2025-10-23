import { useRoute, useNavigation } from '@react-navigation/native';
import BackButton from 'components/BackButton.jsx';
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
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

const TrashIcon = ({ size = 16, color = '#EF4444' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"
      stroke={color}
      strokeWidth="2"
    />
  </Svg>
);

// Cart Drawer Component
const CartDrawer = ({
  visible,
  onClose,
  cartItems,
  totalPrice,
  onNavigateToCart,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl p-6 max-h-96">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Cart Summary ({cartItems.length}{' '}
              {cartItems.length === 1 ? 'item' : 'items'})
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text className="text-gray-500 text-2xl">×</Text>
            </TouchableOpacity>
          </View>

          {/* Cart Items */}
          <ScrollView
            className="max-h-48 mb-4"
            showsVerticalScrollIndicator={false}
          >
            {cartItems.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center py-3 border-b border-gray-100"
              >
                {/* Product Image */}
                <Image
                  source={{ uri: item.image }}
                  className="w-12 h-12 rounded-lg mr-3"
                  resizeMode="cover"
                />

                {/* Product Info */}
                <View className="flex-1">
                  <Text
                    className="font-semibold text-gray-800 text-sm"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    ${item.price} each
                  </Text>
                </View>

                {/* Quantity Controls */}
                <View className="flex-row items-center mr-3">
                  <TouchableOpacity
                    onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 items-center justify-center"
                    disabled={item.quantity <= 1}
                  >
                    {item.quantity <= 1 ? (
                      <TrashIcon size={14} />
                    ) : (
                      <MinusIcon size={14} color="#666" />
                    )}
                  </TouchableOpacity>

                  <Text className="mx-3 text-sm font-semibold text-gray-800 min-w-6 text-center">
                    {item.quantity}
                  </Text>

                  <TouchableOpacity
                    onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 items-center justify-center"
                    disabled={item.quantity >= item.maxStock}
                  >
                    <PlusIcon
                      size={14}
                      color={item.quantity >= item.maxStock ? '#ccc' : '#666'}
                    />
                  </TouchableOpacity>
                </View>

                {/* Item Total */}
                <View className="items-end min-w-16">
                  <Text className="font-bold text-gray-800 text-sm">
                    ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </Text>
                  <TouchableOpacity
                    onPress={() => onRemoveItem(item.id)}
                    className="mt-1"
                  >
                    <Text className="text-xs text-red-500">Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {cartItems.length === 0 && (
              <View className="py-8 items-center">
                <Text className="text-gray-500 text-center">
                  Your cart is empty
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Total */}
          {cartItems.length > 0 && (
            <View className="flex-row justify-between items-center py-4 border-t border-gray-200">
              <Text className="text-lg font-bold text-gray-800">Total:</Text>
              <Text className="text-xl font-bold text-green-600">
                ${totalPrice.toFixed(2)}
              </Text>
            </View>
          )}

          {/* Actions */}
          <View className="flex-row gap-3">
            {cartItems.length > 0 && (
              <TouchableOpacity
                onPress={onNavigateToCart}
                className="flex-1 bg-blue-500 rounded-2xl py-4"
              >
                <Text className="text-center font-semibold text-white">
                  Go To Cart
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ProductDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productDetails } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [cartItems, setCartItems] = useState([]);

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

  const handleUpdateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    const updatedCartItems = cartItems.map(item => {
      if (item.id === productId) {
        const maxAllowed = Math.min(
          item.maxStock,
          item.purchaseLimit || item.maxStock,
        );
        const validQuantity = Math.min(newQuantity, maxAllowed);
        return { ...item, quantity: validQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);
  };

  const handleRemoveFromCart = productId => {
    const updatedCartItems = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCartItems);

    if (updatedCartItems.length === 0) {
      setShowCartDrawer(false);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock || isExpired) {
      Alert.alert('Unavailable', 'This product is currently unavailable.');
      return;
    }

    const cartItem = {
      id: productDetails.store_prod_id,
      name: productDetails.product_name,
      price: currentPrice,
      quantity: quantity,
      image: productDetails.pro_img_obj,
      maxStock: productDetails.product_item_quantity,
      purchaseLimit: productDetails.product_item_quantity_limit,
    };

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      item => item.id === cartItem.id,
    );
    let updatedCartItems;

    if (existingItemIndex !== -1) {
      // Update existing item quantity
      updatedCartItems = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          const newQuantity = item.quantity + quantity;
          const maxAllowed = Math.min(
            item.maxStock,
            item.purchaseLimit || item.maxStock,
          );
          return {
            ...item,
            quantity: Math.min(newQuantity, maxAllowed),
          };
        }
        return item;
      });
    } else {
      // Add new item to cart
      updatedCartItems = [...cartItems, cartItem];
    }

    setCartItems(updatedCartItems);
    setShowCartDrawer(true);
    setQuantity(1); // Reset quantity after adding
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0,
    );
  };

  const handleNavigateToCart = () => {
    setShowCartDrawer(false);
    navigation.navigate('CartScreen', { cartItems });
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
      <View className="flex-row items-center gap-2 p-4">
        <BackButton />
        <Text className="text-xl font-semibold text-gray-800">
          Product Details
        </Text>
      </View>

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
          <Text className="text-3xl font-bold text-green-600 mr-3">
            ${currentPrice}
          </Text>
          {hasDiscount && (
            <Text className="text-lg text-gray-400 line-through">
              $
              {productDetails.product_item_price &&
                productDetails.product_item_price}
            </Text>
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
          disabled={isOutOfStock || isExpired}
          className={`rounded-2xl p-4 ${
            isOutOfStock || isExpired ? 'bg-gray-300' : 'bg-blue-500'
          }`}
        >
          <View className="flex-row items-center justify-center">
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
                  : `Add to Cart - $${(parseFloat(currentPrice) * quantity).toFixed(2)}`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Cart Drawer */}
      <CartDrawer
        visible={showCartDrawer}
        onClose={() => setShowCartDrawer(false)}
        cartItems={cartItems}
        totalPrice={getTotalPrice()}
        onNavigateToCart={handleNavigateToCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
    </ScrollView>
  );
};

export default ProductDetails;

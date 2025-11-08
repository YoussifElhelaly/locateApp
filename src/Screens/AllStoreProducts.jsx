import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import BackButton from 'components/BackButton.jsx';
import LoadingSpinner from 'components/LoadingSpinner.jsx';
import { getStoreProducts } from 'features/products/getStoreProducts';
import { getSubCategoryProducts } from 'features/products/getSubCategoryProducts';
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Image,
  FlatList,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

const { width } = Dimensions.get('window');

// SVG Icons
const PrescriptionIcon = ({ size = 24, color = '#4A90E2' }) => (
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
    <Path d="M8 12h8" stroke={color} strokeWidth="1.5" />
    <Path d="M8 16h6" stroke={color} strokeWidth="1.5" />
    <Path d="M8 8h8" stroke={color} strokeWidth="1.5" />
    <Circle cx="17" cy="7" r="2" fill={color} />
  </Svg>
);

const UploadIcon = ({ size = 20, color = '#4A90E2' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      stroke={color}
      strokeWidth="2"
    />
    <Path d="M7 10l5-5 5 5" stroke={color} strokeWidth="2" />
    <Path d="M12 15V5" stroke={color} strokeWidth="2" />
  </Svg>
);

const PhotoLibraryIcon = ({ size = 24, color = '#4A90E2' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path d="M12 8v8" stroke={color} strokeWidth="2" />
    <Path d="M8 12h8" stroke={color} strokeWidth="2" />
  </Svg>
);

const CameraIcon = ({ size = 24, color = '#4A90E2' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
      stroke={color}
      strokeWidth="2"
    />
    <Circle cx="12" cy="13" r="4" stroke={color} strokeWidth="2" />
  </Svg>
);

// Product Card Component
export const ProductCard = ({ product, onPress }) => {
  const truncateText = (text, maxLength = 15) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  };

  const hasDiscount =
    parseFloat(product.product_item_price) >
    parseFloat(product.product_item_price_after_discount);

  return (
    <TouchableOpacity
      onPress={() => onPress(product)}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 m-2 p-4"
      style={{ width: (width - 60) / 2 }}
    >
      <View className="relative">
        <Image
          source={{ uri: product.pro_img_obj }}
          className="w-full h-32 rounded-xl mb-3"
          resizeMode="cover"
        />
        {product.is_top === 1 && (
          <View className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">TOP</Text>
          </View>
        )}
        {hasDiscount && (
          <View className="absolute top-2 left-2 bg-green-500 px-2 py-1 rounded-full">
            <Text className="text-white text-xs font-bold">SALE</Text>
          </View>
        )}
      </View>

      <Text className="text-gray-800 font-semibold text-sm mb-1">
        {truncateText(product.product_name)}
      </Text>

      <Text className="text-gray-500 text-xs mb-2" numberOfLines={2}>
        {product.product_desc}
      </Text>

      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          {hasDiscount ? (
            <View>
              <Text className="text-lg font-bold text-green-600">
                ${product.product_item_price_after_discount}
              </Text>
              <Text className="text-sm text-gray-400 line-through">
                ${product.product_item_price}
              </Text>
            </View>
          ) : (
            <Text className="text-lg font-bold text-gray-800">
              ${product.product_item_price}
            </Text>
          )}
        </View>

        <View className="items-end">
          <Text className="text-xs text-gray-500">
            Stock: {product.product_item_quantity}
          </Text>
          {product.product_item_quantity_limit && (
            <Text className="text-xs text-orange-500">
              Limit: {product.product_item_quantity_limit}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Image Picker Modal Component
const ImagePickerModal = ({ visible, onClose, onImageSelected }) => {
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to camera to take photos.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const pickFromLibrary = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel || response.errorMessage) {
        console.log('User cancelled or error:', response.errorMessage);
        return;
      }

      if (response.assets && response.assets[0]) {
        onImageSelected(response.assets[0]);
        onClose();
      }
    });
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission required',
        'Camera permission is required to take photos',
      );
      return;
    }

    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel || response.errorMessage) {
        console.log('User cancelled or error:', response.errorMessage);
        return;
      }

      if (response.assets && response.assets[0]) {
        onImageSelected(response.assets[0]);
        onClose();
      }
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-2xl p-6 mx-8 w-80">
          <Text className="text-2xl font-bold text-center mb-2">Add photo</Text>
          <Text className="text-gray-600 text-center mb-8">
            We respect your privacy, any personal data are safe with us.
          </Text>

          <TouchableOpacity
            onPress={pickFromLibrary}
            className="flex-row items-center py-4 px-2"
          >
            <PhotoLibraryIcon size={24} />
            <Text className="text-blue-500 text-lg font-medium ml-3">
              Import From Photo Library
            </Text>
          </TouchableOpacity>

          <View className="h-px bg-gray-200 my-2" />

          <TouchableOpacity
            onPress={takePhoto}
            className="flex-row items-center py-4 px-2"
          >
            <CameraIcon size={24} />
            <Text className="text-blue-500 text-lg font-medium ml-3">
              Take A Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} className="mt-4 py-3">
            <Text className="text-gray-500 text-center font-medium">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Prescription Card Component
const PrescriptionCard = ({ onUploadPress }) => (
  <View className="bg-gray-100 rounded-2xl p-6 mx-4 mb-6">
    <View className="flex-row items-start mb-4">
      <View className="mr-4 mt-1">
        <PrescriptionIcon size={32} />
      </View>
      <View className="flex-1">
        <Text className="text-xl font-bold text-gray-800 mb-2">
          Upload the prescription & let the pharmacy pick the product for you!
        </Text>
      </View>
    </View>

    <TouchableOpacity
      onPress={onUploadPress}
      className="bg-blue-500 rounded-full py-3 px-6 self-end"
    >
      <View className="flex-row items-center">
        <UploadIcon size={16} color="white" />
        <Text className="text-white font-semibold ml-2">
          Upload prescription
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

// Main Component
export default function AllStoreProducts() {
  const [showImagePicker, setShowImagePicker] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const { storeId, subCategoryId, typeName } = route.params;
console.log(typeName )
  console.log('storeId:', storeId, 'subCategoryId:', subCategoryId);

  // Always call both hooks but conditionally enable them
  const { data: storeProducts, isLoading: storeLoading } = useQuery({
    queryKey: ['getStoreProducts', storeId],
    queryFn: () => getStoreProducts(storeId),
    enabled: !!storeId && storeId !== undefined,
  });

  const { data: subCategoryProducts, isLoading: subCategoryLoading } = useQuery(
    {
      queryKey: ['getSubCategoryProducts', subCategoryId],
      queryFn: () => getSubCategoryProducts(subCategoryId),
      enabled: !!subCategoryId && subCategoryId !== undefined,
    },
  );

  // Determine which data to use and loading state
  const { products, isLoading, pageTitle } = useMemo(() => {
    // If we have a storeId, use store products
    if (storeId) {
      return {
        products: storeProducts || [],
        isLoading: storeLoading,
        pageTitle: 'Store Products',
      };
    }

    // If we have a subCategoryId, use subcategory products
    if (subCategoryId) {
      return {
        products: subCategoryProducts || [],
        isLoading: subCategoryLoading,
        pageTitle: 'Category Products',
      };
    }

    // Default case
    return {
      products: [],
      isLoading: false,
      pageTitle: 'Products',
    };
  }, [
    storeId,
    subCategoryId,
    storeProducts,
    subCategoryProducts,
    storeLoading,
    subCategoryLoading,
  ]);

  const handleUploadPress = () => {
    setShowImagePicker(true);
  };

  const handleImageSelected = image => {
    Alert.alert('Success', 'Prescription uploaded successfully!');
  };

  const handleProductPress = product => {
    navigation.navigate('ProductDetails', { productDetails: product });
  };

  // Filter and sort products
  const sortedProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];

    return products
      .filter(product => product.is_active === 1)
      .sort((a, b) => {
        if (a.is_top !== b.is_top) {
          return b.is_top - a.is_top;
        }
        return new Date(b.created_at) - new Date(a.created_at);
      });
  }, [products]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Dynamic key extractor for different product types
  const getProductKey = (item, index) => {
    if (item.store_prod_id) return item.store_prod_id.toString();
    if (item.sub_category_prod_id) return item.sub_category_prod_id.toString();
    if (item.product_id) return item.product_id.toString();
    if (item.id) return item.id.toString();
    return index.toString();
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <View className="pt-6">
        {
          typeName == "Pharmacy" &&
          <PrescriptionCard onUploadPress={handleUploadPress} />
        }


        {/* Products List */}
        {sortedProducts.length > 0 ? (
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-800 px-4 mb-4">
              All Products
            </Text>
            <FlatList
              data={sortedProducts}
              renderItem={({ item }) => (
                <ProductCard product={item} onPress={handleProductPress} />
              )}
              keyExtractor={getProductKey}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-around' }}
              scrollEnabled={false}
            />
          </View>
        ) : (
          <View className="items-center py-12">
            <Text className="text-gray-500 text-lg">No products available</Text>
          </View>
        )}
      </View>

      <ImagePickerModal
        visible={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        onImageSelected={handleImageSelected}
      />
    </ScrollView>
  );
}

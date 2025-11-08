import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomeScreen from 'Screens/Home.jsx';
import SigninScreen from 'Screens/Auth/signinScreen.jsx';
import SignupScreen from 'Screens/Auth/Signup.jsx';
import WelcomeScreen from 'Screens/welcomeScreen.jsx';
import TabsNavigation from './tabNav';
import SearchResult from 'Screens/searchResult.jsx';
import NavHeader from 'components/navHeader.jsx';
import CategoriesStore from 'Screens/CategoriesStore.jsx';
import CategoryStores from 'Screens/CategoryStores.jsx';
import MapLocationScreen from 'Screens/MapLocationScreen.jsx';
import AllStoreProducts from 'Screens/AllStoreProducts.jsx';
import SplashScreen from 'Screens/SplashScreen.jsx';
import { checkAuthAsync } from 'redux/authSlice.js';
import ProductDetails from 'Screens/ProductDetails.jsx';
import CartScreen from 'Screens/CartScreen.jsx';
import PersonalDetails from 'Screens/account/PersonalDetails.jsx';
import DeliveryAddress from 'Screens/account/DeliveryAddress.jsx';
import AddEditAddress from 'Screens/account/AddEditAddress.jsx';
import MyOrders from 'Screens/account/MyOrders.jsx';
import Settings from 'Screens/account/Settings.jsx';
import CheckoutScreen from 'Screens/CheckoutScreen.jsx';
import OrderDetails from 'Screens/account/OrderDetails.jsx';
import AllStores from 'Screens/allStores.jsx';
import AllStoresMap from 'Screens/allStoresMap.jsx';
import AllTopProductsScreen from 'Screens/allTopProducts.jsx';

const Stack = createNativeStackNavigator();

export default function StackNav() {
  const dispatch = useDispatch();
  const { isAuthenticated, isInitialized, isLoading, error } = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    // Check for existing authentication on app start
    dispatch(checkAuthAsync());
  }, [dispatch]);

  // Show splash screen while checking authentication
  if (!isInitialized || isLoading) {
    return <SplashScreen />;
  }

  // Handle authentication errors gracefully
  if (error && !isAuthenticated) {
    console.warn('Authentication error:', error);
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'MainApp' : 'WelcomeScreen'}
      screenOptions={{
        header: props => <NavHeader {...props} />,
      }}
    >
      {isAuthenticated ? (
        // Authenticated Stack
        <Stack.Group>
          <Stack.Screen
            name="MainApp"
            component={TabsNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="CategoriesStore"
            component={CategoriesStore}
            options={{ title: 'Categories Store' }}
          />
          <Stack.Screen
            name="CategoryStores"
            component={CategoryStores}
            options={{ title: 'Category Stores' }}
          />
          <Stack.Screen
            name="AllStoreProducts"
            component={AllStoreProducts}
            options={{ title: 'Store Products' }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ title: 'Product' }}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{ title: 'Cart' }}
          />
          <Stack.Screen
            name="PersonalDetails"
            component={PersonalDetails}
            options={{ title: 'Personal Details' }}
          />
          <Stack.Screen
            name="DeliveryAddress"
            component={DeliveryAddress}
            options={{ title: 'Delivery Address' }}
          />
          <Stack.Screen
            name="AddEditAddress"
            component={AddEditAddress}
            options={{ title: 'Add/Edit Address' }}
          />
          <Stack.Screen
            name="MyOrders"
            component={MyOrders}
            options={{ title: 'My Orders' }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ title: 'Settings' }}
          />
          <Stack.Screen
            name="SearchResult"
            component={SearchResult}
            options={{ title: 'Search Results' }}
          />
          <Stack.Screen
            name="MapLocationScreen"
            component={MapLocationScreen}
            options={{ title: 'Map Location' }}
          />
          <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{ title: 'Checkout' }}
          />
          <Stack.Screen
            name="OrderDetails"
            component={OrderDetails}
            options={{ title: 'Order Details' }}
          />
          <Stack.Screen
            name="AllStores"
            component={AllStores}
            options={{ title: 'All Stores' }}
          />
          <Stack.Screen
            name="AllStoresMap"
            component={AllStoresMap}
            options={{ title: 'All Stores' }}
          />
          <Stack.Screen
            name="AllTopProductsScreen"
            component={AllTopProductsScreen}
            options={{ title: 'Top Products' }}
          />
        </Stack.Group>
      ) : (
        // Authentication Stack
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SigninScreen" component={SigninScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

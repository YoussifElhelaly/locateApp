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
            name="SearchResult"
            component={SearchResult}
            options={{ title: 'Search Results' }}
          />
          <Stack.Screen
            name="MapLocationScreen"
            component={MapLocationScreen}
            options={{ title: 'Map Location' }}
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

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'Screens/Home.jsx';
import SigninScreen from 'Screens/Auth/signinScreen.jsx';
import WelcomeScreen from 'Screens/welcomeScreen.jsx';
import TabsNavigation from './tabNav';
import SearchResult from 'Screens/searchResult.jsx';
import NavHeader from 'components/navHeader.jsx';
import SignupScreen from 'Screens/Auth/Signup.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CategoriesStore from 'Screens/CategoriesStore.jsx';
import CategoryStores from 'Screens/CategoryStores.jsx';
import MapLocationScreen from 'Screens/MapLocationScreen.jsx';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function StackNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Navigator
        initialRouteName="WelcomeScreen"
        screenOptions={{
          header: props => <NavHeader {...props} />,
        }}
      >
        {/* Authentication Stack */}
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SigninScreen" component={SigninScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Group>

        {/* Main App Stack with Tabs */}
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
      </Stack.Navigator>
    </QueryClientProvider>
  );
}

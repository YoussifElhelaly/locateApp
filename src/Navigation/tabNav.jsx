import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavHeader from 'components/navHeader.jsx';
import AccountScreen from 'Screens/account/accountScreen.jsx';
import CategoryScreen from 'Screens/categoryScreen.jsx';
import HomeScreen from 'Screens/Home.jsx';
import { Image } from 'react-native';
import homeIcon from 'assets/homeIcon.png';
import cartIcon from 'assets/cartIcon.png';
import categoriesIcon from 'assets/categoriesIcon.png';
import userIcon from 'assets/userIcon.png';
import CartScreen from 'Screens/CartScreen.jsx';

const Tab = createBottomTabNavigator();

const colors = {
  main: '#327eb6',
  gray: '#888',
};

function HomeTabIcon({ focused }) {
  return (
    <Image
      source={homeIcon}
      className="size-5 mb-1"
      style={{
        tintColor: focused ? colors.main : colors.gray,
      }}
    />
  );
}

function CartTabIcon({ focused }) {
  return (
    <Image
      source={cartIcon}
      className="size-5 mb-1"
      style={{
        tintColor: focused ? colors.main : colors.gray,
      }}
    />
  );
}

function CategoriesTabIcon({ focused }) {
  return (
    <Image
      source={categoriesIcon}
      className="size-5 mb-1"
      style={{
        tintColor: focused ? colors.main : colors.gray,
      }}
    />
  );
}

function ProfileTabIcon({ focused }) {
  return (
    <Image
      source={userIcon}
      className="size-5 mb-1"
      style={{
        tintColor: focused ? colors.main : colors.gray,
      }}
    />
  );
}

function TabNavHeader(props) {
  return <NavHeader {...props} />;
}

export default function TabsNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        header: TabNavHeader,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeTabIcon,
        }}
      />
      <Tab.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={{
          tabBarLabel: 'Categories',
          tabBarIcon: CategoriesTabIcon,
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: CartTabIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ProfileTabIcon,
        }}
      />
    </Tab.Navigator>
  );
}

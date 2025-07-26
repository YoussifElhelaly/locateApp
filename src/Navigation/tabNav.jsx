import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavHeader from "components/navHeader.jsx";
import AccountScreen from "Screens/account/accountScreen.jsx";
import CategoryScreen from "Screens/categoryScreen.jsx";
import HomeScreen from "Screens/Home.jsx";


const Tab = createBottomTabNavigator();

export default function TabsNavigation() {
    
    return (
        <Tab.Navigator screenOptions={{
            sceneStyle:{
                backgroundColor: "#fff"
            },
            header: props => <NavHeader {...props}/>
        }} initialRouteName="CategoryScreen">
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="CategoryScreen" component={CategoryScreen} />
            <Tab.Screen name="Proflie" component={AccountScreen} />
        </Tab.Navigator>
    )
}
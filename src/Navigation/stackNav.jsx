import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "Screens/Home.jsx";
import SigninScreen from "Screens/Auth/signinScreen.jsx";
import WelcomeScreen from "Screens/welcomeScreen.jsx";
import SignupScreen from "Screens/Auth/signupScreeen.jsx";
import TabsNavigation from "./tabNav";
import SearchResult from "Screens/searchResult.jsx";
import NavHeader from "components/navHeader.jsx";




const Stack = createNativeStackNavigator();
export default function StackNav(){
    return(
        <Stack.Navigator
            initialRouteName="SearchResult"
            screenOptions={{
                header: props => <NavHeader {...props} />
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Overview' }}
            />
            <Stack.Screen
                name="tabNav"
                component={TabsNavigation}
                options={{ title: 'Overview' , headerShown:false }}
            />
            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{ title: 'Overview' , headerShown:false }}
            />
            <Stack.Screen
                name="SigninScreen"
                component={SigninScreen}
                options={{ title: 'Overview' , headerShown:false }}
            />
            <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{ title: 'Overview' , headerShown:false }}
            />
            <Stack.Screen
                name="SearchResult"
                component={SearchResult}
                options={{ title: 'Overview' }}
            />
        </Stack.Navigator>
    )
}
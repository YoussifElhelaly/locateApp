import { Image, ImageBackground, Text, View } from "react-native";
import logo from 'assets/logo.png'
import background from 'assets/welcomeScreen.png'
import Button from "components/Button.jsx";

export default function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground className="flex-1" source={background}> 
            <View className="flex-1 bg-[#f2f2f2e0] justify-evenly items-center">
                <Image source={logo} className="h-[130] w-[110]"></Image>
                <Button onPress={() => {
                    navigation.navigate("SigninScreen")
                }} title={"Get Started"}></Button>
            </View>
        </ImageBackground>
    )
}
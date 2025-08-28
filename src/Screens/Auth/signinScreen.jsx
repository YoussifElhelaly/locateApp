import { useNavigation } from "@react-navigation/native";
import Button from "components/Button.jsx";
import Input from "components/Input.jsx";
import { Text, TouchableOpacity, View } from "react-native";

export default function SigninScreen () {
    const navigate = useNavigation();
    return (
        <View className="m-5 flex-1 justify-center">
            <Text className="text-3xl font-bold">Sign in to Locate</Text>
            <Text>Welcome back! Please enter your details</Text>
            <View>
                <Input placeholder={"Phone number"}/>
                <Input placeholder={"Password"} secureTextEntry={true}/>
                <Text>Forget Password ?</Text>
            </View>
            <Button title={"Sign In"} onPress={()=> navigate.navigate("MainApp")}/>
            <View className="flex-row justify-center items-center">
                <Text className="text-lg">Don't have an account ? </Text>
                <TouchableOpacity onPress={() =>navigate.navigate("SignupScreen")}>
                    <Text className="text-mainColor text-lg">Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

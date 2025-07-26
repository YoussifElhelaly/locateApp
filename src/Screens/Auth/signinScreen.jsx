import Button from "components/Button.jsx";
import Input from "components/Input.jsx";
import { Text, View } from "react-native";

export default function SigninScreen () {
    return (
        <View className="m-5 flex-1 justify-center">
            <Text className="text-3xl font-bold">Sign in to Locate</Text>
            <Text>Welcome back! Please enter your details</Text>
            <View>
                <Input placeholder={"Phone number"}/>
                <Input placeholder={"Password"} secureTextEntry={true}/>
                <Text>Forget Password ?</Text>
            </View>
            <Button title={"Sign In"}/>
        </View>
    )
}

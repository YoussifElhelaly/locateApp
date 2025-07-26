import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import person from '../assets/logo.png'
import Input from "./Input";
export default function NavHeader() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top }} className="px-4 bg-mainColor pb-4">
            <View className=" gap-2">
                <View>
                    <Text className="text-xl font-medium text-white">
                        Hey, Youssif Elhelaly
                    </Text>
                </View>
                <TouchableWithoutFeedback className="w-full">
                    <Text className="text-xl bg-white w-full text-gray-700 px-3 py-1 rounded-md">
                        search for any product or shop
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}
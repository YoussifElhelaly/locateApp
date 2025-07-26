import { Text, TouchableHighlight, View } from "react-native";

export default function Button({ title, onPress }) {
    return (
        <TouchableHighlight onPress={onPress}

            className="bg-mainColor my-4 px-5 py-2 rounded-xl">
            <Text className="text-white p-2 text-xl font-bold text-center">{title}</Text>
        </TouchableHighlight>
    )
}
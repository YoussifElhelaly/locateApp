import { Image, TextInput, View } from "react-native";

export default function Input({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType,
    returnKeyType,
    onSubmitEditing,
    leftIcon,
    className
}) {
    return (
        <View className={`flex-row items-center space-x-2 my-3 bg-gray-200 p-3 rounded-lg ` + className}>
            <Image source={leftIcon} className="h-[16] w-[16]" />
            <TextInput
                className='bg-gray-200 flex-1 ps-3 text-xl text-white placeholder:text-gray-400'
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    )
}
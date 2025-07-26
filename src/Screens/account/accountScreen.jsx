import { Text, View } from "react-native";

export default function AccountScreen(){
    return(
        <View className="mx-5">
            <View className="border-b px-1 pb-2 my-3">
                <Text className="font-bold text-2xl">Personal Details</Text>
                <Text>First name, Last name mobile number</Text>
            </View>
            <View className="border-b px-1 pb-2 my-3">
                <Text className="font-bold text-2xl">Delivery address</Text>
                <Text>Add, edit and delete address</Text>
            </View>
            <View className="border-b px-1 pb-2 my-3">
                <Text className="font-bold text-2xl">My LocatePoints</Text>
                <Text>Manage your LocatePoints</Text>
            </View>
            <View className="border-b px-1 pb-2 my-3">
                <Text className="font-bold text-2xl">My Reviews</Text>
                <Text>All the reviews you have made</Text>
            </View>
            <View className="border-b px-1 pb-2 my-3">
                <Text className="font-bold text-2xl">Setting</Text>
                <Text>Languages, search and nearby</Text>
            </View>
        </View>
    )
}
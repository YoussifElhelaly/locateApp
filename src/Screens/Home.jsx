import TypeCard from "components/TypeCard.jsx";
import { ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
    return (
        <ScrollView className="m-5">
            <View className="border rounded-md py-4 px-3 mb-4">
                <Text>DeliveryTo:</Text>
            </View>
            <View className="flex-row items-center justify-between">
                <Text className="text-2xl font-semibold">
                    Pharmacies
                </Text>
                <Text className="text-xl text-mainColor font-semibold">
                    See all
                </Text>
            </View>
            <View className="flex-row flex-wrap gap-5 mt-4">
                <TypeCard />
                <TypeCard />
                <TypeCard />
                <TypeCard />
                <TypeCard />
                <TypeCard />
                <TypeCard />
            </View>
            <ScrollView className="mt-10" horizontal contentContainerStyle={{
                gap:10
            }}>
                <View className="bg-amber-400 h-[120] w-[310] justify-center items-center  rounded-xl">
                    <Text className="font-bold text-3xl">advertisement area</Text>
                </View>
                <View className="bg-amber-400 h-[120] w-[310] justify-center items-center  rounded-xl">
                    <Text className="font-bold text-3xl">advertisement area</Text>
                </View>
            </ScrollView>
        </ScrollView>
    )
}
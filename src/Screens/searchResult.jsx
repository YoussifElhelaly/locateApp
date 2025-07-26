import SearchCard from "components/searchCard.jsx";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function SearchResult() {
    return (
        <SafeAreaView className="m-5">
            <View>
                <Text className="text-2xl font-medium">2 Results</Text>
            </View>
            <ScrollView>
                <SearchCard></SearchCard>
            </ScrollView>
        </SafeAreaView>
    )
}
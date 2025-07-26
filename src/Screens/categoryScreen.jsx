import CategoryCard from "components/CategoryCard.jsx";
import { ScrollView, View } from "react-native";

export default function CategoryScreen() {
    return (
        <ScrollView className="m-5">
            <View className="flex-row flex-wrap gap-3">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
            </View>
        </ScrollView>
    )
}
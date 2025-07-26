import { Image, Text, View } from "react-native";
import cosmaticsImage from 'assets/cosmatics.png'
export default function CategoryCard() {
    return(
        <View>
            <Image className="w-[110] h-[170] rounded-md mb-3" source={cosmaticsImage}/>
            <Text className="text-center font-semibold">Cosmatics</Text>
        </View>
    )
}
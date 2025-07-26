import { Image, Text, View } from "react-native";
import cosmaticsImage from 'assets/cosmatics.png'
export default function TypeCard() {
    return(
        <View>
            <Image className="w-[70] h-[70] rounded-full mb-3" source={cosmaticsImage}/>
            <Text>Cosmatics</Text>
        </View>
    )
}
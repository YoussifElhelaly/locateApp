import { Image, Text, View } from 'react-native';

export default function MainCategoryComponent({ icon, text }) {
  return (
    <View className="text-center">
      <Image className="size-[100px] rounded-full mb-3 mx-auto" source={icon} />
      <Text className="text-center">{text}</Text>
    </View>
  );
}

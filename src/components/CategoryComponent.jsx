import { Image, Text, TouchableHighlight, View } from 'react-native';

export default function CategoryComponent({ img, text, onPress }) {
  return (
    <TouchableHighlight onPress={onPress} className={`text-center !w-[120px]`}>
      <View>
        <Image
          className="size-[100px] rounded-full mb-3 mx-auto"
          source={{
            uri: img,
          }}
        />
        <Text className="text-center font-bold text-[#000000]">{text}</Text>
      </View>
    </TouchableHighlight>
  );
}

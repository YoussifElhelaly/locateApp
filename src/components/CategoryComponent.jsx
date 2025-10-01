import { Image, Text, TouchableHighlight, View } from 'react-native';

const getDynamicMaxLength = width => {
  // Approximate character count based on width
  // Adjust these values based on your font size and styling
  if (width <= 80) return 8;
  if (width <= 100) return 10;
  if (width <= 120) return 12;
  if (width <= 150) return 15;
  return 18;
};

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

export default function CategoryComponent({ img, text, onPress, width }) {
  const maxTextLength = getDynamicMaxLength(width);

  return (
    <TouchableHighlight onPress={onPress} style={{ width: width }}>
      <View style={{ alignItems: 'center', overflow: 'hidden' }}>
        <Image
          className="size-[100px] rounded-full mb-3"
          source={{
            uri: img,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#000000',
            width: width,
            paddingHorizontal: 4, // Add small padding
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {truncateText(text, maxTextLength)}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

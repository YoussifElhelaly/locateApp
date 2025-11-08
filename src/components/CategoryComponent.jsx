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
    <TouchableHighlight underlayColor={"transparent"} onPress={onPress} style={{ width: width }} className='mx-2'>
      <View style={{ alignItems: 'center', }} className='flex-1 '>
        <Image
          className="size-[80px] rounded-full mb-2"
          source={{
            uri: img,
          }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#000',
            width:"100%",
            fontSize:12,
            flex:1,

          }}
        >
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

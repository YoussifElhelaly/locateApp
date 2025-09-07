import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, Text } from 'react-native';

const ScrollableAds = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const ads = [
    'Advertisement Area',
    'Advertisement Area',
    'Advertisement Area',
    'Advertisement Area',
  ];
  const infiniteAds = [...ads, ...ads, ...ads];

  useEffect(() => {
    if (isUserInteracting) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % infiniteAds.length;
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
      }
      setCurrentIndex(nextIndex);

      if (nextIndex >= ads.length * 2) {
        setTimeout(() => {
          setCurrentIndex(0);
          if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index: 0, animated: false });
          }
        }, 500);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [currentIndex, isUserInteracting]);

  const renderItem = ({ item }) => (
    <View
      style={{
        height: 140,
        width: 310,
        marginRight: 10,
        borderRadius: 12,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>
        {item}
      </Text>
    </View>
  );

  return (
    <View className="mt-10">
      <FlatList
        ref={flatListRef}
        data={infiniteAds}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `ad-${index}`}
        getItemLayout={(_, index) => ({
          length: 320,
          offset: 320 * index,
          index,
        })}
        onTouchStart={() => setIsUserInteracting(true)}
        onTouchEnd={() => setIsUserInteracting(false)}
        onScrollBeginDrag={() => setIsUserInteracting(true)}
        onScrollEndDrag={() => setIsUserInteracting(false)}
        onMomentumScrollEnd={() => setIsUserInteracting(false)}
      />
    </View>
  );
};

export default ScrollableAds;

import React, { useRef, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import TypeCard from 'components/MainCategoryComponent.jsx';
import image1 from '../assets/medicine1.jpg';
import image2 from '../assets/medicine2.jpg';
import image3 from '../assets/market1.png';
import image4 from '../assets/market2.png';
import { mainCategories } from './data';

export default function HomeScreen() {
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);
  const resumeTimeoutRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const images = [image2, image3, image4, image1];
  const infiniteImages = [...images, ...images, ...images];

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!isUserInteracting && flatListRef.current) {
        const nextIndex = (currentIndex + 1) % infiniteImages.length;

        flatListRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        setCurrentIndex(nextIndex);

        if (nextIndex >= images.length * 2) {
          setTimeout(() => {
            setCurrentIndex(0);
            flatListRef.current.scrollToIndex({
              index: 0,
              animated: false,
            });
          }, 500);
        }
      }
    }, 1500);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleTouchStart = () => {
    setIsUserInteracting(true);
    stopAutoScroll();

    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handleTouchEnd = () => {
    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
      startAutoScroll();
    }, 0);
  };

  const handleScrollBeginDrag = () => {
    handleTouchStart();
  };

  const handleScrollEndDrag = () => {
    handleTouchEnd();
  };

  useEffect(() => {
    startAutoScroll();

    return () => {
      stopAutoScroll();
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, [currentIndex, isUserInteracting]);

  const renderImage = ({ item }) => (
    <Image
      source={item}
      style={{
        height: 190,
        width: 310,
        marginRight: 10,
        borderRadius: 12,
      }}
      resizeMode="cover"
    />
  );

  return (
    <View className="m-5 flex-1">
      <View className="mt-10">
        <FlatList
          ref={flatListRef}
          data={infiniteImages}
          renderItem={renderImage}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `image-${index}`}
          getItemLayout={(_, index) => ({
            length: 320,
            offset: 320 * index,
            index,
          })}
          onScrollToIndexFailed={() => {}}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onScrollBeginDrag={handleScrollBeginDrag}
          onScrollEndDrag={handleScrollEndDrag}
          onMomentumScrollEnd={handleScrollEndDrag}
        />
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-semibold mt-8">Main Categories</Text>
        <TouchableOpacity className="text-lg font-semibold mt-8">
          <Text className="text-blue-500 font-bold">See All</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row flex-wrap gap-5 mt-6 mx-auto">
        {mainCategories.map(category => (
          <TypeCard
            key={category.id}
            icon={category.icon}
            text={category.name}
          />
        ))}
      </View>
    </View>
  );
}

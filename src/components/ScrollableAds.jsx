import { useQuery } from '@tanstack/react-query';
import { getAds } from 'features/ads';
import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, Linking } from 'react-native';

const ScrollableAds = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  
  const { data: ads = [], isLoadingAds } = useQuery({
    queryKey: ["ads"],
    queryFn: () => getAds(),
  });

  // Safe scroll function
  const safeScrollToIndex = (index) => {
    if (!flatListRef.current || !ads || ads.length === 0) {
      return;
    }
    
    const safeIndex = Math.max(0, Math.min(index, ads.length - 1));
    
    flatListRef.current.scrollToIndex({ 
      index: safeIndex, 
      animated: true 
    });
  };

  useEffect(() => {
    // Don't start interval if no ads or user is interacting
    if (isUserInteracting || !ads || ads.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % ads.length;
        safeScrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isUserInteracting, ads]); // Add ads to dependency array

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        height: 140,
        width: 310,
        marginRight: 10,
        borderRadius: 12,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => {
        if (item.link) {
          Linking.openURL(item.link);
        }
      }}
    >
      <Image
        source={{ uri: item.image_url }}
        style={{ width: 310, height: 140, borderRadius: 12 }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  // Show loading or empty state
  if (isLoadingAds) {
    return (
      <View className="mt-2">
        <Text>Loading ads...</Text>
      </View>
    );
  }

  if (!ads || ads.length === 0) {
    return (
      <View className="mt-2">
        <Text>No ads available</Text>
      </View>
    );
  }

  return (
    <View className="mt-2">
      <FlatList
        ref={flatListRef}
        data={ads}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `ad-${item.id || index}`}
        getItemLayout={(_, index) => ({
          length: 320,
          offset: 320 * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          // Fallback for scroll failures
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            safeScrollToIndex(info.index);
          });
        }}
        onTouchStart={() => setIsUserInteracting(true)}
        onTouchEnd={() => setIsUserInteracting(false)}
        onScrollBeginDrag={() => setIsUserInteracting(true)}
        onScrollEndDrag={() => setIsUserInteracting(false)}
        onMomentumScrollEnd={() => setIsUserInteracting(false)}
        initialScrollIndex={0}
      />
    </View>
  );
};

export default ScrollableAds;
// Screens/categoryScreen.jsx (Animated Version)
import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Animated } from 'react-native';
import CategoryCard from 'components/CategoryCard.jsx';
import SubcategoryCard from 'components/SubcategoryCard.jsx';
import { mainCategories } from './data';

export default function CategoryScreen() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [animations] = useState(
    mainCategories.reduce((acc, category) => {
      acc[category.id] = new Animated.Value(0);
      return acc;
    }, {}),
  );

  const toggleCategory = categoryId => {
    const isCurrentlyExpanded = expandedCategory === categoryId;

    if (expandedCategory && expandedCategory !== categoryId) {
      Animated.timing(animations[expandedCategory], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    // Toggle current category
    if (isCurrentlyExpanded) {
      Animated.timing(animations[categoryId], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      Animated.timing(animations[categoryId], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <ScrollView className="m-5">
      <View className="space-y-4">
        {mainCategories.map(category => (
          <View key={category.id} className="mb-4">
            {/* Main Category */}
            <TouchableOpacity
              onPress={() => toggleCategory(category.id)}
              className="mb-3"
            >
              <CategoryCard
                category={category}
                isExpanded={expandedCategory === category.id}
              />
            </TouchableOpacity>

            <Animated.View
              style={{
                opacity: animations[category.id],
                maxHeight: animations[category.id].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 200],
                }),
                overflow: 'hidden',
              }}
            >
              <ScrollView>
                <View className="ml-4 flex-row flex-wrap gap-3">
                  {category.subcategories.map(subcategory => (
                    <SubcategoryCard
                      key={subcategory.id}
                      subcategory={subcategory}
                    />
                  ))}
                </View>
              </ScrollView>
            </Animated.View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// Screens/CategoryScreen.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from 'react-native';
import CategoryCard from '../components/CategoryCard';
import SubcategoryCard from '../components/SubcategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { getMainCategories } from '../features/categories/getMainCategories';
import { getSubCategories } from '../features/categories/getSubCategories';
import EmptySubcategories from 'components/categories/EmptySubcategories.jsx';
import EmptyMainCategories from 'components/categories/EmptyMainCategories.jsx';

export default function CategoryScreen() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const animationsRef = useRef({});

  // Fetch main categories
  const {
    data: mainCategoriesData,
    isLoading: isLoadingMainCategories,
    refetch: refetchMainCategories,
  } = useQuery({
    queryKey: ['mainCategories'],
    queryFn: () => getMainCategories(),
  });

  // Fetch subcategories for the expanded category
  const {
    data: subCategoriesData,
    isLoading: isLoadingSubCategories,
    refetch: refetchSubCategories,
  } = useQuery({
    queryKey: ['subCategories', expandedCategory],
    queryFn: () => getSubCategories(expandedCategory),
    enabled: !!expandedCategory, // Only fetch when category is expanded
  });

  // Initialize animations when categories data loads
  useEffect(() => {
    if (mainCategoriesData?.length > 0) {
      const newAnimations = {};
      mainCategoriesData.forEach(category => {
        if (!animationsRef.current[category.cat_id]) {
          newAnimations[category.cat_id] = new Animated.Value(0);
        }
      });
      animationsRef.current = { ...animationsRef.current, ...newAnimations };
    }
  }, [mainCategoriesData]);

  const toggleCategory = categoryId => {
    const isCurrentlyExpanded = expandedCategory === categoryId;

    // Close currently expanded category if different
    if (expandedCategory && expandedCategory !== categoryId) {
      Animated.timing(animationsRef.current[expandedCategory], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }

    // Toggle current category
    if (isCurrentlyExpanded) {
      Animated.timing(animationsRef.current[categoryId], {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      if (animationsRef.current[categoryId]) {
        Animated.timing(animationsRef.current[categoryId], {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchMainCategories();
    if (expandedCategory) {
      await refetchSubCategories();
    }
    setRefreshing(false);
  };

  // Filter subcategories for the expanded category
  const currentSubcategories =
    subCategoriesData?.filter(sub => sub.parent_id === expandedCategory) || [];

  // Show loading spinner for initial load
  if (isLoadingMainCategories) {
    return <LoadingSpinner />;
  }

  // Show empty state if no main categories
  if (!mainCategoriesData || mainCategoriesData.length === 0) {
    return <EmptyMainCategories onRefresh={refetchMainCategories} />;
  }

  return (
    <ScrollView
      className="flex-1 bg-gray-50"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View className="p-5 space-y-4">
        {mainCategoriesData?.map(category => (
          <View key={category.cat_id} className="mb-4">
            {/* Main Category */}
            <TouchableOpacity
              onPress={() => toggleCategory(category.cat_id)}
              className="mb-3"
              activeOpacity={0.8}
            >
              <CategoryCard
                category={category}
                isExpanded={expandedCategory === category.cat_id}
                isLoading={
                  isLoadingSubCategories && expandedCategory === category.cat_id
                }
              />
            </TouchableOpacity>

            {/* Subcategories with Animation */}
            {animationsRef.current[category.cat_id] && (
              <Animated.View
                style={{
                  opacity: animationsRef.current[category.cat_id],
                  maxHeight: animationsRef.current[category.cat_id].interpolate(
                    {
                      inputRange: [0, 1],
                      outputRange: [0, 400], // Increased max height for more subcategories
                    },
                  ),
                  overflow: 'hidden',
                }}
              >
                <View className="ml-4 mt-2">
                  {expandedCategory === category.cat_id && (
                    <>
                      {isLoadingSubCategories ? (
                        <View className="flex-row flex-wrap gap-3">
                          {/* Loading placeholder subcategories */}
                          {Array.from({ length: 3 }).map((_, index) => (
                            <View
                              key={index}
                              className="w-24 h-24 bg-gray-200 rounded-lg animate-pulse"
                            />
                          ))}
                        </View>
                      ) : currentSubcategories.length > 0 ? (
                        <ScrollView
                          horizontal={false}
                          showsVerticalScrollIndicator={false}
                        >
                          <View className="flex-row flex-wrap gap-3">
                            {currentSubcategories.map(subcategory => (
                              <SubcategoryCard
                                key={subcategory.sub_cat_id}
                                subcategory={subcategory}
                              />
                            ))}
                          </View>
                        </ScrollView>
                      ) : (
                        <EmptySubcategories
                          categoryName={category.name}
                          onRefresh={() => refetchSubCategories()}
                        />
                      )}
                    </>
                  )}
                </View>
              </Animated.View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

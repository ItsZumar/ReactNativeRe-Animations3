import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';

import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {
  DOT_INDICATOR_SIZE,
  DOT_SIZE,
  DOT_SPACING,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  PRODUCT,
  PRODUCT_IMAGES,
} from '../../data';

const {height} = Dimensions.get('screen');

export const CustomCarousel = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const animatedRef = useAnimatedRef<FlatList>();
  const scrollY = useSharedValue<number>(0);

  const imageScrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value / ITEM_HEIGHT,
      [0, 1],
      [0, DOT_INDICATOR_SIZE],
    );
    return {
      transform: [{translateY}],
    };
  }, []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={styles.productContainer}>
          <View style={styles.imageList}>
            <Animated.FlatList
              ref={animatedRef}
              data={PRODUCT_IMAGES}
              keyExtractor={(_, i) => i.toString()}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate={'fast'}
              showsVerticalScrollIndicator={false}
              onScroll={imageScrollHandler}
              renderItem={({item}) => {
                return (
                  <View>
                    <Image source={{uri: item}} style={styles.image} />
                  </View>
                );
              }}
            />

            {/* pagination */}
            <View style={styles.pagination}>
              {PRODUCT_IMAGES.map((_, i) => {
                return <View style={[styles.dot]} key={i} />;
              })}

              <Animated.View
                style={[styles.dotIndicator, animatedIndicatorStyle]}
              />
            </View>
          </View>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={[height - ITEM_HEIGHT, height]}>
            <BottomSheetScrollView
              contentContainerStyle={styles.contentContainer}>
              <Text style={styles.title}>{PRODUCT.title}</Text>
              <Text style={styles.price}>{PRODUCT.price}</Text>
              <View style={styles.descContainer}>
                {PRODUCT.description.map((item, i) => (
                  <Text key={i} style={styles.desc}>
                    {item}
                  </Text>
                ))}
              </View>
            </BottomSheetScrollView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
  },
  imageList: {
    height: ITEM_HEIGHT,
    overflow: 'hidden',
  },
  pagination: {
    position: 'absolute',
    top: ITEM_HEIGHT / 2,
    left: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#000',
    marginBottom: DOT_SPACING,
  },
  dotIndicator: {
    width: DOT_INDICATOR_SIZE,
    height: DOT_INDICATOR_SIZE,
    borderRadius: DOT_INDICATOR_SIZE / 2,
    borderWidth: 2,
    borderColor: '#333',
    position: 'absolute',
    top: -DOT_SIZE / 2,
    left: -DOT_SIZE / 2,
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
  },
  descContainer: {
    marginVertical: 20,
  },
  desc: {
    marginBottom: 10,
    lineHeight: 22,
  },
});

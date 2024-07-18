import React from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';

import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {ParallexImage_I} from '../../interface';
import {PARALLEX_IMAGES, PARA_ITEM_HEIGHT, PARA_ITEM_WIDTH} from '../../data';

const {width} = Dimensions.get('screen');

const ParallexImage = ({item, index, scrollX}: ParallexImage_I) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const translateX = interpolate(scrollX.value, inputRange, [
      -width * 0.7,
      0,
      width * 0.7,
    ]);
    return {
      transform: [{translateX}],
    };
  }, [index, scrollX.value]);

  return (
    <Animated.Image
      source={{uri: item.photo}}
      style={[styles.image, animatedStyle]}
    />
  );
};

export const ParallexCarousel = () => {
  const scrollX = useSharedValue<number>(0);

  const imageScrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={PARALLEX_IMAGES}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={imageScrollHandler}
        renderItem={({item, index}) => (
          <View key={index} style={styles.centerContainer}>
            <View style={styles.mainImageContainer}>
              <View style={styles.imageContainer}>
                <ParallexImage item={item} index={index} scrollX={scrollX} />
              </View>
              <Image source={{uri: item.avatar_url}} style={styles.avatar} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImageContainer: {
    borderRadius: 18,
    elevation: 2,
    padding: 12,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    width: PARA_ITEM_WIDTH,
    height: PARA_ITEM_HEIGHT,
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 11,
  },
  image: {
    width: PARA_ITEM_WIDTH * 1.4,
    height: PARA_ITEM_HEIGHT,
    resizeMode: 'cover',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: '#ffffff',
    position: 'absolute',
    bottom: -30,
    right: 60,
  },
});

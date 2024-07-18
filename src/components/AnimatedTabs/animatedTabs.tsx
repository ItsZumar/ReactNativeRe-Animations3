import React, {useCallback, useEffect} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, View} from 'react-native';
import {ANIMATED_TABS_DATA} from '../../data';
import {IMAGES_DATA_I} from '../../interface';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {Tabs} from './tabs';

const {width, height} = Dimensions.get('screen');

export const AnimatedTabs = () => {
  const animatedRef = useAnimatedRef<FlatList>();
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  const onItemPress = useCallback((itemIndex: number) => {
    animatedRef.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={animatedRef}
        data={ANIMATED_TABS_DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={scrollHandler}
        keyExtractor={item => item.key}
        renderItem={({item}: {item: IMAGES_DATA_I}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri: item.image}}
                style={{flex: 1, resizeMode: 'cover'}}
              />
              {/* overlay on image */}
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {backgroundColor: 'rgba(0,0,0,.3)'},
                ]}
              />
            </View>
          );
        }}
      />
      <Tabs
        scrollX={scrollX}
        data={ANIMATED_TABS_DATA}
        onItemPress={onItemPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

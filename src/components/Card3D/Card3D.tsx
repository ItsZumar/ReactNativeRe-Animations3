import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackgroundGradient from './BackgroundGradient';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('screen');
const HEIGHT = 259;
const WIDTH = width * 0.9;

const CARD_HEIGHT = HEIGHT - 5;
const CARD_WIDTH = WIDTH - 5;

export const Card3D = () => {
  const rotateX = useSharedValue<number>(0);
  const rotateY = useSharedValue<number>(0);
  const gesture = Gesture.Pan()
    .onBegin(event => {
      rotateX.value = withTiming(
        interpolate(event.y, [0, CARD_HEIGHT], [10, -10], Extrapolation.CLAMP),
      );
      rotateY.value = withTiming(
        interpolate(event.x, [0, CARD_WIDTH], [-10, 10], Extrapolation.CLAMP),
      );
    })
    .onUpdate(event => {
      rotateX.value = interpolate(
        event.y,
        [0, CARD_HEIGHT],
        [10, -10],
        Extrapolation.CLAMP,
      );
      rotateY.value = interpolate(
        event.x,
        [0, CARD_WIDTH],
        [-10, 10],
        Extrapolation.CLAMP,
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const animatedCard = useAnimatedStyle(() => {
    const rotateXVal = `${rotateX.value}deg`;
    const rotateYVal = `${rotateY.value}deg`;

    return {
      zIndex: 300,
      transform: [
        {perspective: 300},
        {rotateX: rotateXVal},
        {rotateY: rotateYVal},
      ],
    };
  }, []);
  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <BackgroundGradient height={HEIGHT} width={WIDTH} />
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.card, animatedCard]}>
            <View style={styles.cardDetail}>
              <View style={styles.circle} />
              <View style={styles.descContainer}>
                <View style={styles.descPlaceholder} />
                <View style={styles.descPlaceholder} />
              </View>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: 'black',
    position: 'absolute',
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: '#23282D',
  },
  descContainer: {
    marginLeft: 10,
  },
  descPlaceholder: {
    width: 120,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#23282D',
    marginBottom: 10,
  },
  cardDetail: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

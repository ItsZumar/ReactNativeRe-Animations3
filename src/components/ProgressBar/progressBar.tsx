import React, {useEffect} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';

const {width} = Dimensions.get('screen');
const PROGRESSBAR_WIDTH = width * 0.8;

export const AnimatedProgressBar = () => {
  const barWidth = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(barWidth, {
      toValue: PROGRESSBAR_WIDTH,
      bounciness: 10,
      speed: 2,
      useNativeDriver: false,
      delay: 1000,
    }).start();
  }, []);

  return (
    <View style={style.contentContainer}>
      <Animated.View style={[style.progressBar, {width: barWidth}]} />
    </View>
  );
};

const style = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  progressBar: {
    backgroundColor: 'purple',
    height: 20,
    borderRadius: 15,
  },
});

import {useFont} from '@shopify/react-native-skia';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {DonutChart} from './donutChart';

const radius = 140;
const STROKE_WIDTH = 12;

export const DonutChartContainer = () => {
  const targetPercentage = 100;
  const animationState = useSharedValue(0);

  const animateChart = () => {
    animationState.value = 0;
    animationState.value = withTiming(1, {duration: 10000});
  };

  const font = useFont(require('../../../Roboto-Bold.ttf'), 60);
  const smallerFont = useFont(require('../../../Roboto-Light.ttf'), 25);

  if (!font || !smallerFont) {
    return <View />;
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <View style={styles.ringChartContainer}>
          <DonutChart
            backgroundColor="white"
            radius={radius}
            strokeWidth={STROKE_WIDTH}
            percentageComplete={animationState}
            targetPercentage={targetPercentage}
            font={font}
            smallerFont={smallerFont}
          />
        </View>
        <TouchableOpacity onPress={animateChart} style={styles.button}>
          <Text style={styles.buttonText}>Animate !</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringChartContainer: {
    width: radius * 2,
    height: radius * 2,
  },
  button: {
    marginTop: 40,
    backgroundColor: 'orange',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default DonutChartContainer;

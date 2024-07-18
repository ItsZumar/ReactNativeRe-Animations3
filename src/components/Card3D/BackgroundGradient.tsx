import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {
  BlurMask,
  Canvas,
  RoundedRect,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import {useSharedValue} from 'react-native-reanimated';

type BackgroundGradientProps = {
  width: number;
  height: number;
};

const CANVAS_PADDING = 40;

const BackgroundGradient: FC<BackgroundGradientProps> = ({width, height}) => {
  return (
    <Canvas
      style={{width: width + CANVAS_PADDING, height: height + CANVAS_PADDING}}>
      <RoundedRect
        x={CANVAS_PADDING / 2}
        y={CANVAS_PADDING / 2}
        r={20}
        color={'#fff'}
        width={width}
        height={height}>
        <SweepGradient
          c={vec((width + CANVAS_PADDING) / 2, (height + CANVAS_PADDING) / 2)}
          colors={['cyan', 'yellow', 'magenta', 'cyan']}
        />
        <BlurMask blur={5} style={'solid'} />
      </RoundedRect>
    </Canvas>
  );
};

export default BackgroundGradient;

const styles = StyleSheet.create({});

import {StatusBar, useWindowDimensions} from 'react-native';
import React, {useMemo} from 'react';
import {
  Blur,
  Circle,
  ColorMatrix,
  Group,
  Paint,
  SweepGradient,
  vec,
} from '@shopify/react-native-skia';
import Touchable, {useGestureHandler} from 'react-native-skia-gesture';
import {useSharedValue} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const RADIUS = 80;

export const MetaBall = () => {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const cx = useSharedValue(windowWidth / 2);
  const cy = useSharedValue(windowHeight / 2);

  const gestureHandler = useGestureHandler<{
    x: number;
    y: number;
  }>({
    onStart: (_, context) => {
      console.log('start');
      context.x = cx.value;
      context.y = cy.value;
    },
    onActive: ({translationX, translationY, x}, context) => {
      console.log('active');
      cx.value = translationX + x;
      cy.value = translationY + context.y;
    },
    onEnd: () => {
      //   runSpring(cx, windowWidth / 2);
      //   runSpring(cy, windowHeight / 2);
    },
  });

  const layer = useMemo(() => {
    return (
      <Paint>
        {/* pixelOpacity > blurredOpacity * 60 - 30 */}
        <Blur blur={30} />
        <ColorMatrix
          matrix={[
            // R, G, B, A, Bias (Offset)
            // prettier-ignore
            1, 0, 0, 0, 0,
            // prettier-ignore
            0, 1, 0, 0, 0,
            // prettier-ignore
            0, 0, 1, 0, 0,
            // prettier-ignore
            0, 0, 0, 60, -30,
          ]}
        />
      </Paint>
    );
  }, []);

  return (
    <GestureHandlerRootView>
      <StatusBar barStyle={'light-content'} />
      <Touchable.Canvas
        style={{
          flex: 1,
          backgroundColor: '#111',
        }}>
        <Group layer={layer}>
          <Touchable.Circle {...gestureHandler} cx={cx} cy={cy} r={RADIUS} />
          <Circle cx={windowWidth / 2} cy={windowHeight / 2} r={RADIUS} />
          <SweepGradient c={vec(0, 0)} colors={['cyan', 'magenta', 'cyan']} />
        </Group>
      </Touchable.Canvas>
    </GestureHandlerRootView>
  );
};

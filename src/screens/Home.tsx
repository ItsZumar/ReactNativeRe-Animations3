import {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Canvas,
  Circle,
  Group,
  LinearGradient,
  Paint,
  SkImage,
  Skia,
  useCanvasRef,
  vec,
} from '@shopify/react-native-skia';
import {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  AnimatedProgressBar,
  AnimatedTabs,
  Card3D,
  ChasingBubbles,
  Confetti,
  CustomCarousel,
  CustomSegmentedControl,
  DonutChartContainer,
  LayoutAnimation,
  MetaBall,
  ParallexCarousel,
  RippleAnimation,
  ShakeAnimation,
  Stickers,
  SwipeCard,
} from '../components';

const WIDTH = 256;
const HEIGHT = 256;
const R = WIDTH * 0.33;

const pd = PixelRatio.get();

const strokeWidth = 10;
const c = vec(WIDTH / 2, HEIGHT / 2);
const r = (WIDTH - strokeWidth) / 2;

const paint = Skia.Paint();
paint.setColor(Skia.Color('#FF00D4'));

// Home Component

export const Home = () => {
  const button = useSharedValue<boolean>(false);
  const ref = useCanvasRef();
  const [image, setImage] = useState<SkImage | null>(null);

  const animatedRValue = useDerivedValue(() => {
    return button.value
      ? withTiming(WIDTH * 3.1, {duration: 2000})
      : withTiming(WIDTH / 6, {duration: 2000});
  });

  const onPressHandler = () => {
    button.value = !button.value;
  };

  useEffect(() => {
    setTimeout(() => {
      const image = ref.current?.makeImageSnapshot();
      if (image) {
        setImage(image);
      }
    }, 1000);
  }, []);

  return (
    <>
      {/* <Canvas style={{height: HEIGHT}}>
        <Group blendMode="multiply">
          <Circle cx={R} cy={R} r={R} color="cyan" />
          <Circle cx={WIDTH - R} cy={R} r={R} color="magenta" />
          <Circle cx={WIDTH / 2} cy={WIDTH - R} r={R} color="yellow" />
        </Group>
      </Canvas>

      <Canvas style={{width: WIDTH, height: HEIGHT}}>
        <Circle c={c} r={r} color="red">
          <Paint color="#0000FD" />
          <Paint color="#FF0505" style="stroke" strokeWidth={strokeWidth} />
          <Paint color="#FF00D4" style="stroke" strokeWidth={strokeWidth / 2} />
        </Circle>
      </Canvas> */}

      {/* <TouchableOpacity onPress={onPressHandler}>
        <Text>Click</Text>
      </TouchableOpacity>

      <Canvas style={{flex: 1}}>
        <Group color="lightblue">
          <Circle
            paint={paint}
            cx={WIDTH / 6}
            cy={WIDTH / 6}
            r={animatedRValue}
          />
          <Group style="stroke" strokeWidth={10}>
            <Circle cx={(3 * WIDTH) / 6} cy={(3 * WIDTH) / 6} r={WIDTH / 6}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(2 * r, 1.5 * r)}
                colors={['#000000', '#FF1100']}
              />
            </Circle>
          </Group>
        </Group>
      </Canvas> */}

      {/* <Confetti /> */}
      {/* <ChasingBubbles /> */}
      {/* <DonutChartContainer /> */}
      {/* <AnimatedTabs /> */}
      {/* <CustomCarousel /> */}
      {/* <AnimatedProgressBar /> */}
      {/* <ParallexCarousel /> */}
      {/* <RippleAnimation /> */}
      {/* <CustomSegmentedControl /> */}
      {/* <LayoutAnimation /> */}
      {/* <ShakeAnimation /> */}
      {/* <Card3D /> */}
      {/* <Stickers /> */}
      {/* <MetaBall /> */}
      <SwipeCard />
    </>
  );
};

const styles = StyleSheet.create({});

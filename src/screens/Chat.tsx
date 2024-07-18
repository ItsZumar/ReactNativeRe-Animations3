import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {message} from '../data';
import Drawer from '../components/CustomDrawer/Drawer';
import Header from '../components/CustomDrawer/Header';
import Message from '../components/CustomDrawer/Message';
import Overlay from '../components/CustomDrawer/Overlay';

const Chat = () => {
  const active = useSharedValue(false);

  const progress = useDerivedValue(() => {
    return withTiming(active.value ? 1 : 0);
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      progress.value,
      [0, 1],
      [0, -15],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        {perspective: 1000},
        {scale: active.value ? withTiming(0.8) : withTiming(1)},
        {translateX: active.value ? withSpring(240) : withTiming(0)},
        {
          rotateY: `${rotateY}deg`,
        },
      ],
      borderRadius: active.value ? withTiming(28) : withTiming(0),
    };
  });
  return (
    <>
      <Drawer active={active} />
      <Animated.View style={[styles.container, animatedStyle]}>
        <Header active={active} />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={message}
          renderItem={({item, index}) => {
            return <Message item={item} key={index} />;
          }}
        />
        <Overlay active={active} />
      </Animated.View>
    </>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d2733',
    overflow: 'hidden',
  },
});

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const {width} = Dimensions.get('window');

const IMAGE_SIZE = 100;
const BUTTON_SIZE = 40;
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const MyProfile = () => {
  const animatedImgWidth = useSharedValue<number>(IMAGE_SIZE);
  const animatedImgHeight = useSharedValue<number>(IMAGE_SIZE);
  const animatedImgY = useSharedValue<number>(0);
  const animatedBtnScale = useSharedValue<number>(0);
  const animatedInfoTabView = useSharedValue<number>(0);

  const animatedImageStyle = useAnimatedStyle(() => {
    return {
      width: animatedImgWidth.value,
      height: animatedImgHeight.value,
      transform: [{translateY: animatedImgY.value}],
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: animatedBtnScale.value}],
    };
  });

  const animatedInfoTabStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animatedInfoTabView.value}],
    };
  });

  const onImagePress = () => {
    if (animatedImgWidth.value === 100) {
      animatedImgWidth.value = withTiming(IMAGE_SIZE * 3, {duration: 500});
      animatedImgHeight.value = withTiming(IMAGE_SIZE * 3, {duration: 500});
      animatedBtnScale.value = withTiming(1, {duration: 500});
      animatedImgY.value = withTiming(150, {duration: 500});
      animatedInfoTabView.value = withTiming(-width, {duration: 500});
    }
  };

  const onClosePress = () => {
    animatedImgWidth.value = withTiming(IMAGE_SIZE, {duration: 500});
    animatedImgHeight.value = withTiming(IMAGE_SIZE, {duration: 500});
    animatedImgY.value = withTiming(0, {duration: 500});
    animatedBtnScale.value = withTiming(0, {duration: 500});
    animatedInfoTabView.value = withTiming(0, {duration: 500});
  };

  return (
    <View style={styles.container}>
      <AnimatedButton
        style={[styles.closeBtn, animatedButtonStyle]}
        onPress={onClosePress}>
        <Image
          source={require('../assets/images/close.png')}
          style={styles.closeBtnIcon}
        />
      </AnimatedButton>
      <TouchableOpacity activeOpacity={0.9} onPress={onImagePress}>
        <AnimatedImage
          source={require('../assets/images/Profile1.png')}
          style={[styles.image, animatedImageStyle]}
        />
      </TouchableOpacity>

      <Animated.View style={[styles.infoTab, animatedInfoTabStyle]}>
        <Text
          style={{
            color: '#F4F4F4',
            fontSize: 20,
            fontWeight: '600',
            alignSelf: 'center',
          }}>
          John Smith
        </Text>
        <Text
          style={{
            color: '#9C9B9B',
            fontSize: 14,
            alignSelf: 'center',
          }}>
          john@gmail.com
        </Text>
        <Text
          style={{
            color: '#F0F0F0',
            fontSize: 17,
            alignSelf: 'center',
            marginTop: 20,
          }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. rem expedita
          officiis accusamus impedit est eum perspiciatis. Modi quibusdam
          nostrum consequatur veritatis dolore sint reiciendis nisi id. Ut.
        </Text>
      </Animated.View>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d2733',
    padding: 20,
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  closeBtn: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
  },
  closeBtnIcon: {
    width: 34,
    height: 34,
    tintColor: '#ffffff',
  },
  infoTab: {
    width: '100%',
    // height: 100,
    backgroundColor: '#171717',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
  },
});

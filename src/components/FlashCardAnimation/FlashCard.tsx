import React, {FC, useState} from 'react';
import {StyleSheet, Text, View, Pressable, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import {CardData} from '../../interface';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

let CARD_HEIGHT = SCREEN_HEIGHT * 0.4;
let CARD_WIDTH = SCREEN_WIDTH * 0.84;

type Props = {
  data: CardData;
};

const FlashCard: FC<Props> = ({data}) => {
  const {name, number, email} = data;
  const [flipped, setFlipped] = useState(false);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {perspective: 1000},
      {rotateY: `${rotation.value}deg`},
      {scale: scale.value},
      {translateX: translateX.value},
    ],
    backfaceVisibility: 'hidden',
    backgroundColor: '#F1E1FF',
  }));

  const backAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {perspective: 1000},
      {rotateY: `${rotation.value + 180}deg`},
      {scale: scale.value},
      {translateX: translateX.value},
    ],
    backgroundColor: '#62398A',
    backfaceVisibility: 'hidden',
  }));

  const flipCard = () => {
    setFlipped(!flipped);
    scale.value = withSequence(
      withTiming(0.9, {duration: 200}),
      withTiming(1, {duration: 200}),
    );
    translateX.value = withSequence(
      withTiming(flipped ? 25 : -25, {duration: 200}),
      withTiming(0, {duration: 200}),
    );
    rotation.value = withDelay(
      200,
      withTiming(flipped ? 0 : 180, {duration: 500}),
    );
  };

  const renderBackContent = () => (
    <Animated.View style={[styles.card, backAnimatedStyle]}>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, {color: 'white'}]}>{number}</Text>
        <Text style={[styles.category]}>{email}</Text>
      </View>
    </Animated.View>
  );

  const renderFrontContent = () => (
    <Animated.View style={[styles.card, frontAnimatedStyle]}>
      <View style={styles.contentContainer}>
        <Text style={[styles.title, {color: '#232323'}]}>{name}</Text>
        <Text style={[styles.category]}>{email}</Text>
      </View>
    </Animated.View>
  );

  return (
    <View style={styles.scrollContainer}>
      <Pressable onPress={flipCard} style={styles.container}>
        {renderFrontContent()}
        {renderBackContent()}
      </Pressable>
    </View>
  );
};

export default FlashCard;

const styles = StyleSheet.create({
  scrollContainer: {
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: 10,
  },
  card: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 20,
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 32,
  },
  category: {
    fontWeight: '300',
    color: '#4D4D4D',
  },
});

import {useRef, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text} from 'react-native';
import FlashCard from './FlashCard';
import Controls from './Controls';
import {FLASH_CARD_DATA} from '../../data/flashCard';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

export const FlashCards = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollViewRef.current?.scrollTo({
        x: (currentIndex - 1) * SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  const onNext = () => {
    if (currentIndex < FLASH_CARD_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  return (
    <>
      <Text style={styles.header}>Contacts</Text>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        style={styles.list}>
        {FLASH_CARD_DATA.map((data, index) => (
          <FlashCard key={index} {...{data}} />
        ))}
      </ScrollView>
      <Controls onPrev={onPrev} onNext={onNext} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 15,
    textAlign: 'center',
    fontSize: 19,
    color: '#ffffff',
    fontWeight: '700',
  },
  list: {
    marginTop: -80,
  },
});

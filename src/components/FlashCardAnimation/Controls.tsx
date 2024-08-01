import React, {FC} from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
type Props = {
  onPrev: () => void;
  onNext: () => void;
};
const Controls: FC<Props> = ({onPrev, onNext}) => {
  return (
    <View style={styles.controlsContainer}>
      <Pressable onPress={onPrev} style={styles.button}>
        <Text style={styles.text}>L</Text>
      </Pressable>
      <Pressable onPress={onNext} style={styles.button}>
        <Text style={styles.text}>R</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 50,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 19,
  },
});

export default Controls;

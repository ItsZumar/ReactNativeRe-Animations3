import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';

import {SharedValue} from 'react-native-reanimated';

interface HeaderI {
  active: SharedValue<boolean>;
}

export const Header = ({active}: HeaderI) => {
  return (
    <View style={[styles.container]}>
      <Pressable
        style={styles.ham}
        onPress={() => {
          active.value = true;
        }}>
        <Image
          source={require('../../assets/images/Hamburger.png')}
          style={styles.ham}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252d3a',
    padding: 20,
  },
  ham: {
    width: 34,
    height: 30,
  },
});

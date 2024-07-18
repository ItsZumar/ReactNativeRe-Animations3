import {Image, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {SharedValue} from 'react-native-reanimated';

type Props = {
  active: SharedValue<boolean>;
};

const Header = ({active}: Props) => {
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

export default Header;

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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FlashCards} from '../components';

const Contacts = () => {
  return (
    <View style={styles.container}>
      <FlashCards />
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d2733',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

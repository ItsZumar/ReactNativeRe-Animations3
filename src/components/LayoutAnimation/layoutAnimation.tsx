import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

const BUTTON_SIZE = 80;
const MENU_SIZE = BUTTON_SIZE * 7;

export const LayoutAnimation = () => {
  const headerCardHeight = useSharedValue<number>(0);
  const listItemX = useSharedValue<number>(-width - 40);
  const iconRotation = useSharedValue<string>('0deg');
  const scaleMenu = useSharedValue<number>(0);

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: headerCardHeight.value,
    };
  }, []);

  const listItemStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: listItemX.value}],
    };
  }, []);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: iconRotation.value}],
    };
  }, []);

  const menuStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleMenu.value}],
    };
  }, []);

  const addButtonPress = () => {
    'worklet';

    if (iconRotation.value === '-45deg') {
      iconRotation.value = withTiming('0deg');
      scaleMenu.value = withTiming(0, {duration: 1000});
    } else {
      iconRotation.value = withTiming('-45deg');
      scaleMenu.value = withTiming(1, {duration: 1000});
    }
  };

  useEffect(() => {
    headerCardHeight.value = withTiming(350, {duration: 1500});
    listItemX.value = withTiming(0, {duration: 1500});
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Animated.View style={[styles.topContainer, headerStyle]}></Animated.View>

      <View style={{width, height, position: 'absolute'}}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/menuIcon.png')}
            style={styles.menuIcon}
          />
          <Text style={styles.headerText}>DemoApp</Text>
          <Image
            source={require('../../assets/images/illus01.png')}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.greet}>Good Evening John</Text>
        <Text style={styles.activity}>Here is your Activity</Text>
        <FlatList
          data={[1, 1, 1, 1, 1, 1, 1]}
          keyExtractor={(_, i) => i.toString()}
          renderItem={() => (
            <Animated.View
              style={[styles.listItem, listItemStyle]}></Animated.View>
          )}
        />
      </View>

      <Animated.View style={[styles.menuContainer, menuStyle]}></Animated.View>

      <TouchableOpacity style={[styles.floatButton]} onPress={addButtonPress}>
        <Animated.Image
          source={require('../../assets/plus.png')}
          style={[styles.floatButtonIcon, iconStyle]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    width: width,
    backgroundColor: '#095ae6',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    width: width,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#fff',
  },
  greet: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 18,
  },
  activity: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
  },
  listItem: {
    width: width - 40,
    height: 100,
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#DDDDDD',
    borderRadius: 20,
  },
  floatButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    backgroundColor: '#095ae6',
    borderRadius: BUTTON_SIZE / 2,
    position: 'absolute',
    right: 20,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatButtonIcon: {
    width: BUTTON_SIZE / 2,
    height: BUTTON_SIZE / 2,
    tintColor: 'white',
  },
  menuContainer: {
    width: MENU_SIZE,
    height: MENU_SIZE,
    backgroundColor: 'rgba(9,90,230,.7)',
    borderRadius: MENU_SIZE / 2,
    position: 'absolute',
    bottom: -220,
    right: -220,
  },
});

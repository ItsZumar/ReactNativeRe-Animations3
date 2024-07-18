import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {INDICATOR_I, MEASURES_I, TABS_I, TAB_I} from '../../interface';
import {ANIMATED_TABS_DATA, TABS_FONT_SIZE} from '../../data';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
} from 'react-native-reanimated';
const {width} = Dimensions.get('screen');

const Indicator = ({measures, scrollX}: INDICATOR_I) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange: number[] = ANIMATED_TABS_DATA.map((_, i) => i * width);
    const outputWidthRange = measures.map(m => m.width);
    const outputLeftRange = measures.map(m => m.x);
    return {
      width: interpolate(scrollX.value, inputRange, outputWidthRange),
      left: interpolate(scrollX.value, inputRange, outputLeftRange),
    };
  }, []);

  return <Animated.View style={[styles.indicator, animatedStyle]} />;
};

const Tab = React.forwardRef(({item, onItemPress}: TAB_I, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text style={styles.tabTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

export const Tabs = ({data, scrollX, onItemPress}: TABS_I) => {
  const containerRef = useAnimatedRef<View>();
  const [measures, setMeasures] = useState<MEASURES_I[]>([]);

  useEffect(() => {
    let m = [];
    data.forEach(item => {
      item.ref.current?.measureLayout(
        containerRef.current,
        //onSuccess
        (x: number, y: number, width: number, height: number) => {
          m.push({
            x,
            y,
            width,
            height,
          });

          if (m.length === data.length) {
            setMeasures(m);
          }
        },
      );
    });
  }, []);

  return (
    <View style={styles.tabsContainer}>
      <View style={styles.tabsInnerContainer} ref={containerRef}>
        {data.map((item, index) => {
          return (
            <Tab
              item={item}
              key={item.key}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}
            />
          );
        })}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    position: 'absolute',
    top: 40,
    width,
  },
  tabsInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tabTitle: {
    color: '#ffffff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: TABS_FONT_SIZE,
  },
  indicator: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    height: 4,
    bottom: -10,
  },
});

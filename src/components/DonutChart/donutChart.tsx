import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {Canvas, Path, SkFont, Skia, Text} from '@shopify/react-native-skia';

interface CircularProgressProps {
  strokeWidth: number;
  radius: number;
  backgroundColor: string;
  percentageComplete: any;
  font: SkFont;
  smallerFont: SkFont;
  targetPercentage: number;
}

export const DonutChart: FC<CircularProgressProps> = ({
  strokeWidth,
  radius,
  percentageComplete,
  font,
  targetPercentage,
  smallerFont,
}) => {
  const innerRadius = radius - strokeWidth / 2; //size inside the ring
  const targetText = `${targetPercentage}`;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const width = font.getTextWidth(targetText);
  const titleWidth = smallerFont.getTextWidth('Power');

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color="orange"
          style="stroke"
          strokeJoin="round"
          strokeWidth={strokeWidth}
          strokeCap="round"
          start={0}
          end={percentageComplete}
        />
        <Text
          x={innerRadius - width / 2}
          y={radius + strokeWidth}
          text={targetText}
          font={font}
          opacity={percentageComplete}
          color="black"
        />
        <Text
          x={innerRadius - titleWidth / 2}
          y={radius + 45}
          text={'Power'}
          font={smallerFont}
          opacity={percentageComplete}
          color="black"
        />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React from 'react';
import {Dimensions} from 'react-native';
import {Canvas, Skia, useFont, useImage} from '@shopify/react-native-skia';

import {useSharedValue} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {GestureHandler} from './GestureHandler';
import {Picture, PictureDimensions} from './Picture';
import {HelloSticker, HelloStickerDimensions} from './HelloSticker';
import {LocationSticker, LocationStickerDimensions} from './LocationSticker';

const {width, height} = Dimensions.get('window');

const zurich = require('../../assets/images/zurich.jpg');
const aveny = require('../../assets/fonts/aveny.ttf');

export const Stickers = () => {
  const pictureMatrix = useSharedValue(Skia.Matrix());
  const helloMatrix = useSharedValue(Skia.Matrix());
  const locationMatrix = useSharedValue(Skia.Matrix());
  const image = useImage(zurich);
  const font = useFont(aveny, 56);
  if (!image || !font) {
    return null;
  }
  return (
    <GestureHandlerRootView>
      <Canvas style={{width, height}}>
        <Picture matrix={pictureMatrix} image={image} />
        <HelloSticker matrix={helloMatrix} />
        <LocationSticker font={font} matrix={locationMatrix} />
      </Canvas>
      <GestureHandler matrix={pictureMatrix} dimensions={PictureDimensions} />
      <GestureHandler
        matrix={helloMatrix}
        dimensions={HelloStickerDimensions}
      />
      <GestureHandler
        matrix={locationMatrix}
        dimensions={LocationStickerDimensions}
      />
    </GestureHandlerRootView>
  );
};

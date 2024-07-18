import {SharedValue} from 'react-native-reanimated';

export interface PARALLEX_IMAGES_I {
  key: string;
  photo: string;
  avatar_url: string;
}

export interface ParallexImage_I {
  item: PARALLEX_IMAGES_I;
  index: number;
  scrollX: SharedValue<number>;
}

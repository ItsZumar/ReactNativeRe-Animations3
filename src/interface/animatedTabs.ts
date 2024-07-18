import {SharedValue} from 'react-native-reanimated';

export interface IMAGES_I {
  man: string;
  women: string;
  kids: string;
  skullcandy: string;
  help: string;
}

export interface IMAGES_DATA_I {
  image: string;
  key: string;
  title: string;
  ref: any;
}

export interface TABS_I {
  scrollX: SharedValue<number>;
  data: IMAGES_DATA_I[];
  onItemPress: (index: number) => void;
}

export interface TAB_I {
  item: IMAGES_DATA_I;
  onItemPress: (index: number) => void;
}

export interface MEASURES_I {
  x: any;
  y: any;
  width: any;
  height: any;
}

export interface INDICATOR_I {
  measures: MEASURES_I[];
  scrollX: SharedValue<number>;
}

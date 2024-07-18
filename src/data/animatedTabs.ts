import React from 'react';
import {IMAGES_DATA_I, IMAGES_I} from '../interface';

export const images: IMAGES_I = {
  man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids: 'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help: 'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};

export const ANIMATED_TABS_DATA: IMAGES_DATA_I[] = Object.keys(images).map(
  i => ({
    key: i,
    title: i,
    image: images[i],
    ref: React.createRef(),
  }),
);

export const TABS_FONT_SIZE = 70 / ANIMATED_TABS_DATA.length;

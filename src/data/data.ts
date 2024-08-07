import {ImageProps} from 'react-native';

export interface OnboardingData {
  id: number;
  image: ImageProps;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    image: require('../assets/images/illus01.png'),
    text: 'Lorem Ipsum dolor sit amet',
    textColor: '#f8dac2',
    backgroundColor: '#154f40',
  },
  {
    id: 2,
    image: require('../assets/images/illus02.png'),
    text: 'Lorem Ipsum dolor sit amet',
    textColor: '#154f40',
    backgroundColor: '#fd94b2',
  },
  {
    id: 3,
    image: require('../assets/images/illus03.png'),
    text: 'Lorem Ipsum dolor sit amet',
    textColor: 'black',
    backgroundColor: '#f8dac2',
  },
];

export default data;

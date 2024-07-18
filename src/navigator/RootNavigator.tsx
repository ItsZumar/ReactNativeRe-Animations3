import React from 'react';
import {Home} from '../screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnboardingScreen from '../OnBoarding';

export type RootStackParamList = {
  OnboardingScreen: undefined;
  Home: undefined;
};

const RootNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator initialRouteName="Home">
      {/* <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigator/RootNavigator';
import CustomDrawerRootNavigator from './src/navigators/RootNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <RootNavigator /> */}
        <CustomDrawerRootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

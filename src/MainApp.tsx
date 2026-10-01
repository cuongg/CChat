import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from 'navigation/AppNavigator';
import {Text} from 'react-native';

const MainApp = () => {
  return (
    <NavigationContainer fallback={() => <Text>...Loading</Text>}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default MainApp;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen, PasswordScreen} from 'screen';

const Stack = createStackNavigator();

const UnAuthNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      {/* <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
      <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} /> */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="PasswordScreen" component={PasswordScreen} />
    </Stack.Navigator>
  );
};

export default UnAuthNavigator;

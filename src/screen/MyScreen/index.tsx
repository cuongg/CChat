import React from 'react';
import {View, Text} from 'react-native';

const MyScreen = (props: any) => {
  console.log('MyScreen -> props', props);
  return (
    <View style={{flex: 1, backgroundColor: 'green'}}>
      <Text>My Screen</Text>
    </View>
  );
};

export default MyScreen;

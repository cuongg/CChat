import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from 'navigation/AppNavigator';
import {Text, SafeAreaView} from 'react-native';
import UnAuthNavigator from 'navigation/UnAuthNavigator';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/reducers';
import _ from 'lodash';

const MainApp = () => {
  const {data} = useSelector((state: RootState) => state.userReducer);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer fallback={() => <Text>...Loading</Text>}>
        {_.isEmpty(data) ? <UnAuthNavigator /> : <AppNavigator />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default MainApp;

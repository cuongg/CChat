import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from 'navigation/AppNavigator';
import {Text, SafeAreaView, View, StyleSheet} from 'react-native';
import UnAuthNavigator from 'navigation/UnAuthNavigator';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/reducers';
import _ from 'lodash';
import AppLoading from 'components/AppLoading';
import color from 'helpers/color';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: color.fade20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const MainApp = () => {
  const {data} = useSelector((state: RootState) => state.userReducer);
  const {isLoading} = useSelector((state: RootState) => state.loadingReducer);

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        {isLoading && (
          <View style={styles.container}>
            <AppLoading size={'large'} />
          </View>
        )}
        <NavigationContainer fallback={() => <Text>...Loading</Text>}>
          {_.isEmpty(data) ? <UnAuthNavigator /> : <AppNavigator />}
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default MainApp;

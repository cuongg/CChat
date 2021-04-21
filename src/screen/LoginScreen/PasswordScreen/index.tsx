import {useRoute} from '@react-navigation/native';
import {ICON, IMG} from 'assets';
import AppButton from 'components/AppButton';
import AppInput from 'components/AppInput';
import color from 'helpers/color';
import {DEVICE} from 'helpers/dimension';
import padding from 'helpers/padding';
import I18n from 'locale';
import React, {useEffect, useState} from 'react';
import {Alert, ImageBackground, Keyboard, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';

const PasswordScreen = () => {
  //! State
  const route: any = useRoute();
  const {confirmation} = route.params;
  // const navigation = useNavigation();
  const [value, setValue] = useState('');
  // const [error, setError] = useState('');

  const dispatch = useDispatch();

  //! Function
  const confirmCode = async () => {
    Keyboard.dismiss();
    try {
      dispatch({type: '_REQUEST'});
      const res = await confirmation.confirm(value);
    } catch (error) {
      dispatch({type: ''});
      setValue('');
      Alert.alert(I18n.t('alert.alert'), I18n.t('alert.wrongCode'));
    }
  };
  //! UseEffect
  useEffect(() => {
    Alert.alert(I18n.t('alert.alert'), I18n.t('alert.messageOTP'));
  }, []);

  //! Render
  return (
    <ImageBackground source={IMG.imgBackgroundLogin} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.viewInput}>
          <AppInput
            icon={ICON.pass}
            placeholder="123456"
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
            maxLength={6}
          />
        </View>
        <AppButton
          text={I18n.t('login.enter')}
          onPress={confirmCode}
          disabled={!value || value.length < 6}
        />
      </View>
    </ImageBackground>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    padding: padding.p20,
  },
  container: {
    height: DEVICE.HEIGHT * 0.75,
    backgroundColor: color.white,
    justifyContent: 'center',
    borderRadius: padding.p12,
    padding: padding.p20,
  },
  textError: {
    color: 'red',
  },
  viewInput: {
    marginBottom: padding.p20,
  },
});

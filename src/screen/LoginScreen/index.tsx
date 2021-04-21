import {ICON, IMG} from 'assets';
import AppInput from 'components/AppInput';
import React, {useEffect, useState} from 'react';
import {ImageBackground, View, Alert, Keyboard} from 'react-native';
import styles from './styles';
import I18n from 'locale';
import AppButton from 'components/AppButton';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {userActions} from 'redux/actions';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //! State
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  //! Function
  const convertPhoneNumber = () => {
    let result = phoneNumber;
    if (result[0] === '0') {
      result = '84' + result.substr(1);
    }
    return `+${result}`;
  };

  const signInWithPhoneNumber = async () => {
    Keyboard.dismiss();
    try {
      dispatch({type: '_REQUEST'});
      const confirmation = await auth().signInWithPhoneNumber(
        convertPhoneNumber(),
      );
      navigation.navigate('PasswordScreen', {confirmation});
    } catch (error) {
      let message = error.userInfo.message;
      if (
        message.includes('incorrect') ||
        message.includes('TOO_') ||
        message.includes('format of the phone number')
      ) {
        message = I18n.t('alert.invalidPhoneNumber');
      }
      Alert.alert(I18n.t('alert.alert'), message);
    } finally {
      dispatch({type: ''});
    }
  };

  //! UseEffect
  useEffect(() => {
    auth().onAuthStateChanged((user: any) => {
      if (user) {
        dispatch(userActions.loginSuccess(user));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (!isNaN(Number(phoneNumber)) && phoneNumber?.toString().length > 8) {
      setError('');
    } else {
      setError(I18n.t('validation.number') + '. ' + I18n.t('validation.min'));
    }
  }, [phoneNumber]);

  //! Render
  return (
    <ImageBackground source={IMG.imgBackgroundLogin} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.viewInput}>
          <AppInput
            icon={ICON.phone}
            placeholder="039xxxxxxx"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={12}
            keyboardType="numeric"
          />
        </View>
        <AppButton
          text={I18n.t('login.submit')}
          onPress={signInWithPhoneNumber}
          disabled={!_.isEmpty(error)}
        />
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

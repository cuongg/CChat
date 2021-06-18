import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import styles from './styles';
import AppText from 'components/AppText';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from 'redux/actions';
import {HIT_SLOP} from 'helpers/constants';
import database from '@react-native-firebase/database';
import {RootState} from 'redux/reducers';
import {stringToColour} from 'helpers/function';

const SlideMenu = (props: any) => {
  const dispatch = useDispatch();
  const {navigation} = props;

  const userReducer = useSelector((state: RootState) => state.userReducer);

  const [name, setName] = useState(userReducer.data.name);

  useEffect(() => {
    database()
      .ref(`/call/${userReducer.data.uid}`)
      .on('child_added', (childSnapShot: any) => {
        const value = childSnapShot.toJSON();
        if (value && value.receiver._id === userReducer.data.uid) {
          navigation.navigate('ReceiverScreen', {...value});
        }
      });
  }, [navigation, userReducer]);

  const onBlur = () => {
    if (name) {
      dispatch(userActions.loginSuccess({...userReducer.data, name}));
    } else {
      setName(userReducer.data.name);
    }
  };

  const onSignOut = async () => {
    try {
      dispatch({type: '_REQUEST'});
      await auth().signOut();
    } catch (error) {
      console.log('onSignOut -> error', error);
    } finally {
      dispatch(userActions.logOut());
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            ...styles.avatar,
            backgroundColor: stringToColour(userReducer.data.uid),
          }}>
          <AppText style={styles.txt}>{userReducer.data.name[0]}</AppText>
        </View>
        <TextInput
          style={styles.txtInput}
          defaultValue={name || userReducer.data.name}
          onChangeText={setName}
          onBlur={onBlur}
        />
        <AppText style={styles.txt}>{userReducer.data.phoneNumber}</AppText>
      </View>
      <TouchableOpacity onPress={onSignOut} hitSlop={HIT_SLOP}>
        <AppText style={styles.txt}>Đăng xuất</AppText>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SlideMenu);

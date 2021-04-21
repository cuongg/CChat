import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import AppText from 'components/AppText';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {userActions} from 'redux/actions';
import {HIT_SLOP} from 'helpers/constants';

const SlideMenu = (props: any) => {
  const dispatch = useDispatch();

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
      <TouchableOpacity onPress={onSignOut} hitSlop={HIT_SLOP}>
        <AppText style={styles.txt}>Đăng xuất</AppText>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(SlideMenu);

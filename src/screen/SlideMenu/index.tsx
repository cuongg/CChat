import React, {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import AppText from 'components/AppText';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from 'redux/actions';
import {HIT_SLOP} from 'helpers/constants';
import database from '@react-native-firebase/database';
import {RootState} from 'redux/reducers';

const SlideMenu = (props: any) => {
  const dispatch = useDispatch();
  const {navigation} = props;

  const userReducer = useSelector((state: RootState) => state.userReducer);

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

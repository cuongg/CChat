import database from '@react-native-firebase/database';
import AppHeader from 'components/AppHeader';
import {DIMENSION} from 'helpers/dimension';
import {stringToColour} from 'helpers/function';
import _ from 'lodash';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from 'redux/reducers';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ModalInformation from './ModalInformation';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppText from 'components/AppText';
import styles from './styles';

const NUMBER_MESS = 20;
const NUMBER_EARLY = NUMBER_MESS + 1;

const ChatScreen = () => {
  const userReducer = useSelector((state: RootState) => state.userReducer);

  const [messages, setMessages] = useState<any[]>([]);
  const [loadEarlier, setLoadEarlier] = useState(true);
  const [isLoadingEarlier, setIsLoadingEarlier] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    database()
      .ref('/chat-group')
      .limitToLast(NUMBER_MESS)
      .on('child_added', (snapShot) => {
        const value = snapShot.toJSON() || {};
        const message = [value];
        setMessages((previousMessages) =>
          _.uniqBy(GiftedChat.append(previousMessages, message), '_id'),
        );
      });
  }, []);

  const onLoadEarlier = () => {
    setIsLoadingEarlier(true);
    database()
      .ref('/chat-group')
      .orderByChild('createdAt')
      .endAt(_.last(messages).createdAt)
      .limitToLast(NUMBER_EARLY)
      .once('value', (childSnapshot) => {
        setIsLoadingEarlier(false);
        const value = childSnapshot.toJSON() || {};
        const messageArr = Object.values(value);
        messageArr.sort((a: any, b: any) =>
          moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1,
        );
        messageArr.shift();
        setMessages((previousMessages) =>
          GiftedChat.append(messageArr, previousMessages),
        );
        if (messageArr.length < NUMBER_MESS) {
          setLoadEarlier(false);
        }
      });
  };

  const onSend = useCallback((message: any[] = []) => {
    message[0].createdAt = moment().toJSON();
    message[0].user.phone = userReducer.data.phoneNumber;
    // setMessages((previousMessages) =>
    //   GiftedChat.append(previousMessages, message),
    // );
    database().ref('/chat-group').push(message[0]);
  }, []);

  return (
    <>
      <ModalInformation data={data} onClose={() => setData({})} />
      <AppHeader title={'CChat'} />
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: userReducer.data.uid,
          name: userReducer.data.name,
        }}
        loadEarlier={loadEarlier && messages.length >= NUMBER_MESS}
        onLoadEarlier={onLoadEarlier}
        isLoadingEarlier={isLoadingEarlier}
        renderAvatarOnTop
        renderUsernameOnMessage
        renderAvatar={({currentMessage}: any) => (
          <TouchableOpacity
            style={{
              ...styles.avatar,
              backgroundColor: stringToColour(currentMessage.user._id),
            }}
            onPress={() => setData(currentMessage)}>
            <AppText style={styles.txt}>{currentMessage.user.name[0]}</AppText>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default ChatScreen;

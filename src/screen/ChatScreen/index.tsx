import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/reducers';
import database from '@react-native-firebase/database';
import _ from 'lodash';
import moment from 'moment';

const NUMBER_MESS = 20;

const ChatScreen = () => {
  const userReducer = useSelector((state: RootState) => state.userReducer);

  const [messages, setMessages] = useState<any[]>([]);

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

  const onSend = useCallback((message: any[] = []) => {
    message[0].createdAt = moment().toJSON();
    database().ref('/chat-group').push(message[0]);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: userReducer.data.uid,
        name: userReducer.data.phoneNumber,
      }}
      renderAvatarOnTop
    />
  );
};

export default ChatScreen;

import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/reducers';

const ChatScreen = () => {
  const userReducer = useSelector((state: RootState) => state.userReducer);
  console.log('ChatScreen -> userReducer', userReducer);

  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
        // You can also add a video prop:
        // Mark the message as sent, using one tick
        sent: true,
        // Mark the message as received, using two tick
        received: true,
        // Mark the message as pending with a clock loader
        pending: true,
        // Any additional custom parameters are passed through
      },
    ]);
  }, []);

  const onSend = useCallback((message: any[] = []) => {
    console.log('onSend -> message', message);
    // message[0].pending = true;
    message[0].system = true;
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: 1,
      }}
      render
    />
  );
};

export default ChatScreen;

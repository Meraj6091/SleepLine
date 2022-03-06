//@refresh reset
import React, {useState, useRef, useEffect, useCallback} from 'react';

import {useSelector} from 'react-redux';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const chatsRef = firestore().collection('chats');

const DocChat = ({route, navigation}) => {
  const state = useSelector((state) => state.userData);

  const {params} = route;

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});
  //check double destructing
  useEffect(() => {
    handler();
    const subscribe = chatsRef.onSnapshot((querySnapshot) => {
      const messagesFireStore = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const message = doc.data();
          return {...message, createdAt: message.createdAt.toDate()};
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFireStore);
    });
    return () => subscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      const filterdUser = messages.filter(
        (data) =>
          data.user.docId === state._id && data.user.userId === params.userId,
      );

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, filterdUser),
      );
    },
    [messages],
  );

  const handler = () => {
    const user = {
      _id: state._id,
      name: state.firstName,
      userId: params.userId,
      docId: state._id,
      seen: true,
    };
    setUser(user);
  };
  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }
  return <GiftedChat messages={messages} onSend={handleSend} user={user} />;
};

export default DocChat;

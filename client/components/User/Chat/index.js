//@refresh reset
import React, {useState, useRef, useEffect, useCallback} from 'react';

import {useSelector} from 'react-redux';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import SendIcon from '../../../assets/icons/SendIcon';
import {Image, TouchableOpacity} from 'react-native';

const chatsRef = firestore().collection('chats');

const UserChat = ({route, navigation}) => {
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
      let filterdUser = messages.filter(
        (data) =>
          data.user.userId === state._id && data.user.docId === params.docId,
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
      docId: params.docId,
      userId: state._id,
    };
    setUser(user);
  };
  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  }

  const renderSend = (sendProps) => {
    if (sendProps.text.trim().length > 0) {
      return (
        <TouchableOpacity>
          <SendIcon />
        </TouchableOpacity>
      );
    }
    return null;
  };
  return <GiftedChat messages={messages} onSend={handleSend} user={user} />;
};

export default UserChat;

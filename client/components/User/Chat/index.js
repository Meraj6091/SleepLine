//@refresh reset
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  BackHandler,
  FlatList,
  StatusBar,
  Modal,
} from 'react-native';

import {useSelector} from 'react-redux';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

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
  return <GiftedChat messages={messages} onSend={handleSend} user={user} />;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSnapBar: {
    bottom: 280,
  },
  image: {
    width: 300,
    height: 150,
    marginVertical: 30,
  },
  textTitle: {
    fontFamily: 'Foundation',
    fontSize: 30,
    marginVertical: 10,
  },
  textBody: {
    fontFamily: 'Foundation',
    fontSize: 16,
  },
  formContainer: {
    width: '90%',
    marginVertical: 10,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  inputText: {
    color: '#52524e',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  submit: {
    width: '45%',
    height: 50,
    borderColor: 'blue',
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0,
    margin: 5,
  },
  submitText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default UserChat;

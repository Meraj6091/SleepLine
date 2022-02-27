import React, {useState, useRef, useEffect} from 'react';
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

const UserChat = ({route, navigation}) => {
  const {params} = route;
  //check double destructing

  return (
    <View style={styles.container}>
      <Text>Chat Screen</Text>
    </View>
  );
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

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
import {getAllUserInfo} from '../service';
import {docChannel} from './service';

const PaymentProcess = ({route, navigation}) => {
  const {params} = route;
  //check double destructing

  const {data} = params;
  let user = data?.user;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (user) {
      getAllUsers(user);
    }
  }, [user]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const getAllUsers = async (user) => {
    try {
      const {data} = await getAllUserInfo({user: user});
      if (data)
        setUserData({
          ...data.email[0],
          ...data.userProfile[0],
          docId: params.docId,
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChannel = async () => {
    const {data} = await docChannel(userData);
    if (data) {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <Text onPress={handleChannel}>Pay now</Text>
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

export default PaymentProcess;

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
import Chat from 'react-native-vector-icons/Entypo';
import {Button} from 'react-native-paper';
import {Input} from 'react-native-elements';
import {formatDate} from '../../Helpers/dateFormatter';
import Medical from 'react-native-vector-icons/FontAwesome5';
import Close from 'react-native-vector-icons/Fontisto';

const PationDetail = ({visible, setVisible, userData, params}) => {
  const {data} = userData;
  const {navigation} = params;

  // const handleChannel = () => {
  //   navigation.navigate('PaymentProcess', {data: params, docId: data._id});
  // };
  const handleMedicalRecords = () => {
    navigation.navigate('AddMedicalRecords', {
      data: params,
      userData: userData,
    });
  };
  const handleChat = () => {
    navigation.navigate('DocChat', {userId: data._id});
  };
  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginRight: 10,
              marginTop: 10,
            }}>
            <Close
              name="close"
              color="#b92b27"
              size={22}
              onPress={() => setVisible(false)}
            />
          </View>
          <Image
            source={require('../../../assets/user3.png')}
            resizeMode="center"
            style={styles.image}
          />

          <Text style={styles.textTitle}>
            MR. {data?.firstName} {data?.lastName}
          </Text>
          <View style={{marginTop: 20}} />
          <View style={styles.formContainer}>
            <Input
              label="Date Of Birth"
              value={formatDate(data?.dateOfBirth)}
              disabled
            />
            <Input label="Weight" value={data?.weight} disabled />
            <Input label="Height" value={data?.height} disabled />
            <Input
              label="Insomnia Level"
              value={data?.insomniaLevel}
              disabled
            />
            <Input label="Blood Type" value={data?.bloodType} disabled />
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.submit, {backgroundColor: '#27c1c8'}]}
              onPress={handleChat}>
              <Text style={styles.submitText}>
                <Chat name="chat" size={20} /> &nbsp; Chat Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submit, {backgroundColor: '#b92b27'}]}
              onPress={handleMedicalRecords}>
              <Text style={styles.submitText}>
                <Medical name="file-medical" size={20} /> &nbsp; Medical Records
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
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
    justifyContent: 'center',
    margin: 5,
  },
  submitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default PationDetail;

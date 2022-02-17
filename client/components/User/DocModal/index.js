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
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-paper';
import {Input} from 'react-native-elements';
import {formatDate} from '../../Helpers/dateFormatter';
import Cancel from 'react-native-vector-icons/AntDesign';

const DocDetails = ({visible, setVisible, docData}) => {
  const {data} = docData;

  return (
    <Modal visible={visible} animationType="slide">
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../../assets/doc.png')}
            resizeMode="center"
            style={styles.image}
          />

          <Text style={styles.textTitle}>
            DR. {data?.firstName} {data?.lastName}
          </Text>
          <View style={{marginTop: 20}} />
          <View style={styles.formContainer}>
            <Input label="Institution" value={data?.institution} disabled />
            <Input label="SLMC No" value={data?.slmcNo} disabled />
            <Input label="Clinic" value={data?.clinic} disabled />
            <Input label="Contact No" value={data?.contactNo} disabled />
            <Input label="NIC" value={data?.nic} disabled />
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.submit, {backgroundColor: '#27c1c8'}]}>
              <Text style={styles.submitText}>
                <Icon name="calendar-check" size={22} /> &nbsp; Channel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submit, {backgroundColor: '#b92b27'}]}
              onPress={() => setVisible(false)}>
              <Text style={styles.submitText}>
                <Cancel name="closecircleo" size={22} />
                &nbsp; Close
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

export default DocDetails;

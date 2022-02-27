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
} from 'react-native';

import Chat from 'react-native-vector-icons/Entypo';
import {Button, TextInput} from 'react-native-paper';
import {formatDate} from '../../Helpers/dateFormatter';
import Medical from 'react-native-vector-icons/FontAwesome5';
import Close from 'react-native-vector-icons/Fontisto';
import Modal from 'react-native-modal';

const UserMedicalRecord = ({
  visible,
  setVisible,
  userData,
  docId,
  onEdit,
  setOnEdit,
  selectedUserRecod,
  refresh,
  setRefresh,
}) => {
  const [validation, setValidation] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState({});
  const [onUpdate, setOnUpdate] = useState(false);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      mode="overFullScreen">
      <ScrollView style={{backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5F5F5',
            height: 660,
          }}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginRight: 10,
            }}>
            <Close
              name="close"
              color="#b92b27"
              size={22}
              onPress={() => setVisible(false)}
            />
          </View>

          <View style={{marginTop: 20}} />
          <View style={styles.formContainer}>
            <TextInput
              label="Patient Name"
              value={`${selectedUserRecod.firstName} ${selectedUserRecod.lastName}`}
              mode="outlined"
              theme={{
                colors: {primary: '#0073CF', underlineColor: 'transparent'},
              }}
              disabled
            />
            <View style={{marginTop: 5}}>
              <TextInput
                label="Medical No/Name"
                value={selectedUserRecod.medicalNo}
                mode="outlined"
                theme={{
                  colors: {primary: '#0073CF', underlineColor: 'transparent'},
                }}
                error={validation}
                disabled
              />
            </View>

            <View style={{marginTop: 5}}>
              <TextInput
                label="Date Of Birth"
                value={selectedUserRecod.dob}
                mode="outlined"
                theme={{
                  colors: {primary: '#0073CF', underlineColor: 'transparent'},
                }}
                disabled
              />
            </View>
            <View style={{marginTop: 5}}>
              <TextInput
                label="Weight"
                value={selectedUserRecod.weight}
                mode="outlined"
                theme={{
                  colors: {primary: '#0073CF', underlineColor: 'transparent'},
                }}
                disabled
              />

              <View style={{marginTop: 5}}>
                <TextInput
                  label="Height"
                  value={selectedUserRecod.height}
                  mode="outlined"
                  theme={{
                    colors: {primary: '#0073CF', underlineColor: 'transparent'},
                  }}
                  disabled
                />
              </View>
            </View>
            <View style={{marginTop: 5}}>
              <TextInput
                label="Contact No"
                value={selectedUserRecod.contactNo}
                mode="outlined"
                theme={{
                  colors: {primary: '#0073CF', underlineColor: 'transparent'},
                }}
                disabled
              />
            </View>
            <View style={{marginTop: 5}}>
              <TextInput
                label="Remarks"
                value={selectedUserRecod.remarks}
                mode="outlined"
                theme={{
                  colors: {primary: '#0073CF', underlineColor: 'transparent'},
                }}
                disabled
              />
            </View>
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
    width: '80%',
    marginVertical: 10,
    paddingBottom: 30,
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

export default UserMedicalRecord;

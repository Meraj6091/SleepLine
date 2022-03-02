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
import {
  crateMedicalRecords,
  updateMedicalRecord,
  deleMedicalRecord,
} from './service';

const AddRecords = ({
  visible,
  setVisible,
  userData,
  docId,
  docName,
  onEdit,
  setOnEdit,
  selectedUserRecod,
  refresh,
  setRefresh,
}) => {
  const [validation, setValidation] = useState(false);
  const [medicalRecord, setMedicalRecord] = useState({});
  const [onUpdate, setOnUpdate] = useState(false);

  const handleChange = (event, id) => {
    setMedicalRecord({
      ...medicalRecord,
      [id]: event,
    });
  };
  const handleUpdate = () => {
    console.log(selectedUserRecod);
    setOnEdit(false);
    setOnUpdate(true);
  };
  const handleDelete = async () => {
    let postdata = {
      id: selectedUserRecod._id,
    };

    const {data} = await deleMedicalRecord(postdata);
    if (data) {
      setVisible(false);
    }
    setRefresh(!refresh);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!medicalRecord.medicalNo) {
        setValidation(true);
        return;
      } else {
        if (onEdit === false) {
          setOnUpdate(false);
        }
        setValidation(false);
        let postdata = medicalRecord;
        postdata.docId = docId;
        postdata.userId = userData?._id;
        postdata.id = selectedUserRecod._id;
        postdata.firstName = userData?.firstName;
        postdata.lastName = userData?.lastName;
        postdata.docName = docName;
        if (onUpdate) {
          const {data} = await updateMedicalRecord(postdata);
          if (data) {
            setVisible(false);
          }
        } else {
          const {data} = await crateMedicalRecords(postdata);
          if (data) {
            setVisible(false);
          }
        }
      }
      setRefresh(!refresh);
    } catch (err) {
      console.log(err);
    }
  };
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
            height: 690,
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
              value={`${userData?.firstName || selectedUserRecod.firstName} ${
                userData?.lastName || selectedUserRecod.lastName
              }`}
              mode="outlined"
              theme={{
                colors: {primary: '#0073CF', underlineColor: 'transparent'},
              }}
              disabled
            />
            <View style={{marginTop: 5}}>
              <TextInput
                label="Medical No/Name"
                value={
                  onEdit
                    ? selectedUserRecod.medicalNo
                    : medicalRecord?.medicalNo
                }
                mode="outlined"
                theme={{
                  colors: {primary: '#0073CF', underlineColor: 'transparent'},
                }}
                onChangeText={(event) => handleChange(event, 'medicalNo')}
                error={validation}
                disabled={onEdit}
              />
            </View>

            <View style={{marginTop: 5}}>
              <TextInput
                label="Date Of Birth"
                value={onEdit ? selectedUserRecod.dob : medicalRecord?.dob}
                mode="outlined"
                theme={{
                  colors: {primary: '#0073CF', underlineColor: 'transparent'},
                }}
                onChangeText={(event) => handleChange(event, 'transparent')}
                disabled={onEdit}
              />
            </View>
            <View style={{marginTop: 5}}>
              <TextInput
                label="Weight"
                value={
                  onEdit ? selectedUserRecod.weight : medicalRecord?.weight
                }
                mode="outlined"
                theme={{
                  colors: {primary: '#0073CF', underlineColor: 'transparent'},
                }}
                onChangeText={(event) => handleChange(event, 'transparent')}
                disabled={onEdit}
              />

              <View style={{marginTop: 5}}>
                <TextInput
                  label="Height"
                  value={
                    onEdit ? selectedUserRecod.height : medicalRecord?.height
                  }
                  mode="outlined"
                  theme={{
                    colors: {primary: '#0073CF', underlineColor: 'transparent'},
                  }}
                  onChangeText={(event) => handleChange(event, 'transparent')}
                  disabled={onEdit}
                />
              </View>
            </View>
            <View style={{marginTop: 5}}>
              <TextInput
                label="Contact No"
                value={
                  onEdit
                    ? selectedUserRecod.contactNo
                    : medicalRecord?.contactNo
                }
                mode="outlined"
                theme={{
                  colors: {primary: '#0073CF', underlineColor: 'transparent'},
                }}
                onChangeText={(event) => handleChange(event, 'transparent')}
                disabled={onEdit}
              />
            </View>
            <View style={{marginTop: 5}}>
              <TextInput
                label="Remarks"
                value={
                  onEdit ? selectedUserRecod.remarks : medicalRecord?.remarks
                }
                mode="outlined"
                theme={{
                  colors: {primary: '#0073CF', underlineColor: 'transparent'},
                }}
                onChangeText={(event) => handleChange(event, 'remarks')}
                disabled={onEdit}
              />
            </View>
            <View style={{marginTop: 5}}>
              <TextInput
                label="Doctor Name"
                value={docName || selectedUserRecod.docName}
                mode="outlined"
                theme={{
                  colors: {primary: '#0073CF', underlineColor: 'transparent'},
                }}
                disabled
              />
            </View>
          </View>
          {onEdit ? (
            <View style={{flexDirection: 'row', bottom: 25}}>
              <Button
                style={{margin: 5}}
                mode="contained"
                color="#0073CF"
                onPress={handleUpdate}>
                Update
              </Button>
              <Button
                style={{margin: 5}}
                mode="contained"
                color="#b92b27"
                onPress={handleDelete}>
                Delete
              </Button>
            </View>
          ) : (
            <Button mode="contained" color="#0073CF" onPress={handleSubmit}>
              Submit
            </Button>
          )}
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

export default AddRecords;

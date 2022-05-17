import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import DateIncon from 'react-native-vector-icons/Fontisto';
import {Input} from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import {formatDate} from '../Helpers/dateFormatter';
import {createDocProfile} from './service';
import AsyncStorage from '@react-native-community/async-storage';
import TextInputMask from 'react-native-text-input-mask';

const CreateProfile = ({route, navigation}) => {
  const {doctor, user} = route.params;

  const [isFocused, setIsFocused] = useState(false);
  const [createProfile, setCreateProfile] = useState({});
  const [open, setOpen] = useState(false);
  const [isNotValidated, setIsNotValidated] = useState(true);
  const [isDisable, setIsDisable] = useState(false);
  const [validation, setValidation] = useState({});
  const [isEqual, setIsEqual] = useState(false);

  useEffect(() => {
    const getResult = async () => {
      let newUser = await AsyncStorage.getItem('newUser');
      let localData = JSON.parse(newUser);
      setCreateProfile({
        ...createProfile,
        isEqualFirstName: localData.signUpUser.firstName,
      });
    };
    getResult();
  }, []);
  const handleChange = (event, id) => {
    setCreateProfile({
      ...createProfile,
      [id]: event,
    });
    if (id === 'nic') {
      let isnum = /^\d+$/.test(event);

      if (!isnum) {
        setIsEqual(true);
        if (!isnum && (event.includes('v') || event.includes('V'))) {
          setIsEqual(false);
        }
      } else setIsEqual(false);
    }
  };

  const formValidation = () => {
    if (!createProfile.firstName) {
      setValidation({
        firstName: 'ENTER YOUR FIRSTNAME',
      });
    } else if (createProfile.firstName !== createProfile.isEqualFirstName) {
      setValidation({
        firstName: 'NAME DO NOT MATCH',
      });
    } else if (!createProfile.lastName) {
      setValidation({
        lastName: 'ENTER YOUR LASTNAME',
      });
    } else if (!createProfile.dateOfBirth) {
      setValidation({
        dateOfBirth: 'ENTER YOUR DATE OF BIRTH',
      });
    } else if (!createProfile.institution) {
      setValidation({
        institution: 'ENTER YOUR INSTITUTION',
      });
    } else if (!createProfile.slmcNo) {
      setValidation({
        slmcNo: 'ENTER YOUR SLMC REGISTRATION NO',
      });
    } else if (!createProfile.clinic) {
      setValidation({
        clinic: 'ENTER YOUR CLINIC ADDRESS',
      });
    } else if (!createProfile.nic) {
      setValidation({
        nic: 'ENTER YOUR NIC NO',
      });
    } else if (createProfile.nic.length !== 10 || isEqual) {
      setValidation({
        nic: 'INVALID NIC',
      });
    }

    // else if (
    //   createProfile.nic.includes('V') ||
    //   createProfile.nic.includes('v')
    // ) {
    //   if (createProfile.nic.length !== 10)
    //     setValidation({
    //       nic: 'Invalid NIC',
    //     });
    // }
    else if (!createProfile.contactNo) {
      setValidation({
        contactNo: 'ENTER YOUR CONTACT NO',
      });
    } else if (createProfile?.contactNo?.length !== 14) {
      setValidation({
        contactNo: 'INVALID CONTACT NO',
      });
    } else {
      setIsNotValidated(false);
    }
  };
  const handleSubmit = async (event) => {
    formValidation();
    if (isNotValidated === false) {
      try {
        setIsDisable(true);
        let postdata = createProfile;

        const {data} = await createDocProfile(postdata);
        if (data) {
          //   let obj = {
          //     user: data.firstName,
          //     doctor: doctor,
          //   };
          //   await AsyncStorage.setItem('NewUser', JSON.stringify(obj));
          await AsyncStorage.setItem('User', JSON.stringify(user));
          //   let newUser = await AsyncStorage.getItem('User');
          //   let obj = JSON.parse(newUser);
          if (doctor) {
            navigation.navigate('DocNavigation', {
              doctor: doctor,
              user: user,
            });
          }
          // navigation.navigate('DocNavigation');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        {doctor ? (
          <Image
            source={require('../../assets/doc.png')}
            resizeMode="center"
            style={styles.image}
          />
        ) : (
          <Image
            source={require('../../assets/user3.png')}
            resizeMode="center"
            style={styles.image}
          />
        )}

        <Text style={styles.textTitle}>Create Profile</Text>

        <View style={{marginTop: 20}} />
        <View style={[styles.formContainer]}>
          <Input
            placeholder="First Name"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'firstName')}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
              />
            }
            errorMessage={validation.firstName && validation.firstName}
          />
          <Input
            placeholder="Last Name"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'lastName')}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
              />
            }
            errorMessage={validation.lastName && validation.lastName}
          />
          <Input
            placeholder="Date of Birth"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            disabled
            value={formatDate(createProfile.dateOfBirth)}
            leftIcon={
              <DateIncon
                name="date"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
            errorMessage={validation.dateOfBirth && validation.dateOfBirth}
          />
          <DatePicker
            modal
            open={open}
            date={new Date()}
            mode="date"
            onConfirm={(date) => {
              setOpen(false);
              handleChange(date, 'dateOfBirth');
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Input
            placeholder="Practcing Hospital/ Institution"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'institution')}
            value={createProfile.institution}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
            errorMessage={validation.institution && validation.institution}
          />
          <Input
            placeholder="SLMC Registration No"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'slmcNo')}
            value={createProfile.slmcNo}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
            errorMessage={validation.slmcNo && validation.slmcNo}
          />
          <Input
            placeholder="Clinic Address"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'clinic')}
            value={createProfile.clinic}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
            errorMessage={validation.clinic && validation.clinic}
          />
          {/* <Input
            placeholder="Contact Number"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'contactNo')}
            value={createProfile.contactNo}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
            errorMessage={validation.contactNo && validation.contactNo}
          /> */}
          <Input
            placeholder="National ID Number"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'nic')}
            value={createProfile.nic}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
            errorMessage={validation.nic && validation.nic}
          />

          <View style={{flexDirection: 'row'}}>
            <Icon
              name="check"
              size={22}
              color={isFocused ? '#0779e4' : 'grey'}
              style={{marginLeft: 10}}
            />

            <TextInputMask
              onFocus={() => setIsFocused(true)}
              placeholder="Contact Number"
              keyboardType="number-pad"
              value={createProfile.contactNo}
              onChangeText={(event) => handleChange(event, 'contactNo')}
              affineFormats={[]}
              customNotations={[]}
              affinityCalculationStrategy={'WHOLE_STRING'}
              style={{
                marginBottom: 10,
                marginLeft: 15,
                flex: 1,
                fontSize: 18,
                padding: 0,
              }}
              mask={'+94 [00] [0000000]'}
            />
          </View>
          <View style={{marginLeft: 15, bottom: 5}}>
            <Text style={{color: 'red', fontSize: 12}}>
              {validation.contactNo}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submit, {backgroundColor: '#0251ce'}]}
          onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {!isDisable ? 'SAVE' : 'SAVING...'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 150,
    marginVertical: 30,
  },
  textTitle: {
    fontFamily: 'Foundation',
    fontSize: 40,
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
    width: '90%',
    height: 50,
    borderColor: 'blue',
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 0,
  },
  submitText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default CreateProfile;

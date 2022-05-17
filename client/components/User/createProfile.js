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
import {createUserProfile} from './service';
import AsyncStorage from '@react-native-community/async-storage';

const CreateProfile = ({route, navigation}) => {
  const {doctor, user} = route.params;

  const [validation, setValidation] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [createProfile, setCreateProfile] = useState({});
  const [open, setOpen] = useState(false);
  const [isNotValidated, setIsNotValidated] = useState(true);
  const [isDisable, setIsDisable] = useState(false);

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
    } else if (!createProfile.weight) {
      setValidation({
        weight: 'ENTER YOUR WEIGHT',
      });
    } else if (!createProfile.weight.includes('kg')) {
      setValidation({
        weight: 'INVALID',
      });
    } else if (!createProfile.height) {
      setValidation({
        height: 'ENTER YOUR HETGHT',
      });
    } else if (!createProfile.height.includes('cm')) {
      setValidation({
        height: 'INVALID',
      });
    } else if (!createProfile.bloodType) {
      setValidation({
        bloodType: 'ENTER YOUR BLOODTYPE',
      });
    } else {
      setIsNotValidated(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    formValidation();
    if (isNotValidated === false) {
      try {
        setIsDisable(true);
        let postdata = createProfile;

        const {data} = await createUserProfile(postdata);
        if (data) {
          //   let obj = {
          //     user: data.firstName,
          //     doctor: doctor,
          //   };
          //   await AsyncStorage.setItem('NewUser', JSON.stringify(obj));
          await AsyncStorage.setItem('User', JSON.stringify(user));
          // let newUser = await AsyncStorage.getItem('User');
          // let obj = JSON.parse(newUser);

          navigation.navigate('UserNavigation', {
            doctor: doctor,
            user: user,
          });

          // navigation.navigate('DocNavigation');
        }
      } catch (err) {}
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        {doctor ? (
          <Image
            source={require('../../assets/docProfile.jpg')}
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
            value={createProfile.firstName}
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
            placeholder="Weight"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'weight')}
            value={createProfile.weight}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
            errorMessage={validation.weight && validation.weight}
          />
          <Input
            placeholder="Height"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'height')}
            value={createProfile.height}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
            errorMessage={validation.height && validation.height}
          />
          <Input
            placeholder="Blood Type"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'bloodType')}
            value={createProfile.bloodType}
            leftIcon={
              <Icon
                name="check"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
                onPress={() => setOpen(true)}
              />
            }
            errorMessage={validation.bloodType && validation.bloodType}
          />
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

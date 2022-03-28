import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import MyHeader from '../Navigation/myHeader';
import Icon from 'react-native-vector-icons/AntDesign';
import Cancel from 'react-native-vector-icons/MaterialCommunityIcons';
import DateIncon from 'react-native-vector-icons/Fontisto';
import {Snackbar, ActivityIndicator, Colors} from 'react-native-paper';
import Logout from 'react-native-vector-icons/AntDesign';
import {Input} from 'react-native-elements';
import {getAllUserInfo, updateProfile} from './service';
import {formatDate} from '../Helpers/dateFormatter';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {saveData, saveSignUpId} from '../../Containers/State/action';
import DatePicker from 'react-native-date-picker';

const Profile = ({route, navigation}) => {
  const {doctor, user} = route.params;
  const dispatch = useDispatch();
  const scrollRef = useRef();
  const state = useSelector((state) => state.userData);
  const signUpState = useSelector((state) => state.signUpData);
  const [viewProfile, setViewProfile] = useState({});
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editProfile, setEditProfile] = useState({});
  const [open, setOpen] = useState(false);
  const [isNotValidated, setIsNotValidated] = useState(true);
  const [validation, setValidation] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsEdit(false);
      setVisible(false);
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (user && !isEdit) {
      getAllUsers();
    }
  }, [isEdit, state]);

  const handleEdit = (event) => {
    setIsEdit(true);
    setVisible(false);
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });

    setViewProfile({});
  };
  const handleClose = (event) => {
    setIsEdit(false);
  };
  const getAllUsers = async () => {
    setViewProfile({
      ...state,
    });
  };

  const handleChange = (event, id) => {
    setViewProfile({
      ...viewProfile,
      [id]: event,
    });
  };
  const handleLogOut = (event) => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setVisible(!visible);
  };

  const handleDispatch = async () => {
    try {
      const {data} = await getAllUserInfo({user: state.firstName});

      if (data) {
        dispatch(
          saveData({
            ...data.email[0],
            ...data.userProfile[0],
          }),
        );
        dispatch(
          saveSignUpId({
            id: data.email[0]._id,
          }),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const formValidation = () => {
    if (viewProfile.password !== viewProfile.confirmPassword) {
      setValidation({
        validateMsgConfirmPassword: 'PASSWORD DO NOT MATCH',
      });
    } else {
      setIsNotValidated(false);
      setValidation({});
    }
  };
  const handleSubmit = async (event) => {
    try {
      let postData = viewProfile;
      postData.id = state._id;
      postData.signUpId = signUpState.id;
      if (
        (viewProfile.password && viewProfile.confirmPassword) ||
        (viewProfile.password && !viewProfile.confirmPassword)
      ) {
        formValidation();
        if (!isNotValidated) {
          const {data} = await updateProfile(postData);
          if (data) {
            setVisible(false);
            scrollRef.current?.scrollTo({
              y: 0,
              animated: true,
            });

            await handleDispatch();
            setIsEdit(false);
          }
        }
      } else {
        const {data} = await updateProfile(postData);
        if (data) {
          setVisible(false);
          scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
          });

          await handleDispatch();
          setIsEdit(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}} ref={scrollRef}>
      <View style={styles.container}>
        <MyHeader
          onPressMenu={() => navigation.goBack()}
          title={route.name}
          right="more-vertical"
          onRightPress={() => console.log('right')}
          user={true}
        />
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
        <Text style={styles.textTitle}>{user}</Text>
        <View style={{marginTop: 20}} />
        <View style={styles.formContainer}>
          <View style={styles.containerSnapBar}>
            <Snackbar
              style={{backgroundColor: '#b92b27'}}
              visible={visible}
              onDismiss={() => setVisible(false)}
              action={{
                label: 'Yes',
                onPress: async () => {
                  try {
                    await AsyncStorage.removeItem('User');
                  } catch (err) {
                    console.log(err);
                  }
                  try {
                    await AsyncStorage.removeItem('newUser');
                  } catch (err) {
                    console.log(err);
                  }

                  navigation.navigate('CreateAccountAs');
                },
              }}>
              ARE YOUR SURE WANT TO LOGOUT !
            </Snackbar>
          </View>
          {!isEdit && (
            <>
              <Input
                label="First Name"
                disabled={!isEdit}
                value={viewProfile.firstName}
              />
              <Input
                label="Last Name"
                disabled={!isEdit}
                value={viewProfile.lastName}
              />
              <Input
                label="Email"
                disabled={!isEdit}
                value={viewProfile.email}
              />
            </>
          )}
          <Input
            label="Weight"
            disabled={!isEdit}
            value={viewProfile.weight}
            onChangeText={(event) => handleChange(event, 'weight')}
          />
          <Input
            label="Height"
            disabled={!isEdit}
            value={viewProfile.height}
            onChangeText={(event) => handleChange(event, 'height')}
          />
          <Input
            label="Blood Type"
            disabled={!isEdit}
            value={viewProfile.bloodType}
            onChangeText={(event) => handleChange(event, 'bloodType')}
          />
          <Input
            label="Date of Birth"
            disabled
            value={formatDate(viewProfile.dateOfBirth)}
            onChangeText={(event) => handleChange(event, 'dateOfBirth')}
            leftIcon={
              <DateIncon
                name="date"
                size={22}
                color={'grey'}
                onPress={() => isEdit && setOpen(true)}
              />
            }
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
          {isEdit && (
            <>
              <Input
                label="Password"
                value={viewProfile.password}
                onChangeText={(event) => handleChange(event, 'password')}
              />
              <Input
                label="Confirm Password"
                value={viewProfile.confirmPassword}
                onChangeText={(event) => handleChange(event, 'confirmPassword')}
                errorMessage={
                  validation.validateMsgConfirmPassword &&
                  validation.validateMsgConfirmPassword
                }
              />
            </>
          )}
        </View>
        {isEdit ? (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.submit, {backgroundColor: '#27c1c8'}]}
              onPress={handleSubmit}>
              <Text style={styles.submitText}>
                <Icon name="edit" size={22} /> &nbsp; Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submit, {backgroundColor: '#b92b27'}]}
              onPress={handleClose}>
              <Text style={styles.submitText}>
                <Cancel name="cancel" size={22} /> &nbsp; Cancel
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={[styles.submit, {backgroundColor: '#27c1c8'}]}
              onPress={handleEdit}>
              <Text style={styles.submitText}>
                <Icon name="edit" size={22} /> &nbsp; Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.submit, {backgroundColor: '#b92b27'}]}
              onPress={handleLogOut}>
              <Text style={styles.submitText}>
                <Logout name="logout" size={22} /> &nbsp; Sign out
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
        <Text>{'\n'}</Text>
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

export default Profile;

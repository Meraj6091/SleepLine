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
import {Snackbar} from 'react-native-paper';
import Logout from 'react-native-vector-icons/AntDesign';
import {Input} from 'react-native-elements';
//import {getAllUserInfo} from './service';
import {formatDate} from '../Helpers/dateFormatter';
import AsyncStorage from '@react-native-community/async-storage';
import {useSelector} from 'react-redux';

const Profile = ({route, navigation}) => {
  const {doctor, user} = route.params;
  const scrollRef = useRef();
  const [viewProfile, setViewProfile] = useState({});
  const [visible, setVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const state = useSelector((state) => state.userData);

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
    console.log(viewProfile);
    console.log(state);
  }, [state, viewProfile]);

  useEffect(() => {
    if (user && !isEdit) {
      getAllDoc();
    }
  }, [isEdit, state]);

  const handleEdit = (event) => {
    setIsEdit(true);
    setVisible(false);
    setViewProfile({});
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const handleClose = (event) => {
    setIsEdit(false);
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };
  const getAllDoc = () => {
    setViewProfile({
      ...state,
    });
  };

  const handleSubmit = async (event) => {
    try {
      setIsEdit(false);
      setVisible(false);
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogOut = (event) => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
    setVisible(!visible);
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}} ref={scrollRef}>
      <View style={styles.container}>
        <MyHeader
          menu
          onPressMenu={() => navigation.openDrawer()}
          title={route.name}
          right="more-vertical"
          onRightPress={() => console.log('right')}
          user={false}
        />

        <Image
          source={require('../../assets/doc.png')}
          resizeMode="center"
          style={styles.image}
        />

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
                  await AsyncStorage.removeItem('User');
                  await AsyncStorage.removeItem('newUser');
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
            label="Date of Birth"
            disabled={!isEdit}
            value={formatDate(viewProfile.dateOfBirth)}
          />
          <Input
            label="Institution"
            disabled={!isEdit}
            value={viewProfile.institution}
          />
          <Input
            label="SLMC No"
            disabled={!isEdit}
            value={viewProfile.slmcNo}
          />
          <Input label="Clinic" disabled={!isEdit} value={viewProfile.clinic} />
          <Input
            label="Contact No"
            disabled={!isEdit}
            value={viewProfile.contactNo}
          />
          <Input label="NIC" disabled={!isEdit} value={viewProfile.nic} />
          {isEdit && (
            <>
              <Input label="Password" value={viewProfile.password} />
              <Input
                label="Confirm Password"
                value={viewProfile.confirmPassword}
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

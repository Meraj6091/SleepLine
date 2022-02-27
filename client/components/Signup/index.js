import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import {createUserAccount, createDocAccount} from './service';
import {ActivityIndicator, Colors, Snackbar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const SignUp = ({route, navigation}) => {
  const {doctor} = route.params;
  const scrollRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [visible, setVisible] = useState(false);
  const [signUpData, setSignUpData] = useState({});
  const [validation, setValidation] = useState({});
  let isNotValidated = true;

  const formValidation = () => {
    if (!signUpData.firstName) {
      setValidation({
        validateMsgFname: 'PLEASE ENTER YOUR FULL NAME',
      });
    } else if (!signUpData.email) {
      setValidation({
        validateMsgEmail: 'PLEASE ENTER YOUR EMAIL',
      });
    } else if (!signUpData.password) {
      setValidation({
        validateMsgPassword: 'PLEASE ENTER YOUR PASSWORD',
      });
    } else if (!signUpData.confirmPassword) {
      setValidation({
        validateMsgConfirmPassword: 'PLEASE ENTER YOUR PASSWORD AGAIN',
      });
    } else if (signUpData.confirmPassword !== signUpData.password) {
      setValidation({
        validateMsgConfirmPassword: 'PASSWORD DO NOT MATCH',
      });
    } else {
      isNotValidated = false;
    }
  };

  const handleChange = (event, id) => {
    setSignUpData({
      ...signUpData,
      [id]: event.trim(),
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await formValidation();

      if (isNotValidated === false) {
        setIsSignedUp(true);
        let postdata = signUpData;
        if (doctor) {
          const {data} = await createDocAccount(postdata);
          if (data && data.newUser === false) {
            scrollRef.current?.scrollTo({
              y: 0,
              animated: true,
            });
            setVisible(!visible);
          } else if (data && data.newUser) {
            await AsyncStorage.setItem('newUser', JSON.stringify(data));
            navigation.navigate('Login', {doctor: doctor, user: data});
          }
        } else {
          const {data} = await createUserAccount(postdata);
          console.log(data);
          if (data && data.newUser === false) {
            scrollRef.current?.scrollTo({
              y: 0,
              animated: true,
            });
            setVisible(!visible);
          } else if (data && data.newUser) {
            await AsyncStorage.setItem('newUser', JSON.stringify(data));
            navigation.navigate('Login', {doctor: doctor, user: data});
          }
        }
      }
      setIsSignedUp(false);
    } catch (err) {
      console.log(err);
      setIsSignedUp(false);
    }
  };
  return (
    <>
      <ScrollView style={{backgroundColor: 'white'}} ref={scrollRef}>
        <View style={styles.container}>
          <Image
            source={require('../../assets/signup.png')}
            resizeMode="center"
            style={styles.image}
          />
          <Text style={styles.textTitle}>Let's Get Started</Text>
          <Text style={styles.textBody}>
            Create an account to get all features {'\n'}
          </Text>
          <View style={[styles.formContainer]}>
            <View style={styles.containerSnapBar}>
              <Snackbar
                style={{backgroundColor: '#3b5c8f'}}
                visible={visible}
                onDismiss={() => setVisible(false)}
                action={{
                  label: 'Undo',
                  onPress: () => {
                    // Do something
                  },
                }}>
                Email is already Exists!
              </Snackbar>
            </View>
            <Input
              placeholder="First Name"
              onFocus={() => setIsFocused(true)}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              onChangeText={(event) => handleChange(event, 'firstName')}
              errorMessage={
                validation.validateMsgFname && validation.validateMsgFname
              }
              leftIcon={
                <Icon
                  name="user"
                  size={22}
                  color={isFocused ? '#0779e4' : 'grey'}
                />
              }
            />
            <Input
              placeholder="Email"
              onFocus={() => setIsFocused(true)}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              onChangeText={(event) => handleChange(event, 'email')}
              errorMessage={
                validation.validateMsgEmail && validation.validateMsgEmail
              }
              leftIcon={
                <Icon
                  name="envelope"
                  size={22}
                  color={isFocused ? '#0779e4' : 'grey'}
                />
              }
            />
            <Input
              placeholder="Password"
              onFocus={() => setIsFocused(true)}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              secureTextEntry={true}
              onChangeText={(event) => handleChange(event, 'password')}
              errorMessage={
                validation.validateMsgPassword && validation.validateMsgPassword
              }
              leftIcon={
                <Icon
                  name="lock"
                  size={22}
                  color={isFocused ? '#0779e4' : 'grey'}
                />
              }
            />
            <Input
              placeholder="Confirm Password"
              onFocus={() => setIsFocused(true)}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              secureTextEntry={true}
              onChangeText={(event) => handleChange(event, 'confirmPassword')}
              errorMessage={
                validation.validateMsgConfirmPassword &&
                validation.validateMsgConfirmPassword
              }
              leftIcon={
                <Icon
                  name="lock"
                  size={22}
                  color={isFocused ? '#0779e4' : 'grey'}
                />
              }
            />
          </View>

          <TouchableOpacity
            style={[styles.submit, {backgroundColor: '#0251ce'}]}
            onPress={handleSubmit}>
            <Text style={styles.submitText}>
              {isSignedUp ? (
                <ActivityIndicator animating={true} color={Colors.red800} />
              ) : (
                'CREATE'
              )}
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textBody}>Already have an account &nbsp;</Text>
            <Text
              style={[styles.textBody, {color: 'blue'}]}
              onPress={
                doctor
                  ? () => navigation.navigate('Login', {doctor: true})
                  : () => navigation.navigate('Login', {doctor: false})
              }>
              Login here {'\n'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  containerSnapBar: {
    bottom: 300,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 250,
    marginVertical: 10,
  },
  textTitle: {
    fontSize: 40,
    fontFamily: 'Foundation',
    marginVertical: 5,
  },
  textBody: {
    fontSize: 16,
    fontFamily: 'Foundation',
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

export default SignUp;

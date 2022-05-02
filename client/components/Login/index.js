import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import Account from './Containers/Account';
import {logedIn} from './service';
import {Snackbar, ActivityIndicator, Colors} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {saveData, getData} from '../../Containers/State/action';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Login = ({route, navigation}) => {
  const {doctor, user} = route.params;
  const scrollRef = useRef();
  const [visible, setVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [loggingData, setloggingData] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '884937646947-8dumjre3u6rraqeto5430h2fio735voq.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);
  const handleChange = (event, id) => {
    setloggingData({
      ...loggingData,
      [id]: event.trim(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLogged(true);
    let postdata = loggingData;
    postdata.doctor = doctor;

    const {data} = await logedIn(postdata);

    if (data) {
      let userObj = {
        user: data.firstName,
        email: data.email,
        id: data._id,
        doctor: doctor,
      };

      await AsyncStorage.setItem('User', JSON.stringify(userObj));
      let newUser = await AsyncStorage.getItem('newUser');
      let localData = JSON.parse(newUser);
      if (
        newUser &&
        data.firstName === localData.signUpUser.firstName &&
        data.password === localData.signUpUser.password &&
        data.email === localData.signUpUser.email
      ) {
        if (doctor) {
          navigation.navigate('DocFirstScreen', {doctor: doctor});
        } else navigation.navigate('firstScreen', {doctor: doctor});
      } else if (doctor) {
        navigation.navigate('DocNavigation', {
          doctor: doctor,
          user: userObj,
        });
      } else {
        navigation.navigate('UserNavigation', {
          doctor: doctor,
          user: userObj,
        });
      }
      // navigation.navigate('DocNavigation');
    } else {
      // Alert.alert('Invalid Details', 'PLease Check Your Logging Details !', [
      //   {
      //     text: 'OK',
      //     style: 'cancel',
      //   },
      // ]);
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
      setVisible(!visible);
    }
    setIsLogged(false);
  };
  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      console.log({googleCredential});
    } catch (err) {
      console.log({err});
    }
  }
  return (
    <ScrollView style={{backgroundColor: 'white'}} ref={scrollRef}>
      <View style={styles.container}>
        {doctor ? (
          <Image
            source={require('../../assets/docProfile.jpg')}
            resizeMode="center"
            style={styles.image}
          />
        ) : (
          <Image
            source={require('../../assets/userProfile.png')}
            resizeMode="center"
            style={styles.image}
          />
        )}

        <Text style={styles.textTitle}>Welcome back</Text>
        <Text style={styles.textBody}>Log in to your existant account</Text>
        <View style={{marginTop: 20}} />
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
              INVALID LOGIN DETAILS !
            </Snackbar>
          </View>
          <Input
            placeholder="First Name"
            onFocus={() => setIsFocused(true)}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
            onChangeText={(event) => handleChange(event, 'firstName')}
            leftIcon={
              <Icon
                name="user"
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
            leftIcon={
              <Icon
                name="lock"
                size={22}
                color={isFocused ? '#0779e4' : 'grey'}
              />
            }
          />
        </View>
        {/* <View style={{width: '90%'}}>
          <Text
            style={([styles.textBody], {alignSelf: 'flex-end'})}
            onPress={() => navigation.navigate('CreateAccountAs')}>
            Forgot Password?
          </Text>
        </View> */}
        <TouchableOpacity
          style={[styles.submit, {backgroundColor: '#0251ce'}]}
          onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {isLogged ? (
              <ActivityIndicator animating={true} color={Colors.red800} />
            ) : (
              'LOG IN'
            )}
          </Text>
        </TouchableOpacity>
        <Text style={styles.textBody}>Or connect using </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.containerSocial, {backgroundColor: '#3b5c8f'}]}>
            <Icon style={styles.accIcon} name="facebook" />
            <Text style={styles.textTitleSocial}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.containerSocial, {backgroundColor: '#ec482f'}]}
            onPress={() =>
              onGoogleButtonPress().then(() =>
                console.log('Signed in with Google!'),
              )
            }>
            <Icon style={styles.accIcon} name="google" />
            <Text style={styles.textTitleSocial}>Google</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginVertical: 5}}>
          <Text style={styles.textBody}>Don't Have an account &nbsp;</Text>

          <Text
            style={[styles.textBody, {color: 'blue'}]}
            onPress={() =>
              navigation.navigate('SignUp', {
                doctor,
              })
            }>
            Sign Up {'\n'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerSnapBar: {
    bottom: 310,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 250,
    marginVertical: 10,
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
  containerSocial: {
    flexDirection: 'row',
    width: 135,
    height: 45,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  accIcon: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  textTitleSocial: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 5,
  },
});

export default Login;

import React, {useState, useEffect} from 'react';
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

import * as Animatable from 'react-native-animatable';
import Styles from '../Navigation/styles';
import {useDispatch} from 'react-redux';
import MyHeader from '../Navigation/myHeader';
import AsyncStorage from '@react-native-community/async-storage';
import {getAllUserInfo} from './service';
import {saveData} from '../../Containers/State/action';

const Home = ({route, navigation}) => {
  const {params} = route;

  const dispatch = useDispatch();

  const SPACING = 20;
  const AVATAR_SIZE = 70;

  useEffect(() => {
    handleDispatch();
  }, []);

  const data = [
    {
      name: 'Insomnia Level 3',
      vehical: 'Now',
      msg: 'Predict Your insomnia Level',
      img: require('../../assets/insomnia.jpg'),
    },
    {
      name: 'Channel Doctors',
      vehical: 'Now',
      msg: 'Channel A Doctor Right Now',
      img: require('../../assets/doctors.jpg'),
    },
    {
      name: 'Medical Records',
      vehical: 'Now',
      msg: 'View Medical Records',
      img: require('../../assets/medical_records.jpg'),
    },
    {
      name: 'Message',
      vehical: 'Now',
      msg: 'Chat With Your Therapiest',
      img: require('../../assets/chat.jpg'),
    },
    {
      name: 'Track',
      vehical: 'Now',
      msg: 'Track Your Sleeping Time ',
      img: require('../../assets/track.png'),
    },
  ];

  const handleDispatch = async () => {
    try {
      const {data} = await getAllUserInfo({user: params.user});

      if (data) {
        dispatch(
          saveData({
            ...data.email[0],
            ...data.userProfile[0],
          }),
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleTrack = (data) => {
    if (data === 'Track') {
      navigation.navigate('SleepTracker');
    }
  };
  return (
    <View style={Styles.container}>
      <MyHeader
        menu
        back={false}
        //onPressMenu={() => navigation.navigate('CreateAccountAs')}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log('right')}
        user={true}
      />
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          {/* <Image
            source={require('../../assets/pixel.jpg')}
            style={StyleSheet.absoluteFillObject}
            blurRadius={80}
          /> */}
          <View
            style={{
              flex: 1,
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.textTitleChoose}>
              Hi {params.user},{'\n'}how your feeling today,
            </Text>
          </View>
          <View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.key}
              contentContainerStyle={{
                padding: SPACING,
              }}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity onPress={() => handleTrack(item.name)}>
                    <View style={styles.cardBody}>
                      <Image
                        source={item.img}
                        style={{
                          width: AVATAR_SIZE,
                          height: AVATAR_SIZE,
                          borderRadius: AVATAR_SIZE,
                          marginRight: SPACING / 2,
                        }}
                      />
                      <View>
                        <Text style={{fontSize: 20, fontWeight: '700'}}>
                          {item.name}
                        </Text>
                        <Text style={{fontSize: 18, opacity: 0.7}}>
                          {item.msg}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            opacity: 0.8,
                            color: '#0099cc',
                          }}>
                          {item.vehical}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textTitleChoose: {
    textAlign: 'left',
    fontSize: 25,
    fontFamily: 'sans-serif-thin',
    marginRight: 100,
  },
  cardBody: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 3,
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
});

export default Home;

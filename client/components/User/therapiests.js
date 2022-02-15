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

import MyHeader from '../Navigation/myHeader';
import AsyncStorage from '@react-native-community/async-storage';

const Therapiests = ({route, navigation}) => {
  const {params} = route;
  const SPACING = 20;
  const AVATAR_SIZE = 70;
  const data = [
    {
      name: 'Insomnia Level 3',
      vehical: 'Now',
      msg: 'Chandra Bandara',
      img: require('../../assets/insomnia.jpg'),
    },
    {
      name: 'Channel Doctors',
      vehical: 'Now',
      msg: 'Thisari Chamodya',
      img: require('../../assets/doctors.jpg'),
    },
    {
      name: 'Medical Records',
      vehical: 'Now',
      msg: 'Oscar Subramaniyam',
      img: require('../../assets/medical_records.jpg'),
    },
    {
      name: 'Message',
      vehical: 'Now',
      msg: 'Akmaal Meedin',
      img: require('../../assets/chat.jpg'),
    },
    {
      name: 'Track',
      vehical: 'Now',
      msg: 'Randhika Prasad ',
      img: require('../../assets/track.png'),
    },
  ];

  return (
    <View style={Styles.container}>
      <MyHeader
        menu
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
            }}></View>
          <View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.key}
              contentContainerStyle={{
                padding: SPACING,
              }}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.cardBody}>
                    <Image
                      source={require('../../assets/doc.png')}
                      style={{
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                        borderRadius: AVATAR_SIZE,
                        marginRight: SPACING / 2,
                      }}
                    />
                    <View>
                      {/* <Text style={{fontSize: 20, fontWeight: '700'}}>
                        {item.name}
                      </Text> */}
                      <Text
                        style={{fontSize: 18, opacity: 0.7, paddingTop: 15}}>
                        DR. {item.msg}
                      </Text>
                      <Text
                        style={{fontSize: 15, opacity: 1.8, color: '#0099cc'}}>
                        Channel Now
                      </Text>
                    </View>
                  </View>
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
    marginBottom: 40,
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

export default Therapiests;

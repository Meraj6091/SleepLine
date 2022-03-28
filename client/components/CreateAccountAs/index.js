import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useLayoutEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const CreateAccountAs = ({route, navigation}) => {
  useLayoutEffect(() => {
    getDataFormLocal();
  }, []);

  const getDataFormLocal = async () => {
    let data = await AsyncStorage.getItem('User');
    let newUser = await AsyncStorage.getItem('newUser');
    if (data) {
      let obj = JSON.parse(data);
      if (obj) {
        if (obj.doctor) {
          navigation.navigate('DocNavigation', {
            user: obj,
          });
        } else {
          navigation.navigate('UserNavigation', {
            user: obj,
          });
        }
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>SLEEPLINE</Text>
      <View style={{flexDirection: 'row'}}>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Login', {
                doctor: true,
              })
            }>
            <Image
              source={require('../../assets/doc.png')}
              resizeMode="center"
              style={styles.image}
            />
            <Text style={styles.textTitleChoose}>Login As Doctor</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Login', {
                doctor: false,
              })
            }>
            <Image
              source={require('../../assets/user3.png')}
              resizeMode="center"
              style={styles.image}
            />
            <Text style={styles.textTitleChoose}>Login As User</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.meto}>
        <Text style={{color: '#000', fontSize: 18}}>
          Better Sleep. Better Life. Better Planet
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 120,
    marginVertical: 55,
  },

  textTitle: {
    fontFamily: 'sans-serif-thin',
    fontSize: 40,
    marginVertical: 10,
  },
  textTitleChoose: {
    marginLeft: 55,
    fontSize: 15,
    paddingBottom: 50,
    fontFamily: 'sans-serif-thin',
    fontWeight: 'bold',
  },
  textBody: {
    fontFamily: 'Foundation',
    fontSize: 16,
  },
  meto: {
    width: '100%',
    height: 50,
    backgroundColor: '#e3e0d8',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
});

export default CreateAccountAs;

import AsyncStorage from '@react-native-community/async-storage';
import React, {useLayoutEffect, useEffect} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';

function FirstScreen({route, navigation}) {
  const {doctor} = route.params;

  let user;

  useEffect(() => {
    const getResult = async () => {
      let data = await AsyncStorage.getItem('User');
      user = JSON.parse(data);
      await AsyncStorage.removeItem('User');
    };
    getResult();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textTitle}>SLEEPLINE</Text>
        <View>
          <Text style={styles.textTitle2}>
            The Purpose of SleepLine is to help you maintain your mental
            well-being{'\n'} {'\n'} {'\n'}We are here to help you in whatever we
            can !
          </Text>
        </View>
        <Button
          title="Next"
          icon={{
            name: 'arrow-right',
            type: 'font-awesome',
            size: 15,
            color: 'white',
          }}
          iconRight
          iconContainerStyle={{marginLeft: 10}}
          titleStyle={{fontWeight: '700'}}
          buttonStyle={{
            backgroundColor: 'rgba(90, 154, 230, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() =>
            navigation.navigate('SecondScreen', {
              doctor: doctor,
              user: user,
            })
          }
        />
        {/* <View style={styles.meto}>
          <Text style={{color: '#000', fontSize: 18}}>
            Better Sleep. Better Life. Better Planet
          </Text>
        </View> */}
      </View>
    </>
  );
}
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

    fontWeight: '500',
  },
  textTitle2: {
    textAlign: 'center',
    fontFamily: 'sans-serif-thin',
    fontSize: 28,
    marginVertical: 100,
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

export default FirstScreen;

import AsyncStorage from '@react-native-community/async-storage';
import React, {useLayoutEffect, useEffect} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';

function LastScreen({route, navigation}) {
  const {doctor, user} = route.params;
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textTitle}>SLEEPLINE</Text>
        <View>
          <Image
            source={require('../../assets/menu.gif')}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <Button
          title="Get Started"
          titleStyle={{fontWeight: '700'}}
          buttonStyle={{
            backgroundColor: 'rgba(90, 154, 230, 1)',
            borderColor: 'transparent',
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 250,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() =>
            navigation.navigate('createProfile', {
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
    width: 320,
    height: 200,
    marginVertical: 55,
    opacity: 0.6,
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

export default LastScreen;

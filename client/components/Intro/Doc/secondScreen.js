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

function SecondScreen({route, navigation}) {
  const {doctor, user} = route.params;
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textTitle}>SLEEPLINE</Text>
        <View>
          <Text style={styles.textTitle2}>
            There's so much you can do {'\n'} with SleepLine,
          </Text>
          <View style={{flexDirection: 'row', padding: 5}}>
            <View
              style={{
                borderRadius: 100,
                borderWidth: 1,
                width: 100,
                height: 100,
                margin: 5,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Icon name="world-o" size={30} color="#89CFF0" />
                <Text style={{textAlign: 'center'}}>
                  Connect with Community
                </Text>
              </View>
            </View>
            <View
              style={{
                borderRadius: 100,
                borderWidth: 1,
                width: 100,
                height: 100,
                margin: 5,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Icon name="comments" size={30} color="#89CFF0" />
                <Text style={{textAlign: 'center'}}>
                  Get {'\n'} Suggestions
                </Text>
              </View>
            </View>
            <View
              style={{
                borderRadius: 100,
                borderWidth: 1,
                width: 100,
                height: 100,
                margin: 5,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Icon name="doctor" size={30} color="#89CFF0" />
                <Text style={{textAlign: 'center'}}>
                  Interact with Therapiests
                </Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', padding: 5}}>
            <View
              style={{
                borderRadius: 100,
                borderWidth: 1,
                width: 100,
                height: 100,
                margin: 5,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Icon name="heartbeat-alt" size={30} color="#89CFF0" />
                <Text style={{textAlign: 'center'}}>Predict Your Sickness</Text>
              </View>
            </View>
            <View
              style={{
                borderRadius: 100,
                borderWidth: 1,
                width: 100,
                height: 100,
                margin: 5,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Icon name="line-chart" size={30} color="#89CFF0" />
                <Text style={{textAlign: 'center'}}>
                  Track Your Daily Sleep
                </Text>
              </View>
            </View>
            <View
              style={{
                borderRadius: 100,
                borderWidth: 1,
                width: 100,
                height: 100,
                margin: 5,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Icon name="folder" size={30} color="#89CFF0" />
                <Text style={{textAlign: 'center'}}>View Medical Records</Text>
              </View>
            </View>
          </View>
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
            navigation.navigate('DocLastScreen', {
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
    fontFamily: 'sans-serif-thin',
    fontSize: 30,
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

export default SecondScreen;

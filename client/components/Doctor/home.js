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
  Dimensions,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import * as Animatable from 'react-native-animatable';
import Styles from '../Navigation/styles';

import MyHeader from '../Navigation/myHeader';
import AsyncStorage from '@react-native-community/async-storage';
import DocHomeGraphs from '../Graphs/docHomeGraph';
import {useSelector, useDispatch} from 'react-redux';
import {saveData} from '../../Containers/State/action';
import {getAllDocInfo} from './service';

const Home = ({route, navigation}) => {
  const {params} = route;
  const SPACING = 20;
  const AVATAR_SIZE = 70;
  const dispatch = useDispatch();

  useEffect(() => {
    handleDispatch();
  }, []);

  const handleDispatch = async () => {
    try {
      const {data} = await getAllDocInfo({user: params.user});
      if (data) {
        dispatch(saveData({...data.docSignupData[0], ...data.docProfile}));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const data = [
    {
      name: 'Patients Profile',
      vehical: 'Now',
      msg: 'View Your Patients Profiles',
      img: require('../../assets/patientsProfile.jpg'),
    },
    {
      name: 'Medical Records',
      vehical: 'Now',
      msg: 'Add Medical Records',
      img: require('../../assets/medical_records.jpg'),
    },
    {
      name: 'Message',
      vehical: 'Now',
      msg: 'Chat With Your Patients',
      img: require('../../assets/chatPatients.jpg'),
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View style={Styles.container}>
      <MyHeader
        back={false}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log('right')}
        user={false}
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
              Welcome Dr. {params.user},{'\n'}your patienst are waiting for You,{' '}
              {'\n'}
            </Text>

            <DocHomeGraphs />
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
                        style={{fontSize: 12, opacity: 0.8, color: '#0099cc'}}>
                        {item.vehical}
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
    marginRight: 0,
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

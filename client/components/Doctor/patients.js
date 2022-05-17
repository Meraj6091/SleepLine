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
  Modal,
} from 'react-native';

import Styles from '../Navigation/styles';

import MyHeader from '../Navigation/myHeader';

import {useSelector} from 'react-redux';
import PationDetail from './PationModal';
import Chat from 'react-native-vector-icons/Entypo';
import Medical from 'react-native-vector-icons/FontAwesome5';
const Patients = ({route, navigation}) => {
  const {params} = route;

  const state = useSelector((state) => state.userData);
  const [visible, setVisible] = useState(false);
  const [channeled, setChanneled] = useState([]);
  const [IsChanneled, setIsChanneled] = useState(true);
  const [profileInfo, setProfileInfo] = useState([]);
  const [userData, setUserData] = useState({});
  const SPACING = 20;
  const AVATAR_SIZE = 70;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setVisible(false);
      setIsChanneled(!IsChanneled);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getAllChanneledUserProfiles();
  }, [state]);

  // useEffect(() => {
  //   checkIsChanneled();
  // }, [state, channeled]);

  useEffect(() => {
    console.log(profileInfo);
  }, [profileInfo]);

  const getAllChanneledUserProfiles = () => {
    setProfileInfo(state.channeledUsers);
  };

  // const checkIsChanneled = async () => {
  //   const {data} = await isChanneled({userId: state._id});
  //   setChanneled(data.map((data) => data._id));
  // };

  const showPatientDetails = (data) => {
    setUserData({
      data,
    });
    setVisible(true);
  };

  return (
    <View style={Styles.container}>
      <MyHeader
        menu
        onPressMenu={() => navigation.goBack()}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log('right')}
        user={false}
      />

      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.container}>
          {userData && (
            <PationDetail
              visible={visible}
              setVisible={setVisible}
              userData={userData}
              params={params}
            />
          )}

          {profileInfo?.length > 0 ? (
            <View>
              <FlatList
                data={profileInfo}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{
                  padding: SPACING,
                }}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity onPress={() => showPatientDetails(item)}>
                      <View style={styles.cardBody}>
                        <Image
                          source={require('../../assets/user3.png')}
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
                            style={{
                              fontSize: 18,
                              opacity: 0.7,
                              paddingTop: 15,
                            }}>
                            MR. {item.firstName} {item.lastName}
                          </Text>
                          <View style={{flexDirection: 'row', paddingTop: 5}}>
                            <Text
                              style={{
                                fontSize: 15,
                                opacity: 1.8,
                                color: '#0099cc',
                              }}>
                              <Chat name="chat" size={15} /> Chat Now
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                opacity: 1.8,
                                color: '#b92b27',
                                paddingLeft: 20,
                              }}>
                              <Medical name="file-medical" size={15} /> Medical
                              Records
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : (
            <View style={styles.container2}>
              {/* <Text style={styles.textTitleChoose}>
                You Dont Have Any Patients At the Momoent
              </Text> */}
            </View>
          )}

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
  container2: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitleChoose: {
    textAlign: 'center',
    fontSize: 20,
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

export default Patients;
